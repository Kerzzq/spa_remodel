const OVERRIDES_KEY = "cases_overrides_v1";

function safeParse(json, fallback) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

export function getOverridesMap() {
  const raw = localStorage.getItem(OVERRIDES_KEY);
  return safeParse(raw, {});
}

export function setOverridesMap(map) {
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(map));
}

export async function loadCases() {
  const res = await fetch("/data/casos.json", { cache: "no-store" });
  if (!res.ok) throw new Error("No se pudo cargar /data/casos.json");
  const base = await res.json();

  const overrides = getOverridesMap();

  // Merge: si hay overrides por id, pisan campos
  return base.map((c) => {
    const id = String(c.id ?? c.ID ?? c.caseId ?? "");
    const o = overrides[id];
    return o ? { ...c, ...o, id } : { ...c, id };
  });
}

export function saveCasePatch(caseId, patch) {
  const id = String(caseId);
  const map = getOverridesMap();
  map[id] = { ...(map[id] || {}), ...patch, id };
  setOverridesMap(map);
}

export function clearLocalEdits() {
  localStorage.removeItem(OVERRIDES_KEY);
}
