import fs from "node:fs";
import { geoAlbersUsa, geoCentroid } from "d3-geo";
import { feature } from "topojson-client";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const usAtlasPath = require.resolve("us-atlas/states-10m.json");
const us = JSON.parse(fs.readFileSync(usAtlasPath, "utf8"));

const fipsToCode = {
  "01": "AL",
  "04": "AZ",
  "05": "AR",
  "06": "CA",
  "08": "CO",
  "09": "CT",
  10: "DE",
  11: "DC",
  12: "FL",
  13: "GA",
  16: "ID",
  17: "IL",
  18: "IN",
  19: "IA",
  20: "KS",
  21: "KY",
  22: "LA",
  23: "ME",
  24: "MD",
  25: "MA",
  26: "MI",
  27: "MN",
  28: "MS",
  29: "MO",
  30: "MT",
  31: "NE",
  32: "NV",
  33: "NH",
  34: "NJ",
  35: "NM",
  36: "NY",
  37: "NC",
  38: "ND",
  39: "OH",
  40: "OK",
  41: "OR",
  42: "PA",
  44: "RI",
  45: "SC",
  46: "SD",
  47: "TN",
  48: "TX",
  49: "UT",
  50: "VT",
  51: "VA",
  53: "WA",
  54: "WV",
  55: "WI",
  56: "WY",
};
const codeToName = {
  AL: "Alabama",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District of Columbia",
  FL: "Florida",
  GA: "Georgia",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

const rows = fs
  .readFileSync(
    "public/images/states/extracted/individual/manifest.csv",
    "utf8",
  )
  .trim()
  .split("\n")
  .slice(1);
const comps = rows.map((line) => {
  const [file, area, min_x, min_y, max_x, max_y, center_x, center_y] =
    line.split(",");
  return { file, cx: +center_x, cy: +center_y, area: +area };
});

const allStates = feature(us, us.objects.states).features;
const contiguous = allStates.filter(
  (s) => !["02", "15", "72"].includes(String(s.id).padStart(2, "0")),
);

const projection = geoAlbersUsa().fitExtent(
  [
    [4300, 1150],
    [7159, 2878],
  ],
  { type: "FeatureCollection", features: contiguous },
);
const states = contiguous
  .map((s) => {
    const fips = String(s.id).padStart(2, "0");
    const code = fipsToCode[fips];
    if (!code) return null;
    const [lon, lat] = geoCentroid(s);
    const p = projection([lon, lat]);
    if (!p) return null;
    return { fips, code, name: codeToName[code], sx: p[0], sy: p[1] };
  })
  .filter(Boolean);

function nearestUnique(statesT, comps) {
  const pairs = [];
  const usedS = new Set();
  const usedC = new Set();
  const all = [];
  for (let si = 0; si < statesT.length; si++) {
    for (let ci = 0; ci < comps.length; ci++) {
      const dx = statesT[si].x - comps[ci].cx;
      const dy = statesT[si].y - comps[ci].cy;
      all.push({ si, ci, d2: dx * dx + dy * dy });
    }
  }
  all.sort((a, b) => a.d2 - b.d2);
  for (const e of all) {
    if (usedS.has(e.si) || usedC.has(e.ci)) continue;
    usedS.add(e.si);
    usedC.add(e.ci);
    pairs.push(e);
    if (usedC.size === comps.length) break;
  }
  return pairs;
}

function solveAffine(pairs, states, comps) {
  const A = [];
  const bx = [];
  const by = [];
  for (const { si, ci } of pairs) {
    const s = states[si];
    const c = comps[ci];
    A.push([s.sx, s.sy, 1]);
    bx.push(c.cx);
    by.push(c.cy);
  }
  const fit = (b) => {
    let m00 = 0,
      m01 = 0,
      m02 = 0,
      m11 = 0,
      m12 = 0,
      m22 = 0;
    let v0 = 0,
      v1 = 0,
      v2 = 0;
    for (let i = 0; i < A.length; i++) {
      const x = A[i][0],
        y = A[i][1],
        z = 1;
      m00 += x * x;
      m01 += x * y;
      m02 += x * z;
      m11 += y * y;
      m12 += y * z;
      m22 += z * z;
      v0 += x * b[i];
      v1 += y * b[i];
      v2 += z * b[i];
    }
    const M = [
      [m00, m01, m02],
      [m01, m11, m12],
      [m02, m12, m22],
    ];
    const det =
      M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) -
      M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) +
      M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
    if (Math.abs(det) < 1e-9) return [1, 0, 0];
    const inv = [
      [
        (M[1][1] * M[2][2] - M[1][2] * M[2][1]) / det,
        (M[0][2] * M[2][1] - M[0][1] * M[2][2]) / det,
        (M[0][1] * M[1][2] - M[0][2] * M[1][1]) / det,
      ],
      [
        (M[1][2] * M[2][0] - M[1][0] * M[2][2]) / det,
        (M[0][0] * M[2][2] - M[0][2] * M[2][0]) / det,
        (M[0][2] * M[1][0] - M[0][0] * M[1][2]) / det,
      ],
      [
        (M[1][0] * M[2][1] - M[1][1] * M[2][0]) / det,
        (M[0][1] * M[2][0] - M[0][0] * M[2][1]) / det,
        (M[0][0] * M[1][1] - M[0][1] * M[1][0]) / det,
      ],
    ];
    return [
      inv[0][0] * v0 + inv[0][1] * v1 + inv[0][2] * v2,
      inv[1][0] * v0 + inv[1][1] * v1 + inv[1][2] * v2,
      inv[2][0] * v0 + inv[2][1] * v1 + inv[2][2] * v2,
    ];
  };
  const [a, b, c] = fit(bx);
  const [d, e, f] = fit(by);
  return { a, b, c, d, e, f };
}

let T = { a: 1, b: 0, c: 0, d: 0, e: 1, f: 0 };
for (let iter = 0; iter < 12; iter++) {
  const statesT = states.map((s) => ({
    ...s,
    x: T.a * s.sx + T.b * s.sy + T.c,
    y: T.d * s.sx + T.e * s.sy + T.f,
  }));
  const pairs = nearestUnique(statesT, comps);
  const next = solveAffine(pairs, states, comps);
  T = next;
}

const statesT = states.map((s) => ({
  ...s,
  x: T.a * s.sx + T.b * s.sy + T.c,
  y: T.d * s.sx + T.e * s.sy + T.f,
}));
const pairs = nearestUnique(statesT, comps);

const mapping = pairs
  .map(({ si, ci, d2 }) => ({
    file: comps[ci].file,
    code: states[si].code,
    name: states[si].name,
    distance: Math.sqrt(d2),
    cx: comps[ci].cx,
    cy: comps[ci].cy,
  }))
  .sort((a, b) => a.file.localeCompare(b.file));

fs.writeFileSync(
  "tmp/state-extract/state-mapping.json",
  JSON.stringify({ transform: T, mapping }, null, 2),
);
console.log("pairs", mapping.length);
console.log(
  mapping
    .map((m) => `${m.file},${m.code},${m.name},${m.distance.toFixed(1)}`)
    .join("\n"),
);
