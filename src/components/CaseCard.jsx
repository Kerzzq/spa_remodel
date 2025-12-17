import { Link } from "react-router-dom";

export default function CaseCard({ c }) {
  const title = c.titulo ?? c.title ?? c.nombre ?? `Caso ${c.id}`;
  const desc = c.descripcion ?? c.description ?? "";
  const category = c.categoria ?? c.category ?? c.sector ?? "";
  const status = c.estado ?? c.status ?? "";

  return (
    <div
      style={{
        border: "1px solid #e6e6e6",
        borderRadius: 12,
        background: "black",
        backgroundOpacity: 10,
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 8
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
        <div style={{ fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>{status}</div>
      </div>

      {category ? <div style={{ fontSize: 12, opacity: 0.8 }}>{category}</div> : null}

      {desc ? <div style={{ fontSize: 13, opacity: 0.9 }}>{desc}</div> : null}

      <div style={{ marginTop: "auto" }}>
        <Link to={`/cases/${encodeURIComponent(c.id)}`}>Ver detalle →</Link>
      </div>
    </div>
  );
}
