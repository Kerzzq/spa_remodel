import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminCaseCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    sector: "",
    businessSegment: "",
    year: "",
    budget: "",
    description: "",
    solution: "",
    benefits: "",
    services: "",
    roles: "",
    technology: ""
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    return Object.values(form).every(
      (v) => String(v).trim() !== ""
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      title: form.title,
      category: form.category,
      sector: form.sector,
      business_segment: form.businessSegment,
      fecha: form.year,
      costo: form.budget,
      description: form.description,
      solution: form.solution,
      benefits: form.benefits,
      services: form.services,
      roles: form.roles,
      tecnologia: form.technology
    };

    try {
      const res = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Error al crear el caso");
      }

      navigate("/admin");
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", color: "white" }}>
      {/* HEADER */}
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
        Crear Nuevo Caso
      </h1>

      <p style={{ opacity: 0.7, marginBottom: 24 }}>
        Documenta una nueva historia de éxito para el catálogo de experiencias de IA.
      </p>

      {error && (
        <div style={{ color: "#ffb4b4", marginBottom: 16 }}>
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 24
        }}
      >
        {/* =========================
            COLUMNA IZQUIERDA
            ========================= */}
        <Panel title="Información Básica">
          <Input label="Título del caso" name="title" value={form.title} onChange={handleChange} />
          <Input label="Categoría" name="category" value={form.category} onChange={handleChange} />
          <Input label="Sector" name="sector" value={form.sector} onChange={handleChange} />
          <Input
            label="Segmento de negocio"
            name="businessSegment"
            value={form.businessSegment}
            onChange={handleChange}
          />
          <Input label="Año" name="year" value={form.year} onChange={handleChange} />
          <Input label="Coste" name="budget" value={form.budget} onChange={handleChange} />
        </Panel>

        {/* =========================
            COLUMNA DERECHA
            ========================= */}
        <Panel title="Contenido Descriptivo">
          <Textarea label="Descripción" name="description" value={form.description} onChange={handleChange} />
          <Textarea label="Solución Propuesta" name="solution" value={form.solution} onChange={handleChange} />
          <Textarea label="Servicios Prestados" name="services" value={form.services} onChange={handleChange} />
          <Textarea label="Beneficios Clave" name="benefits" value={form.benefits} onChange={handleChange} />
          <Textarea label="Roles Involucrados" name="roles" value={form.roles} onChange={handleChange} />
          <Textarea label="Stack Tecnológico" name="technology" value={form.technology} onChange={handleChange} />
        </Panel>

        {/* =========================
            ACTIONS
            ========================= */}
        <div
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            justifyContent: "flex-end",
            gap: 12
          }}
        >
          <button
            type="button"
            onClick={() => navigate("/admin")}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 999,
              padding: "10px 22px",
              color: "white",
              cursor: "pointer"
            }}
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={saving}
            style={{
              background: "#e91e63",
              border: "none",
              borderRadius: 999,
              padding: "10px 26px",
              color: "white",
              fontWeight: 700,
              cursor: "pointer",
              opacity: saving ? 0.7 : 1
            }}
          >
            {saving ? "Guardando…" : "Guardar Caso"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* =========================
   UI COMPONENTS
   ========================= */

function Panel({ title, children }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.06)",
        borderRadius: 18,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 14
      }}
    >
      <h3 style={{ fontSize: 16, fontWeight: 800 }}>{title}</h3>
      {children}
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 12, opacity: 0.75 }}>{label}</span>
      <input
        {...props}
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.08)",
          color: "white"
        }}
      />
    </label>
  );
}
function Textarea({ label, ...props }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 12, opacity: 0.75 }}>{label}</span>
      <textarea
        {...props}
        rows={1}
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.08)",
          color: "white",
          resize: "vertical",     // ✅ se puede redimensionar
          overflow: "hidden",     // ✅ scrollbar oculto
          lineHeight: 1.5
        }}
      />
    </label>
  );
}
