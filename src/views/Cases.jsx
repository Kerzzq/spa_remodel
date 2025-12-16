import { useEffect, useMemo, useState } from "react";
import CaseCard from "../components/CaseCard.jsx";
import CaseFilters from "../components/CaseFilters.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { clearLocalEdits, loadCases, saveCasePatch } from "../services/casesStore.js";

function groupCases(cases, groupBy) {
  if (groupBy === "none") return { Todos: cases };

  const keyOf = (c) => {
    if (groupBy === "category") return (c.categoria ?? c.category ?? c.sector ?? "Sin categoría");
    if (groupBy === "status") return (c.estado ?? c.status ?? "Sin estado");
    return "Todos";
  };

  const out = {};
  for (const c of cases) {
    const k = keyOf(c);
    out[k] = out[k] || [];
    out[k].push(c);
  }
  return out;
}

export default function Cases() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [query, setQuery] = useState("");
  const [groupBy, setGroupBy] = useState("category");
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  async function refresh() {
    try {
      setErr("");
      setLoading(true);
      const data = await loadCases();
      setCases(data);
    } catch (e) {
      setErr(e?.message || "Error cargando casos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cases.filter((c) => {
      const title = String(c.titulo ?? c.title ?? c.nombre ?? "");
      const desc = String(c.descripcion ?? c.description ?? "");
      const cat = String(c.categoria ?? c.category ?? c.sector ?? "");
      const hayQ = !q || [title, desc, cat, String(c.id)].some((x) => x.toLowerCase().includes(q));
      const favOk = !onlyFavorites || Boolean(c.favorito);
      return hayQ && favOk;
    });
  }, [cases, query, onlyFavorites]);

  const grouped = useMemo(() => groupCases(filtered, groupBy), [filtered, groupBy]);

  if (loading) return <div>Cargando casos…</div>;
  if (err) return <EmptyState title="No se pudieron cargar los casos" hint={err} />;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h2 style={{ margin: 0 }}>Casos</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={refresh}
            style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ddd", background: "white" }}
          >
            Recargar
          </button>

          <button
            onClick={() => {
              clearLocalEdits();
              refresh();
            }}
            style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ddd", background: "white" }}
          >
            Reset cambios locales
          </button>
        </div>
      </div>

      <CaseFilters
        query={query}
        setQuery={setQuery}
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        onlyFavorites={onlyFavorites}
        setOnlyFavorites={setOnlyFavorites}
      />

      {filtered.length === 0 ? (
        <EmptyState title="Sin resultados" hint="Prueba con otra búsqueda o quita filtros." />
      ) : (
        Object.entries(grouped).map(([group, list]) => (
          <div key={group} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontWeight: 700, marginTop: 10 }}>{group}</div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: 12
              }}
            >
              {list.map((c) => (
                <div key={c.id} style={{ position: "relative" }}>
                  <CaseCard c={c} />

                  {/* Favorito rápido */}
                  <button
                    onClick={() => {
                      saveCasePatch(c.id, { favorito: !c.favorito });
                      setCases((prev) =>
                        prev.map((x) => (x.id === c.id ? { ...x, favorito: !c.favorito } : x))
                      );
                    }}
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      borderRadius: 999,
                      border: "1px solid #ddd",
                      background: "white",
                      padding: "6px 10px",
                      cursor: "pointer"
                    }}
                    title="Marcar como favorito"
                  >
                    {c.favorito ? "★" : "☆"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
