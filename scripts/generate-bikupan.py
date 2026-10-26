"""
Genererar src/data/bikupan.ts – dagliga pussel till Bikupan (svensk Spelling Bee).

Ordlistan byggs av två källor som måste vara överens:
  1. wordfreq (sv)  – ger vanliga ord, inklusive böjningar, med frekvens.
  2. Hunspell sv_SE – stavningskontroll. Bara ord som godkänns i gemener tas med,
     vilket filtrerar bort egennamn ("stockholm") och engelska lån ("computer").

Varje pussel är sju olika bokstäver där en (mittbokstaven) måste finnas i alla ord.
Minst ett ord – ett pangram – använder alla sju. Vi väljer bara bokstavskombinationer
som ger lagom många svar, så att pusslet varken är tomt eller oändligt.

Kör:
  pip install --break-system-packages wordfreq spylls
  npm pack dictionary-sv@4.0.0 && tar xzf dictionary-sv-4.0.0.tgz
  python3 scripts/generate-bikupan.py package/index   # sökväg utan .aff/.dic

Utdata är deterministisk (fast slumpfrö), så samma indata ger samma fil.
"""
import json
import random
import re
import sys
from collections import defaultdict

from spylls.hunspell import Dictionary
from wordfreq import top_n_list, zipf_frequency

if len(sys.argv) < 2:
    sys.exit("ange sökväg till Hunspell-ordboken utan filändelse, t.ex. package/index")

hun = Dictionary.from_files(sys.argv[1])

N_PUZZLES = 365
MIN_LEN = 4
MIN_ZIPF = 2.9          # golvet för att ett ord ska räknas som "känt" – lägre släpper in skräp
PANGRAM_ZIPF = 3.2      # pangrammet ska vara ett riktigt vanligt ord
MIN_ANSWERS, MAX_ANSWERS = 15, 55

# Ord vi inte vill se som svar i ett vardagsspel, oavsett hur vanliga de är.
BLOCK = set("""
fitta fittan fittor kuk kuken kukar knull knulla knullar knullade knullat hora horan horor
horunge neger negrer negern bög bögar bögen jävla jävlar jävel jävlas helvete helvetet
satan sate fan fanskapet kåt kåta porr porren sexig sexiga sexuell sexuella bajs bajsa
pissa piss pisset runka runkar nazist nazister nazisten nazism mongo cp cpn idiot idioter
isbn turk turkar egon snorre allo osis blaha lalla birdie sosse sossar
idioten hor hora våldtäkt våldtäkten våldta våldtog mörda mördade mördare
""".split())

WORD_RE = re.compile(r"^[a-zåäö]+$")


def is_swedish(w: str) -> bool:
    sv = zipf_frequency(w, "sv")
    en = zipf_frequency(w, "en")
    return sv >= MIN_ZIPF and en <= sv + 0.2


raw = top_n_list("sv", 120000)
words = []
for w in raw:
    if len(w) < MIN_LEN or not WORD_RE.match(w) or w in BLOCK:
        continue
    if len(set(w)) > 7 or not is_swedish(w):
        continue
    if not hun.lookup(w):
        continue
    words.append(w)
words = sorted(set(words))
print(f"giltiga ord: {len(words)}", file=sys.stderr)

by_letters = defaultdict(list)
for w in words:
    by_letters[frozenset(w)].append(w)

pangram_sets = {
    frozenset(w)
    for w in words
    if len(set(w)) == 7 and zipf_frequency(w, "sv") >= PANGRAM_ZIPF
}
print(f"möjliga bokstavsuppsättningar: {len(pangram_sets)}", file=sys.stderr)


def answers_for(letters: frozenset, center: str) -> list[str]:
    out = []
    for subset, ws in by_letters.items():
        if center in subset and subset <= letters:
            out.extend(ws)
    return sorted(out, key=lambda w: (len(w), w))


candidates = []
for letters in pangram_sets:
    for center in letters:
        ans = answers_for(letters, center)
        if MIN_ANSWERS <= len(ans) <= MAX_ANSWERS:
            pangrams = [w for w in ans if set(w) == letters]
            candidates.append((letters, center, ans, pangrams))

print(f"kandidater med lagom många svar: {len(candidates)}", file=sys.stderr)

rng = random.Random(20261025)
rng.shuffle(candidates)

# En bokstavsuppsättning används bara en gång, och vi sprider mittbokstäverna.
used_sets: set[frozenset] = set()
center_count: dict[str, int] = defaultdict(int)
chosen = []
for letters, center, ans, pangrams in candidates:
    if letters in used_sets:
        continue
    if center_count[center] >= N_PUZZLES // 10:
        continue
    used_sets.add(letters)
    center_count[center] += 1
    chosen.append((letters, center, ans))
    if len(chosen) == N_PUZZLES:
        break

if len(chosen) < N_PUZZLES:
    sys.exit(f"bara {len(chosen)} pussel – sänk MIN_ANSWERS eller MIN_ZIPF")

lines = [
    "// Autogenererad av scripts/generate-bikupan.py – redigera inte för hand.",
    "// l = sju bokstäver, mittbokstaven först. w = alla godkända ord, mellanslagsseparerade.",
    "export interface BikupanPuzzle { l: string; w: string }",
    "export const BIKUPAN: BikupanPuzzle[] = [",
]
for letters, center, ans in chosen:
    outer = "".join(sorted(letters - {center}))
    lines.append(f"  {{ l: {json.dumps(center + outer, ensure_ascii=False)}, w: {json.dumps(' '.join(ans), ensure_ascii=False)} }},")
lines.append("];")

with open("src/data/bikupan.ts", "w", encoding="utf-8") as f:
    f.write("\n".join(lines) + "\n")

sizes = [len(a) for _, _, a in chosen]
print(f"skrev {len(chosen)} pussel, svar per pussel {min(sizes)}–{max(sizes)}, snitt {sum(sizes)/len(sizes):.0f}", file=sys.stderr)
