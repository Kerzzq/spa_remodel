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
     CARGA DEL CASO POR ID
     ========================= */
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/api/cases/${id}`)
      .then((res) => {
        if (res.status === 404) {
          throw new Error("Caso no encontrado");
        }
        if (!res.ok) {
          throw new Error("Error al cargar el caso");
        }
        return res.json();
      })
      .then((data) => {
        setForm({
          title: data.title ?? "",
          category: data.category ?? "",
          sector: data.sector ?? "",
          year: data.year ?? "",
          description: data.description ?? "",
          solution: data.solution ?? "",
          benefits: Array.isArray(data.benefits)
            ? data.benefits.join("\n")
            : data.benefits ?? "",
          services: Array.isArray(data.services)
            ? data.services.join("\n")
            : data.services ?? "",
          roles: Array.isArray(data.roles)
            ? data.roles.join("\n")
            : data.roles ?? "",
          technology: Array.isArray(data.technology)
            ? data.technology.join("\n")
            : data.technology ?? "",
          budget: data.budget ?? "",
          status: data.status ?? ""
        });

        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [id]);

  /* =========================
     HANDLERS
     ========================= */
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function normalizeArray(value) {
    return value
      .split("\n")
      .map((v) => v.trim())
      .filter(Boolean);
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
      ...form,
      year: Number(form.year),
      benefits: normalizeArray(form.benefits),
      services: normalizeArray(form.services),
      roles: normalizeArray(form.roles),
      technology: normalizeArray(form.technology)
    };

    try {
      const res = await fetch(`/api/cases/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Error al guardar cambios");
      }

      navigate("/admin");
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  /* =========================
     ESTADOS
     ========================= */
  if (loading) {
    return <div style={{ padding: 40, color: "white" }}>Cargando…</div>;
  }

  if (error) {
    return <div style={{ padding: 40, color: "#ffb4b4" }}>{error}</div>;
  }

  if (!form) {
    return (
      <div style={{ padding: 40, color: "#ffb4b4" }}>
        No se pudo cargar el caso
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", color: "white" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24 }}>
        Edit Case
      </h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
        <Input label="Title" name="title" value={form.title} onChange={handleChange} />
        <Input label="Category" name="category" value={form.category} onChange={handleChange} />
        <Input label="Sector" name="sector" value={form.sector} onChange={handleChange} />
        <Input label="Year" name="year" value={form.year} onChange={handleChange} />
        <Input label="Budget" name="budget" value={form.budget} onChange={handleChange} />
        <Input label="Status" name="status" value={form.status} onChange={handleChange} />

        <Textarea label="Description" name="description" value={form.description} onChange={handleChange} />
        <Textarea label="Solution" name="solution" value={form.solution} onChange={handleChange} />

        <Textarea label="Benefits (one per line)" name="benefits" value={form.benefits} onChange={handleChange} />
        <Textarea label="Services (one per line)" name="services" value={form.services} onChange={handleChange} />
        <Textarea label="Roles (one per line)" name="roles" value={form.roles} onChange={handleChange} />
        <Textarea label="Technology (one per line)" name="technology" value={form.technology} onChange={handleChange} />

        <button
          type="submit"
          disabled={saving}
          style={{
            background: "#e91e63",
            border: "none",
            borderRadius: 999,
            padding: "12px 20px",
            color: "white",
            fontWeight: 700,
            cursor: "pointer",
            opacity: saving ? 0.7 : 1
          }}
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

/* =========================
   INPUTS REUTILIZABLES
   ========================= */

function Input({ label, ...props }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 13, opacity: 0.8 }}>{label}</span>
      <input
        {...props}
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.06)",
          color: "white"
        }}
      />
    </label>
  );
}

function Textarea({ label, ...props }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 13, opacity: 0.8 }}>{label}</span>
      <textarea
        {...props}
        rows={4}
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.06)",
          color: "white",
          resize: "vertical"
        }}
      />
    </label>
  );
}
