"""
Genererar src/data/landskap.ts – konturer och mittpunkter för Sveriges 25 landskap.

Källa: perliedman/svenska-landskap (CC0), byggd på Lantmäteriets distriktskarta.
  curl -o landskap.geo.json https://raw.githubusercontent.com/perliedman/svenska-landskap/master/svenska-landskap-klippt.geo.json
  python3 scripts/generate-landskap.py landskap.geo.json

Alla landskap projiceras i ett gemensamt koordinatsystem (enkel ekvirektangulär
projektion korrigerad för 62° N), så samma SVG-bana kan visas både ensam
(med landskapets egen viewBox) och som del av hela Sverigekartan.
"""
import json
import math
import random
import sys

from shapely.geometry import MultiPolygon, Polygon, shape
from shapely.ops import transform

LAT0 = 62.0
K = 100.0  # skala: 1 grad latitud = 100 enheter
COS = math.cos(math.radians(LAT0))
LON0, LAT_TOP = 10.5, 69.2
TOLERANCE = 0.35
MIN_ISLAND_SHARE = 0.004

src = json.load(open(sys.argv[1], encoding="utf-8"))


def project(lon, lat, z=None):
    return ((lon - LON0) * COS * K, (LAT_TOP - lat) * K)


def path_of(geom) -> str:
    polys = list(geom.geoms) if isinstance(geom, MultiPolygon) else [geom]
    total = sum(p.area for p in polys)
    parts = []
    for p in polys:
        if p.area < total * MIN_ISLAND_SHARE:
            continue
        ring = list(p.exterior.coords)[:-1]
        if len(ring) < 3:
            continue
        pts = " ".join(f"{x:.1f} {y:.1f}" for x, y in ring)
        parts.append(f"M{pts}Z")
    return "".join(parts)


features = []
for f in src["features"]:
    name = f["properties"]["landskap"]
    region = f["properties"]["landsdel"]
    geo = shape(f["geometry"])
    lonlat_centroid = geo.representative_point() if name in ("Bohuslän",) else geo.centroid
    proj = transform(project, geo).simplify(TOLERANCE, preserve_topology=True)
    minx, miny, maxx, maxy = proj.bounds
    features.append({
        "name": name,
        "region": region,
        "lat": round(lonlat_centroid.y, 3),
        "lon": round(lonlat_centroid.x, 3),
        "box": [round(minx, 1), round(miny, 1), round(maxx - minx, 1), round(maxy - miny, 1)],
        "d": path_of(proj),
    })

features.sort(key=lambda x: x["name"])
order = list(range(len(features)))
random.Random(25).shuffle(order)

allx = [f["box"][0] for f in features] + [f["box"][0] + f["box"][2] for f in features]
ally = [f["box"][1] for f in features] + [f["box"][1] + f["box"][3] for f in features]
map_box = [round(min(allx), 1), round(min(ally), 1), round(max(allx) - min(allx), 1), round(max(ally) - min(ally), 1)]

out = [
    "// Autogenererad av scripts/generate-landskap.py – redigera inte för hand.",
    "// Geodata: perliedman/svenska-landskap (CC0), baserad på Lantmäteriets distriktskarta.",
    "export interface Landskap { name: string; region: string; lat: number; lon: number; box: [number, number, number, number]; d: string }",
    f"export const MAP_BOX: [number, number, number, number] = {json.dumps(map_box)};",
    "export const LANDSKAP: Landskap[] = [",
]
for f in features:
    out.append("  " + json.dumps(f, ensure_ascii=False) + ",")
out.append("];")
out.append("/** Ordningen landskapen kommer i, dag för dag. Ändra inte – det flyttar alla dagar. */")
out.append(f"export const DAILY_ORDER: number[] = {json.dumps(order)};")

with open("src/data/landskap.ts", "w", encoding="utf-8") as fh:
    fh.write("\n".join(out) + "\n")
print(f"skrev {len(features)} landskap, {sum(len(f['d']) for f in features)//1024} kB banor", file=sys.stderr)
