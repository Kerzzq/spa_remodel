import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { loadCases } from "../services/casesStore.js";

export default function Cases() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("ALL");

  useEffect(() => {
    let mounted = true;

    loadCases()
      .then((data) => {
        if (mounted) {
          setCases(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (mounted) {
          setError("No se pudieron cargar los casos");
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  /** Categorías únicas para los filtros */
  const categories = useMemo(() => {
    const set = new Set();
    cases.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return ["ALL", ...Array.from(set)];
  }, [cases]);

  const categoryCounts = useMemo(() => {
    const counts = {};
    cases.forEach((c) => {
      if (!c.category) return;
        counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, [cases]);


  /** Casos filtrados */
  const filteredCases = useMemo(() => {
    if (activeCategory === "ALL") return cases;
    return cases.filter((c) => c.category === activeCategory);
  }, [cases, activeCategory]);

  if (loading) {
    return <div style={{ padding: 40, color: "white" }}>Cargando casos…</div>;
  }

  if (error) {
    return (
      <div style={{ padding: 40, color: "#ffb4b4" }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", color: "white" }}>
      {/* TÍTULO */}
      <h1
        style={{
          fontSize: 48,
          fontWeight: 800,
          marginBottom: 24
        }}
      >
        Historias de Éxito
      </h1>

      {/* FILTROS */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 32
        }}
      >
        {categories.map((cat) => {
  const active = activeCategory === cat;
  const count =
    cat === "ALL"
      ? cases.length
      : categoryCounts[cat] ?? 0;

  return (
    <button
      key={cat}
      onClick={() => setActiveCategory(cat)}
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
        color: "white"
      }}
    >
              <span>
                {cat === "ALL" ? "Ver todos" : cat}
              </span>

              {/* CONTADOR */}
              <span
                style={{
                  minWidth: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: active
                    ? "rgba(255,255,255,0.25)"
                    : "#e91e63",
                  color: "white",
                  fontSize: 11,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: 1
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* GRID DE CASOS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 24
        }}
      >
        {filteredCases.map((c) => (
          <Link
            key={c.id}
            to={`/cases/${c.id}`}
            style={{ textDecoration: "none" }}
          >
            <article
              style={{
                background: "white",
                borderRadius: 18,
                padding: 28,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-4px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              {/* CATEGORÍA */}
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
                  color: "#111"
                }}
              >
                {c.title ?? c.name}
              </h2>

              {/* DESCRIPCIÓN */}
              {c.description && (
                <p
                  style={{
                    color: "#555",
                    fontSize: 14,
                    lineHeight: 1.6
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
