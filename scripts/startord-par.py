import numpy as np, json
from wordfreq import top_n_list, zipf_frequency
LETTERS='abcdefghijklmnopqrstuvwxyzåäö'
BLOCK=set('tesla sarek ersta tears etsar arets skrea nesta taler'.split())
def sv(w):
    return zipf_frequency(w,'en') <= zipf_frequency(w,'sv')+0.2
words=[w for w in top_n_list('sv',200000)
       if len(w)==5 and all(c in LETTERS for c in w) and sv(w) and w not in BLOCK]
ANSWERS=words[:2000]; li={c:i for i,c in enumerate(LETTERS)}
A=np.array([[li[c] for c in w] for w in ANSWERS],dtype=np.int8); nA=len(ANSWERS)
AC=np.zeros((nA,len(LETTERS)),dtype=np.int8)
for j in range(5): np.add.at(AC,(np.arange(nA),A[:,j]),1)
def codes(g_):
    g=np.array([li[c] for c in g_],dtype=np.int8)
    r=np.zeros((nA,5),dtype=np.int8); c=AC.copy()
    for j in range(5):
        h=A[:,j]==g[j]; r[h,j]=2; c[h,g[j]]-=1
    for j in range(5):
        m=(r[:,j]==0)&(c[:,g[j]]>0); r[m,j]=1; c[m,g[j]]-=1
    return r[:,0]*81+r[:,1]*27+r[:,2]*9+r[:,3]*3+r[:,4]
def ent(cnt):
    p=cnt/nA; return float(-(p*np.log2(p)).sum())

pool=words[:1200]
singles=[]
for w in pool:
    _,cnt=np.unique(codes(w),return_counts=True); singles.append((w,ent(cnt)))
singles.sort(key=lambda x:-x[1])
best=[w for w,_ in singles[:150]]
cache={w:codes(w) for w in best}
pairs=[]
for i,w1 in enumerate(best[:60]):
    for w2 in best:
        if w2<=w1 or set(w1)&set(w2): continue
        combo=cache[w1].astype(np.int32)*243+cache[w2]
        _,cnt=np.unique(combo,return_counts=True)
        pairs.append((w1,w2,ent(cnt),float((cnt*cnt).sum()/nA)))
pairs.sort(key=lambda x:-x[2])
print("=== BÄSTA PAR – tio olika bokstäver ===")
for a,b,e,l in pairs[:10]:
    print(f"  {a} + {b:<8} {e:>5.2f} bitar   {l:>4.1f} kvar av {nA}")
res=json.load(open('/tmp/startord/resultat.json'))
res['pairs']=[{"a":a,"b":b,"bits":round(e,2),"left":round(l,1)} for a,b,e,l in pairs[:12]]
res['top']=[{"word":w,"bits":round(e,2)} for w,e in singles[:40]]
json.dump(res,open('/tmp/startord/resultat.json','w'),ensure_ascii=False,indent=1)
print("\n=== TOPP 12 ENSKILDA (filtrerad lista) ===")
for w,e in singles[:12]: print(f"  {w:<8} {e:.2f} bitar")
