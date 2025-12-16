import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EmptyState from "../components/EmptyState.jsx";
import { loadCases, saveCasePatch } from "../services/casesStore.js";

export default function CaseDetail() {
  const { id } = useParams();

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setErr("");
        setLoading(true);
        const data = await loadCases();
        setCases(data);
      } catch (e) {
        setErr(e?.message || "Error cargando el caso");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const c = useMemo(() => cases.find((x) => String(x.id) === String(id)), [cases, id]);

  useEffect(() => {
    if (!c) return;
    setNote(String(c.nota ?? ""));
    setStatus(String(c.estado ?? c.status ?? ""));
  }, [c]);

  if (loading) return <div>Cargando caso…</div>;
  if (err) return <EmptyState title="No se pudo cargar el caso" hint={err} />;
  if (!c) return <EmptyState title="Caso no encontrado" hint={`No existe el caso con id ${id}.`} />;

  const title = c.titulo ?? c.title ?? c.nombre ?? `Caso ${c.id}`;
  const desc = c.descripcion ?? c.description ?? "";
  const category = c.categoria ?? c.category ?? c.sector ?? "";
  const media = c.imagen ?? c.image ?? c.media ?? ""; // si en tu JSON hay algo así

  return (
    <div style={{ maxWidth: 980, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            <Link to="/cases">← Volver</Link>
          </div>
          <h2 style={{ margin: "6px 0" }}>{title}</h2>
          <div style={{ opacity: 0.8 }}>{category}</div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>ID: {c.id}</div>
        </div>
      </div>

      {desc ? <p style={{ margin: 0, opacity: 0.9 }}>{desc}</p> : null}

      {/* Media opcional si existe ruta en JSON */}
      {media ? (
        <div style={{ border: "1px solid #eee", borderRadius: 12, overflow: "hidden" }}>
          {/* si media es una imagen en /statics/... */}
          <img src={media} alt={title} style={{ width: "100%", display: "block" }} />
        </div>
      ) : null}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 14 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Estado</div>
          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Ej: En progreso / Completado..."
            style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          />
        </div>

        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 14 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Nota interna</div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Apuntes sobre el caso..."
            rows={4}
            style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd", resize: "vertical" }}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          onClick={() => {
            saveCasePatch(c.id, { nota: note, estado: status });
            setCases((prev) => prev.map((x) => (x.id === c.id ? { ...x, nota: note, estado: status } : x)));
          }}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #ddd",
            background: "#222",
            color: "white"
          }}
        >
          Guardar cambios (local)
        </button>

        <button
          onClick={() => {
            setNote(String(c.nota ?? ""));
            setStatus(String(c.estado ?? c.status ?? ""));
          }}
          style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ddd", background: "white" }}
        >
          Revertir
        </button>
      </div>
    </div>
  );
}
