import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Administration() {
  const navigate = useNavigate();

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

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
        setCases(data);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudieron cargar los casos");
        setLoading(false);
      });
  }, []);

  /* =========================
     FILTRO GLOBAL (SEARCH)
     ========================= */
  const filteredCases = useMemo(() => {
    if (!search.trim()) return cases;

    const q = search.toLowerCase();

    return cases.filter((c) =>
      Object.values(c).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(q)
      )
    );
  }, [cases, search]);

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
    <div style={{ maxWidth: 1100, margin: "0 auto", color: "white" }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 28
        }}
      >
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 800 }}>
            Case Administration
          </h1>
          <p style={{ opacity: 0.7, fontSize: 14 }}>
            Manage and organize success stories
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/create")}
          style={{
            background: "linear-gradient(135deg, #e91e63, #ff5fa2)",
            border: "none",
            color: "white",
            padding: "10px 18px",
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          + Create New Case
        </button>
      </div>

      {/* SEARCH */}
      <div style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Search by any field..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.06)",
            color: "white",
            outline: "none"
          }}
        />
      </div>

      {/* LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {filteredCases.map((c) => (
          <button
            key={c.id}
            onClick={() => navigate(`/admin/${c.id}`)}
            style={{
              background: "rgba(255,255,255,0.06)",
              borderRadius: 16,
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
              textAlign: "left",
              color: "white",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
            }
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
          </button>
        ))}

        {filteredCases.length === 0 && (
          <div style={{ opacity: 0.6, padding: 20 }}>
            No cases match your search
          </div>
        )}
      </div>
    </div>
  );
}
