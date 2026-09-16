import numpy as np, json, sys
from wordfreq import top_n_list, zipf_frequency

LETTERS = 'abcdefghijklmnopqrstuvwxyzåäö'
BLOCK = set('tesla sarek ersta tears etsar arets'.split())

def is_swedish(w):
    sv, en = zipf_frequency(w, 'sv'), zipf_frequency(w, 'en')
    return en <= sv + 0.2          # bort med ord som är klart vanligare på engelska

raw = [w for w in top_n_list('sv', 200000)
       if len(w) == 5 and all(c in LETTERS for c in w)]
words = [w for w in raw if is_swedish(w) and w not in BLOCK]
print(f"efter filter: {len(words)} av {len(raw)}", file=sys.stderr)

ANSWERS, GUESSES = words[:2000], words[:6000]
li = {c: i for i, c in enumerate(LETTERS)}
A = np.array([[li[c] for c in w] for w in ANSWERS], dtype=np.int8)
nA = len(ANSWERS)
A_counts = np.zeros((nA, len(LETTERS)), dtype=np.int8)
for j in range(5):
    np.add.at(A_counts, (np.arange(nA), A[:, j]), 1)

def codes_for(guess):
    g = np.array([li[c] for c in guess], dtype=np.int8)
    res = np.zeros((nA, 5), dtype=np.int8); counts = A_counts.copy()
    for j in range(5):
        hit = A[:, j] == g[j]; res[hit, j] = 2; counts[hit, g[j]] -= 1
    for j in range(5):
        mark = (res[:, j] == 0) & (counts[:, g[j]] > 0)
        res[mark, j] = 1; counts[mark, g[j]] -= 1
    return res[:, 0]*81 + res[:, 1]*27 + res[:, 2]*9 + res[:, 3]*3 + res[:, 4]

rows = []
for guess in GUESSES:
    _, cnt = np.unique(codes_for(guess), return_counts=True)
    p = cnt / nA
    rows.append((guess, float(-(p*np.log2(p)).sum()), float((cnt*cnt).sum()/nA)))
rows.sort(key=lambda r: -r[1])

# ---- Bästa PAR: startord 1 + 2 som kompletterar varandra ----
top40 = [r[0] for r in rows[:40]]
code_cache = {w: codes_for(w) for w in top40}
pairs = []
for i, w1 in enumerate(top40):
    c1 = code_cache[w1]
    for w2 in top40[i+1:]:
        if set(w1) & set(w2):          # par ska täcka olika bokstäver
            continue
        combo = c1.astype(np.int32) * 243 + code_cache[w2]
        _, cnt = np.unique(combo, return_counts=True)
        p = cnt / nA
        pairs.append((w1, w2, float(-(p*np.log2(p)).sum()), float((cnt*cnt).sum()/nA)))
pairs.sort(key=lambda r: -r[2])

# ---- Bokstavsfrekvens per position ----
pos = [{} for _ in range(5)]
tot = {}
for w in ANSWERS:
    for j, c in enumerate(w):
        pos[j][c] = pos[j].get(c, 0) + 1
    for c in set(w):
        tot[c] = tot.get(c, 0) + 1

json.dump({
    "answers": len(ANSWERS), "guesses": len(GUESSES), "pool": len(words),
    "top": [{"word": w, "bits": round(e, 2), "left": round(l)} for w, e, l in rows[:40]],
    "pairs": [{"a": a, "b": b, "bits": round(e, 2), "left": round(l, 1)} for a, b, e, l in pairs[:15]],
    "letters": sorted(tot.items(), key=lambda x: -x[1])[:15],
    "positions": [sorted(p.items(), key=lambda x: -x[1])[:5] for p in pos],
}, open('/tmp/startord/resultat.json', 'w'), ensure_ascii=False, indent=1)

print("\n=== TOPP 15 STARTORD ===")
for w, e, l in rows[:15]:
    print(f"{w:<8} {e:>5.2f} bitar   {l:>4.0f} kvar av {nA}")
print("\n=== BÄSTA PAR (två gissningar utan gemensamma bokstäver) ===")
for a, b, e, l in pairs[:8]:
    print(f"{a} + {b:<8} {e:>5.2f} bitar   {l:>5.1f} kvar")
print("\n=== VANLIGASTE BOKSTÄVER (andel av orden) ===")
for c, n in sorted(tot.items(), key=lambda x: -x[1])[:12]:
    print(f"  {c}: {100*n/nA:.0f}%", end='')
print("\n\n=== VANLIGAST PER POSITION ===")
for j, p in enumerate(pos):
    best = sorted(p.items(), key=lambda x: -x[1])[:4]
    print(f"  {j+1}: " + ", ".join(f"{c} ({100*n/nA:.0f}%)" for c, n in best))
