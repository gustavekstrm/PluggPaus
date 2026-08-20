#!/usr/bin/env python3
"""
Genererar de förberäknade rankningarna för Kontext (svenska Contexto).

För varje målord rangordnas ~13 000 vanliga svenska ord efter cosinuslikhet mot
målordets ordvektor. Resultatet skrivs som TypeScript-moduler i src/data/kontext/:

  vocab.ts   – delad ordlista (index = position i listan)
  pNN.ts     – en permutation per pussel, base36-kodad med 3 tecken per ordindex

Modellen är spaCy `sv_core_news_md` (floret-vektorer, 300 dim). Ordlistan kommer
från `wordfreq` (svensk frekvenslista), filtrerad på svenska bokstäver, en liten
blocklista och ord som är klart vanligare på engelska än på svenska.

Körs sällan – bara när målorden eller ordlistan ändras:

    pip install spacy wordfreq
    pip install https://github.com/explosion/spacy-models/releases/download/sv_core_news_md-3.8.0/sv_core_news_md-3.8.0-py3-none-any.whl
    python3 scripts/generate-kontext.py

Skriv sedan in listan från stdout i PUZZLES i src/data/contextoPuzzles.ts om
målorden har ändrats.
"""
import json, os, sys, numpy as np, spacy
from wordfreq import top_n_list, zipf_frequency

import datetime
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "src", "data", "kontext")
os.makedirs(OUT, exist_ok=True)

BLOCK = set("""
fan fanken helvete jävla jävlar jävligt satan skit skiten skitit kuk kukar fitta fittan hora horor
pucko idiot idioten mongo bög bögar neger negern kärring subba slampa knulla knullar knullade
pussy fuck fucking shit bitch ass dick sex sexuell sexuellt porr porren naken naket knull
mord mörda mördare våldtäkt våldta självmord droger knark heroin kokain
""".split())

def is_word(w):
    return len(w) >= 2 and all(c in "abcdefghijklmnopqrstuvwxyzåäöé" for c in w)

def build_vocab(n=22000, keep=13000):
    raw = top_n_list("sv", n)
    out = []
    for w in raw:
        if not is_word(w) or w in BLOCK:
            continue
        sv = zipf_frequency(w, "sv")
        en = zipf_frequency(w, "en")
        # drop words that are much more common in English than Swedish (loan/foreign noise)
        if en > sv + 0.3:
            continue
        out.append(w)
        if len(out) >= keep:
            break
    return out

TARGETS = """
hav skola kaffe vinter sommar sol regn snö skog berg
musik film bok fotboll hund katt häst fågel fisk blomma
träd äpple choklad glass pizza bröd mjölk vatten mat frukost
hus rum säng fönster dörr kök trädgård stad gata bro
bil cykel tåg flygplan båt buss resa semester strand fjäll
telefon dator internet pengar jobb tid klocka morgon natt dröm
vän familj mamma kärlek glädje skratt sång dans fest jul
hjärta hand öga hår kläder sko färg ljus mörker vind
sten guld papper penna brev tidning foto konst teater spel
träning hälsa läkare sjukhus språk ord matematik historia bibliotek student
""".split()

def main():
    nlp = spacy.load("sv_core_news_md")
    vocab = build_vocab()
    for t in TARGETS:
        if t not in vocab:
            vocab.append(t)
    vocab = list(dict.fromkeys(vocab))
    n = len(vocab)
    assert n < 46656, n
    print("vocab size", n, file=sys.stderr)

    M = np.array([nlp.vocab[w].vector for w in vocab], dtype=np.float32)
    M /= (np.linalg.norm(M, axis=1, keepdims=True) + 1e-9)
    idx = {w: i for i, w in enumerate(vocab)}

    def b36(i):
        s = ""
        for _ in range(3):
            s = "0123456789abcdefghijklmnopqrstuvwxyz"[i % 36] + s
            i //= 36
        return s

    meta = []
    for k, t in enumerate(TARGETS):
        v = M[idx[t]]
        sims = M @ v
        sims[idx[t]] = 2.0  # target always rank 1
        order = np.argsort(-sims, kind="stable")
        pid = "p%02d" % (k + 1)
        with open(f"{OUT}/{pid}.ts", "w") as f:
            f.write("// Autogenererad av scripts/generate-kontext.py - redigera inte for hand.\n")
            f.write("export const TARGET = '%s';\n" % t)
            f.write("export const ORDER = '%s';\n" % "".join(b36(int(i)) for i in order))
        meta.append({"id": pid, "target": t})
        if k < 3 or t in ("pengar", "kärlek", "jul", "matematik"):
            print(t, "->", [vocab[i] for i in order[:18]], file=sys.stderr)

    header = "// Autogenererad av scripts/generate-kontext.py - redigera inte for hand.\n"
    with open(f"{OUT}/index.ts", "w") as f:
        f.write(header)
        f.write("// Lazy-laddare per pussel. Varje modul blir en egen chunk i bygget.\n\n")
        f.write("export interface PuzzleRankingModule {\n  TARGET: string;\n  ORDER: string;\n}\n\n")
        f.write("export const PUZZLE_LOADERS: Record<string, () => Promise<PuzzleRankingModule>> = {\n")
        for m in meta:
            f.write("  %s: () => import('./%s'),\n" % (m["id"], m["id"]))
        f.write("};\n")
    with open(f"{OUT}/vocab.ts", "w") as f:
        f.write(header)
        f.write("// Delad ordlista. Rankningsfilerna pekar in i den har listan.\n")
        f.write("export const VOCAB: string[] = '" + " ".join(vocab) + "'.split(' ');\n")
    epoch = datetime.date(2024, 1, 1)
    for i, m in enumerate(meta):
        d = epoch + datetime.timedelta(days=i)
        print("  { id: '%s', date: '%s', targetWord: '%s' }," % (m["id"], d.isoformat(), m["target"]))
    print("targets", len(TARGETS), "unique", len(set(TARGETS)), file=sys.stderr)

main()
