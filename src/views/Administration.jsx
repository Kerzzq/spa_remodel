import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Administration() {
  const navigate = useNavigate();

  const [cases, setCases] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* =========================
     CARGA DE CASOS
     ========================= */
  useEffect(() => {
    fetch("/api/cases")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar casos");
        return res.json();
      })
      .then((data) => {
        setCases(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudieron cargar los casos");
        setLoading(false);
      });
  }, []);

  /* =========================
     FILTRO POR TEXTO GLOBAL
     ========================= */
  const filteredCases = useMemo(() => {
    if (!query.trim()) return cases;

    const q = query.toLowerCase();

    return cases.filter((c) =>
      Object.values(c).some((value) => {
        if (!value) return false;

        if (Array.isArray(value)) {
          return value.join(" ").toLowerCase().includes(q);
        }

        return String(value).toLowerCase().includes(q);
      })
    );
  }, [cases, query]);

  if (loading) {
    return <div style={{ padding: 40, color: "white" }}>Cargando casos…</div>;
  }

  if (error) {
    return <div style={{ padding: 40, color: "#ffb4b4" }}>{error}</div>;
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", color: "white" }}>
      {/* =========================
          CABECERA
          ========================= */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32
        }}
      >
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 800 }}>
            Case Administration
          </h1>
          <p style={{ opacity: 0.7 }}>
            Manage and organize success stories for the AI Experience Center
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/new")}
          style={{
            background: "#e91e63",
            color: "white",
            border: "none",
            borderRadius: 999,
            padding: "10px 20px",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          + Create New Case
        </button>
      </div>

      {/* =========================
          BUSCADOR
          ========================= */}
      <input
        type="text"
        placeholder="Search by any field…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          marginBottom: 24,
          padding: "12px 16px",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.06)",
          color: "white",
          fontSize: 14
        }}
      />

      {/* =========================
          LISTA DE CASOS
          ========================= */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {filteredCases.map((c) => (
          <div
            key={c.id}
            style={{
              background: "rgba(255,255,255,0.06)",
              borderRadius: 16,
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>
                {c.title ?? "Sin título"}
              </h3>

              <div style={{ fontSize: 13, opacity: 0.75 }}>
                {c.sector && <>Sector: {c.sector}</>}
                {c.year && <> · Año: {c.year}</>}
              </div>

              {c.category && (
                <span
                  style={{
                    display: "inline-block",
                    marginTop: 6,
                    background: "#e91e63",
                    padding: "4px 10px",
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 700
                  }}
                >
                  {c.category}
                </span>
              )}
            </div>

            {/* ACCIONES */}
            <div style={{ display: "flex", gap: 12 }}>
              <IconButton
                label="Ver"
                onClick={() => navigate(`/cases/${c.id}`)}
              />
              <IconButton
                label="Editar"
                onClick={() => navigate(`/admin/${c.id}/edit`)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   BOTÓN ICONO
   ========================= */
function IconButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.25)",
        color: "white",
        borderRadius: 10,
        padding: "6px 12px",
        fontSize: 12,
        cursor: "pointer"
      }}
    >
      {label}
    </button>
  );
}
