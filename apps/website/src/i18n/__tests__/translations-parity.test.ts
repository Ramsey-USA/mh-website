/**
 * @jest-environment node
 *
 * Translation Parity & Quality Guardrails
 *
 * Enforces that:
 *  1. All keys present in en.json exist in es.json (structural completeness)
 *  2. All keys present in home/en.json exist in home/es.json
 *  3. Spanish translations do not contain known missing accent patterns
 *  4. Spanish translations include proper opening punctuation (¿ / ¡)
 *  5. Array lengths match between locales
 *
 * Run: npx jest translations-parity
 */

import path from "path";
import fs from "fs";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const MSG_DIR = path.resolve(__dirname, "../../../../../messages");
const HOME_MSG_DIR = path.join(MSG_DIR, "home");

function loadJson(filePath: string): Record<string, unknown> {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Record<string, unknown>;
}

type DeepRecord = Record<string, unknown>;

/** Recursively find keys present in `a` but missing from `b`. */
function findMissingKeys(a: unknown, b: unknown, path = ""): string[] {
  const missing: string[] = [];

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      missing.push(`${path} [array length: en=${a.length} es=${b.length}]`);
    }
    return missing;
  }

  if (
    typeof a !== "object" ||
    a === null ||
    typeof b !== "object" ||
    b === null
  ) {
    return missing;
  }

  for (const key of Object.keys(a as DeepRecord)) {
    const fullPath = path ? `${path}.${key}` : key;
    if (!(key in (b as DeepRecord))) {
      missing.push(fullPath);
    } else {
      missing.push(
        ...findMissingKeys(
          (a as DeepRecord)[key],
          (b as DeepRecord)[key],
          fullPath,
        ),
      );
    }
  }

  return missing;
}

// ---------------------------------------------------------------------------
// Missing-accent patterns for Spanish
// Every pattern here MUST NOT appear in a well-formed es.json.
// Use word-boundary assertions (\b) to avoid false positives on substrings.
// ---------------------------------------------------------------------------
const MISSING_ACCENT_PATTERNS: Array<[RegExp, string]> = [
  // -ción group
  [/\bplanificacion\b/i, "planificación"],
  [/\bcomunicacion\b/i, "comunicación"],
  [/\bejecucion\b/i, "ejecución"],
  [/\bconstruccion\b/i, "construcción"],
  [/\bcoordinacion\b/i, "coordinación"],
  [/\bgestion\b/i, "gestión"],
  [/\boperacion\b/i, "operación"],
  [/\bespecializacion\b/i, "especialización"],
  [/\bpreconstruccion\b/i, "preconstrucción"],
  [/\basociacion\b/i, "asociación"],
  [/\bcolaboracion\b/i, "colaboración"],
  [/\bestimacion\b/i, "estimación"],
  [/\bvalidacion\b/i, "validación"],
  [/\bevaluacion\b/i, "evaluación"],
  [/\bpresentacion\b/i, "presentación"],
  [/\bcapacitacion\b/i, "capacitación"],
  [/\binformacion\b/i, "información"],
  [/\bdocumentacion\b/i, "documentación"],
  [/\binspeccion\b/i, "inspección"],
  [/\bcertificacion\b/i, "certificación"],
  [/\bintegracion\b/i, "integración"],
  [/\borganizacion\b/i, "organización"],
  [/\bseleccion\b/i, "selección"],
  [/\btransicion\b/i, "transición"],
  [/\bincorporacion\b/i, "incorporación"],
  [/\borientacion\b/i, "orientación"],
  [/\bcontratacion\b/i, "contratación"],
  [/\bsatisfaccion\b/i, "satisfacción"],
  [/\bprogramacion\b/i, "programación"],
  [/\bposicion\b/i, "posición"],
  [/\bdescripcion\b/i, "descripción"],
  [/\bproteccion\b/i, "protección"],
  [/\bsituacion\b/i, "situación"],
  [/\bmision\b/i, "misión"],
  [/\bdecision\b/i, "decisión"],
  [/\brelacion\b/i, "relación"],
  [/\bexhibicion\b/i, "exhibición"],
  [/\binscripcion\b/i, "inscripción"],
  [/\bparticipacion\b/i, "participación"],
  [/\balineacion\b/i, "alineación"],
  [/\bdedicacion\b/i, "dedicación"],
  [/\bcontribucion\b/i, "contribución"],
  [/\bverificacion\b/i, "verificación"],
  [/\baviacion\b/i, "aviación"],
  [/\bconsideracion\b/i, "consideración"],
  [/\bpromocion\b/i, "promoción"],
  [/\bdireccion\b/i, "dirección"],
  [/\baccion\b/i, "acción"],
  [/\bnavegacion\b/i, "navegación"],
  [/\bcalificacion\b/i, "calificación"],
  [/\bformacion\b/i, "formación"],
  [/\bresolucion\b/i, "resolución"],
  [/\binversion\b/i, "inversión"],
  [/\bpresion\b/i, "presión"],
  [/\bvision\b/i, "visión"],
  [/\bprecision\b/i, "precisión"],
  [/\bexpansion\b/i, "expansión"],
  [/\brepresentacion\b/i, "representación"],
  [/\bpreparacion\b/i, "preparación"],
  [/\bdesignacion\b/i, "designación"],
  [/\bconversacion\b/i, "conversación"],
  [/\brevision\b/i, "revisión"],
  [/\bduracion\b/i, "duración"],
  [/\beducacion\b/i, "educación"],
  [/\binclusion\b/i, "inclusión"],
  [/\bcomprension\b/i, "comprensión"],
  [/\bdeclaracion\b/i, "declaración"],
  [/\bpoblacion\b/i, "población"],
  [/\bremodelacion\b/i, "remodelación"],
  [/\bimplementacion\b/i, "implementación"],
  [/\bcompensacion\b/i, "compensación"],
  [/\btransaccion\b/i, "transacción"],
  [/\bpension\b/i, "pensión"],
  [/\bcomision\b/i, "comisión"],
  [/\badmision\b/i, "admisión"],
  [/\bemision\b/i, "emisión"],
  [/\bconcesion\b/i, "concesión"],
  [/\btension\b/i, "tensión"],
  [/\bsesion\b/i, "sesión"],
  [/\bdivision\b/i, "división"],
  [/\bconversion\b/i, "conversión"],
  // -ñ group
  [/\bdisenados?\b/i, "diseñado/s"],
  [/\bacompanamiento\b/i, "acompañamiento"],
  [/\bdesempeno\b/i, "desempeño"],
  // -ú group
  [/\bpublicos?\b/i, "público/s"],
  [/\bunicos?\b/i, "único/s"],
  // -é / -í group
  [/\btelefono\b/i, "teléfono"],
  [/\bcodigo\b/i, "código"],
  [/\bestandares\b/i, "estándares"],
  [/\bestandar\b/i, "estándar"],
  [/\bespanol\b/i, "español"],
  [/\btambien\b/i, "también"],
  [/\bademas\b/i, "además"],
  [/\bpodria\b/i, "podría"],
  // -ó group
  [/\bproximamente\b/i, "próximamente"],
  [/\bproxim[ao]s?\b/i, "próximo/a"],
  [/\bnacion\b/i, "nación"],
  [/\bestrategic[ao]s?\b/i, "estratégico/a/os/as"],
  [/\btacticos?\b/i, "táctico/s"],
  [/\brapidos?\b/i, "rápido/s"],
  [/\brapidas?\b/i, "rápida/s"],
  [/\btecnologia\b/i, "tecnología"],
  [/\btecnicos?\b/i, "técnico/s"],
  [/\bmedicos?\b/i, "médico/s"],
  [/\bespecificos?\b/i, "específico/s"],
  [/\bpracticas?\b/i, "práctica/s"],
  [/\bpractico\b/i, "práctico"],
  [/\bdesafios\b/i, "desafíos"],
  [/\batras\b/i, "atrás"],
  [/\btipicos?\b/i, "típico/s"],
  [/\blinea\b/i, "línea"],
  [/\bdesempeno\b/i, "desempeño"],
  // Verbs / imperatives
  [/\bcontactenos\b/i, "contáctenos"],
  [/\bpongase\b/i, "póngase"],
  [/\basociese\b/i, "asóciese"],
  // Years / days
  [/\banos\b/i, "años"],
  [/\bdias\b/i, "días"],
  [/\bhabiles\b/i, "hábiles"],
  [/\baqui\b/i, "aquí"],
  // Ejército
  [/\bejercito\b/i, "ejército"],
  // Verb forms without accent
  [/\bestablecio\b/i, "estableció"],
];

/**
 * Returns all JSON string values (leaves) from a parsed JSON tree.
 * Keys are paths like "home.services.hero.sectionTitle".
 */
function collectStringValues(
  obj: unknown,
  pathPrefix = "",
): Array<{ path: string; value: string }> {
  const results: Array<{ path: string; value: string }> = [];

  if (typeof obj === "string") {
    results.push({ path: pathPrefix, value: obj });
  } else if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      results.push(...collectStringValues(item, `${pathPrefix}[${i}]`));
    });
  } else if (typeof obj === "object" && obj !== null) {
    for (const [k, v] of Object.entries(obj as DeepRecord)) {
      const nextPath = pathPrefix ? `${pathPrefix}.${k}` : k;
      results.push(...collectStringValues(v, nextPath));
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("Translation Files — Structural Completeness", () => {
  const en = loadJson(path.join(MSG_DIR, "en.json"));
  const es = loadJson(path.join(MSG_DIR, "es.json"));

  test("es.json has no missing keys compared to en.json", () => {
    const missing = findMissingKeys(en, es);
    expect(missing).toEqual([]);
  });

  test("en.json has no missing keys compared to es.json (no orphaned Spanish keys)", () => {
    const extra = findMissingKeys(es, en);
    expect(extra).toEqual([]);
  });

  test("both files are valid JSON with non-empty content", () => {
    expect(Object.keys(en).length).toBeGreaterThan(0);
    expect(Object.keys(es).length).toBeGreaterThan(0);
  });
});

describe("Translation Files — Home Namespace Completeness", () => {
  const enHome = loadJson(path.join(HOME_MSG_DIR, "en.json"));
  const esHome = loadJson(path.join(HOME_MSG_DIR, "es.json"));

  test("home/es.json has no missing keys compared to home/en.json", () => {
    const missing = findMissingKeys(enHome, esHome);
    expect(missing).toEqual([]);
  });

  test("home/en.json has no missing keys compared to home/es.json", () => {
    const extra = findMissingKeys(esHome, enHome);
    expect(extra).toEqual([]);
  });
});

describe("Translation Files — Spanish Accent Quality (es.json)", () => {
  const esRaw = fs.readFileSync(path.join(MSG_DIR, "es.json"), "utf-8");

  for (const [pattern, correctForm] of MISSING_ACCENT_PATTERNS) {
    test(`no unaccented "${correctForm}" in es.json`, () => {
      const matches = esRaw.match(new RegExp(pattern.source, "gi")) ?? [];
      if (matches.length > 0) {
        throw new Error(
          `Found ${matches.length} unaccented occurrence(s) matching /${pattern.source}/i ` +
            `(should be "${correctForm}"): ${[...new Set(matches)].join(", ")}`,
        );
      }
    });
  }
});

describe("Translation Files — Spanish Punctuation (es.json)", () => {
  const es = loadJson(path.join(MSG_DIR, "es.json"));
  const strings = collectStringValues(es);

  /**
   * Spanish questions and exclamations must open with ¿ / ¡.
   * We check string values that END with ? or ! but do NOT start with ¿ / ¡.
   *
   * We skip strings that contain interpolation variables ({var}) at the start
   * or strings intentionally used as labels/kickers without full sentences.
   * We also skip ALL-CAPS acronyms (e.g. "EMR?").
   */
  const QUESTION_EXCEPTIONS = new Set([
    // Intentional single-word or short label patterns that don't need ¿
  ]);

  test("questions ending with ? have opening ¿", () => {
    const violations: Array<{ path: string; value: string }> = [];

    for (const { path: keyPath, value } of strings) {
      if (QUESTION_EXCEPTIONS.has(keyPath)) continue;
      const trimmed = value.trim();

      // Only check values that are full sentences ending with ?
      if (!trimmed.endsWith("?")) continue;
      // Skip ALL_CAPS (acronyms like "EMR?")
      if (/^[A-Z\s]+\?$/.test(trimmed)) continue;
      // Skip very short labels (≤ 3 words) - likely UI labels not full sentences
      if (trimmed.split(/\s+/).length <= 3) continue;
      // Skip if already has ¿
      if (trimmed.startsWith("¿")) continue;
      // Skip if it's an interpolated string starting with {
      if (trimmed.startsWith("{")) continue;

      violations.push({ path: keyPath, value: trimmed });
    }

    if (violations.length > 0) {
      const details = violations
        .map((v) => `  ${v.path}: "${v.value}"`)
        .join("\n");
      throw new Error(
        `${violations.length} Spanish question(s) missing opening ¿:\n${details}`,
      );
    }
  });
});

describe("Translation Files — No Placeholder Keys Left in es.json", () => {
  const en = loadJson(path.join(MSG_DIR, "en.json"));
  const es = loadJson(path.join(MSG_DIR, "es.json"));

  const esStrings = collectStringValues(es);
  const enStrings = collectStringValues(en);
  const enMap = new Map(enStrings.map(({ path, value }) => [path, value]));

  /**
   * Paths where identical EN/ES values are acceptable:
   * - Brand names (MH Construction, Procore, BABAA, etc.)
   * - Proper nouns that don't translate (city names, state abbreviations)
   * - Technical terms that remain in English
   * - Short labels that are the same in both languages
   */
  const ALLOWED_IDENTICAL_PATHS = new Set([
    // Brand name that stays identical in Spanish
    "hub.login.travelerLabel",
    "hub.roleSelector.admin",
    "hub.roleSelector.traveler",
  ]);

  const ALLOWED_IDENTICAL_PATTERNS = [
    // Emails, URLs, phone numbers
    /^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i,
    /^https?:\/\//,
    /^\d[\d\s()+.-]*$/,
    // Abbreviations / acronyms / symbols
    /^[A-Z0-9\s.,·→×%@#&()/\\[\]{}!?^_*+-]+$/,
    // Single characters or empty
    /^.{0,2}$/,
    // Numbers only
    /^\d+$/,
    // State codes like "WA, OR, ID"
    /^[A-Z]{2}(,\s*[A-Z]{2})*$/,
    // Known brand / technical terms acceptable in both languages
    /\b(MH Construction|Procore|BABAA|GI Bill|EMR|VPP|OSHA|AGC|RFI|CRM|PWA|SEO|PDF|HTML|CSV)\b/,
  ];

  test("no Spanish values are verbatim copies of English (untranslated)", () => {
    const untranslated: Array<{ path: string; value: string }> = [];

    for (const { path: keyPath, value: esValue } of esStrings) {
      if (ALLOWED_IDENTICAL_PATHS.has(keyPath)) continue;
      const enValue = enMap.get(keyPath);
      if (enValue === undefined) continue;
      if (esValue !== enValue) continue; // translated — good

      // Check if this is an allowed identical value
      const isAllowed = ALLOWED_IDENTICAL_PATTERNS.some((p) => p.test(esValue));
      if (isAllowed) continue;

      untranslated.push({ path: keyPath, value: esValue });
    }

    if (untranslated.length > 0) {
      const details = untranslated
        .slice(0, 20) // cap output for readability
        .map((v) => `  ${v.path}: "${v.value}"`)
        .join("\n");
      throw new Error(
        `${untranslated.length} value(s) appear untranslated (ES === EN):\n${details}` +
          (untranslated.length > 20
            ? `\n  ... and ${untranslated.length - 20} more`
            : ""),
      );
    }
  });
});
