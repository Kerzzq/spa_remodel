import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminCaseEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  /* =========================
     CARGA POR ID + MAPEO
     ========================= */
  useEffect(() => {
    fetch(`/api/cases/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Caso no encontrado");
        return res.json();
      })
      .then((data) => {
        setForm({
          title: data.title ?? "",
          category: data.category ?? "",
          sector: data.sector ?? "",
          businessSegment: data.business_segment ?? "",
          year: data.fecha ?? "",
          budget: data.costo ?? "",
          description: data.description ?? "",
          solution: data.solution ?? "",
          benefits: data.benefits ?? "",
          services: data.services ?? "",
          roles: data.roles ?? "",
          technology: data.tecnologia ?? data.technology ?? ""
        });
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [id]);

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
      const res = await fetch(`/api/cases/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Error al guardar");

      navigate("/admin");
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div style={{ padding: 40, color: "white" }}>Cargando…</div>;
  if (error) return <div style={{ padding: 40, color: "#ffb4b4" }}>{error}</div>;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", color: "white" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24 }}>
        Editar Caso
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 24
        }}
      >
        {/* COLUMNA IZQUIERDA */}
        <Panel title="Información Básica">
          <Input label="Título del caso" name="title" value={form.title} onChange={handleChange} />
          <Input label="Categoría" name="category" value={form.category} onChange={handleChange} />
          <Input label="Sector" name="sector" value={form.sector} onChange={handleChange} />
          <Input label="Segmento de negocio" name="businessSegment" value={form.businessSegment} onChange={handleChange} />
          <Input label="Año" name="year" value={form.year} onChange={handleChange} />
          <Input label="Coste" name="budget" value={form.budget} onChange={handleChange} />
        </Panel>

        {/* COLUMNA DERECHA */}
        <Panel title="Contenido Descriptivo">
          <Textarea label="Descripción" name="description" value={form.description} onChange={handleChange} />
          <Textarea label="Solución Propuesta" name="solution" value={form.solution} onChange={handleChange} />
          <Textarea label="Servicios Prestados" name="services" value={form.services} onChange={handleChange} />
          <Textarea label="Beneficios Clave" name="benefits" value={form.benefits} onChange={handleChange} />
          <Textarea label="Roles Involucrados" name="roles" value={form.roles} onChange={handleChange} />
          <Textarea label="Stack Tecnológico" name="technology" value={form.technology} onChange={handleChange} />
        </Panel>

        <div style={{ gridColumn: "1 / -1", textAlign: "right" }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              background: "#e91e63",
              border: "none",
              borderRadius: 999,
              padding: "12px 28px",
              color: "white",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            {saving ? "Guardando…" : "Guardar Cambios"}
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
          resize: "none",
          overflow: "hidden",
          lineHeight: 1.5
        }}
      />
    </label>
  );
}
