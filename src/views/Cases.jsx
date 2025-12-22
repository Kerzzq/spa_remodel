import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Cases() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterMode, setFilterMode] = useState("category"); // category | sector
  const [activeFilters, setActiveFilters] = useState([]); // múltiples

  /* =========================
     CARGA DESDE API (COSMOS)
     ========================= */
  useEffect(() => {
    fetch("/api/cases")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar casos");
        return res.json();
      })
      .then((data) => {
        // Normalización defensiva (Cosmos es flexible)
        const normalized = data.map((c) => ({
          id: c.id,
          title: c.title ?? c.name ?? "Sin título",
          description: c.description ?? "",
          category: c.category ?? "Otros",
          sector: c.sector ?? "General"
        }));

        setCases(normalized);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudieron cargar los casos");
        setLoading(false);
      });
  }, []);

  /* =========================
     CONTEO POR FILTRO
     ========================= */
  const filterCounts = useMemo(() => {
    const map = {};

    cases.forEach((c) => {
      const key = filterMode === "category" ? c.category : c.sector;
      if (!key) return;
      map[key] = (map[key] || 0) + 1;
    });

    return Object.entries(map)
      .filter(([, count]) => count > 0)
      .sort((a, b) => b[1] - a[1]);
  }, [cases, filterMode]);

  /* =========================
     CASOS FILTRADOS
     ========================= */
  const filteredCases = useMemo(() => {
    if (activeFilters.length === 0) return cases;

    return cases.filter((c) => {
      const value = filterMode === "category" ? c.category : c.sector;
      return activeFilters.includes(value);
    });
  }, [cases, activeFilters, filterMode]);

  /* =========================
     TOGGLE FILTRO
     ========================= */
  function toggleFilter(value) {
    setActiveFilters((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  }

  function clearFilters() {
    setActiveFilters([]);
  }

  /* =========================
     ESTADOS
     ========================= */
  if (loading) {
    return <div style={{ padding: 40, color: "white" }}>Cargando casos…</div>;
  }

  if (error) {
    return <div style={{ padding: 40, color: "#ffb4b4" }}>{error}</div>;
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", color: "white" }}>
      {/* TÍTULO */}
      <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 24 }}>
        Historias de Éxito
      </h1>

      {/* SELECTOR DE MODO */}
      <div style={{ marginBottom: 20 }}>
        <select
          value={filterMode}
          onChange={(e) => {
            setFilterMode(e.target.value);
            clearFilters();
          }}
          style={{
            background: "#2b003d",
            color: "white",
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: 10,
            padding: "8px 12px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          <option value="category">Filtrar por categoría</option>
          <option value="sector">Filtrar por sector</option>
        </select>
      </div>

      {/* FILTROS */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 32
        }}
      >
        <FilterButton
          label="Ver todos"
          count={cases.length}
          active={activeFilters.length === 0}
          onClick={clearFilters}
        />

        {filterCounts.map(([key, count]) => (
          <FilterButton
            key={key}
            label={key}
            count={count}
            active={activeFilters.includes(key)}
            onClick={() => toggleFilter(key)}
          />
        ))}
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 24
        }}
      >
        {filteredCases.map((c) => (
          <Link key={c.id} to={`/cases/${c.id}`} style={{ textDecoration: "none" }}>
            <article
              style={{
                background: "white",
                borderRadius: 20,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-4px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              {/* TAG */}
              {c.category && (
                <span
                  style={{
                    alignSelf: "flex-start",
                    background: "#e91e63",
                    color: "white",
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: 999
                  }}
                >
                  {c.category}
                </span>
              )}

              {/* TÍTULO */}
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#111",
                  lineHeight: 1.3,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
                }}
              >
                {c.title}
              </h2>

              {/* DESCRIPCIÓN */}
              {c.description && (
                <p
                  style={{
                    color: "#555",
                    fontSize: 14,
                    lineHeight: 1.6,
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}
                >
                  {c.description}
                </p>
              )}
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* =========================
   BOTÓN DE FILTRO
   ========================= */
function FilterButton({ label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        borderRadius: 999,
        padding: "8px 14px",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        border: active ? "none" : "1px solid rgba(255,255,255,0.4)",
        background: active ? "#e91e63" : "transparent",
        color: "white",
        transition: "all 0.15s ease"
      }}
    >
      {label}
      <span
        style={{
          minWidth: 22,
          height: 22,
          borderRadius: "50%",
          background: active ? "rgba(255,255,255,0.25)" : "#e91e63",
          fontSize: 11,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {count}
      </span>
    </button>
  );
}
