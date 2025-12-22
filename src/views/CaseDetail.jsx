import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CaseDetail() {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/cases")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        const found = data.find((c) => String(c.id) === String(id));
        if (!found) throw new Error("Caso no encontrado");
        setCaseData(found);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div style={{ padding: 60, color: "white" }}>Cargando caso…</div>;
  }

  if (error) {
    return <div style={{ padding: 60, color: "#ffb4b4" }}>{error}</div>;
  }

  const {
    title,
    category,
    sector,
    year,
    description,
    solution,
    benefits,
    roles,
    services,
    technology,
    budget,
    status
  } = caseData;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", color: "white" }}>
      {/* CABECERA */}
      <div style={{ marginBottom: 32 }}>
        {category && (
          <span
            style={{
              background: "#e91e63",
              padding: "6px 14px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700
            }}
          >
            {category}
          </span>
        )}

        <h1
          style={{
            fontSize: 42,
            fontWeight: 800,
            marginTop: 16,
            marginBottom: 12,
            lineHeight: 1.2
          }}
        >
          {title}
        </h1>

        <div style={{ opacity: 0.85, fontSize: 14 }}>
          {sector && <>Sector: {sector}</>}
          {year && <> · Año: {year}</>}
        </div>
      </div>

      {/* GRID PRINCIPAL */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 28
        }}
      >
        {/* COLUMNA IZQUIERDA */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Section title="Descripción y contexto">
            <p>{description}</p>
          </Section>

          {solution && (
            <Section title="Solución propuesta">
              <p>{solution}</p>
            </Section>
          )}

          {services?.length > 0 && (
            <Section title="Servicios entregados">
              <ul>
                {services.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        {/* COLUMNA DERECHA */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {budget && (
            <Card title="Coste del proyecto">
              <div style={{ fontSize: 28, fontWeight: 800 }}>{budget}</div>
              {status && (
                <div style={{ fontSize: 12, opacity: 0.8 }}>{status}</div>
              )}
            </Card>
          )}

          {benefits?.length > 0 && (
            <Card title="Beneficios clave">
              <ul>
                {benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Card>
          )}

          {roles?.length > 0 && (
            <Card title="Roles involucrados">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {roles.map((r) => (
                  <span
                    key={r}
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      padding: "6px 12px",
                      borderRadius: 999,
                      fontSize: 12
                    }}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {technology?.length > 0 && (
            <Card title="Tecnología">
              <ul>
                {technology.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENTES AUX ---------- */

function Section({ title, children }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.06)",
        borderRadius: 18,
        padding: 24
      }}
    >
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.08)",
        borderRadius: 18,
        padding: 20
      }}
    >
      <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>
        {title}
      </h3>
      {children}
    </div>
  );
}
