import { useState } from "react";
import { useNavigate } from "react-router-dom";

const INITIAL_STATE = {
  title: "",
  category: "",
  sector: "",
  year: "",
  description: "",
  solution: "",
  benefits: "",
  services: "",
  roles: "",
  technology: "",
  budget: "",
  status: ""
};

export default function AdminCaseCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

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
    return Object.values(form).every((v) => v.trim() !== "");
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
      const res = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error();

      navigate("/admin");
    } catch {
      setError("Error al crear el caso");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", color: "white" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24 }}>
        Create New Case
      </h1>

      {error && (
        <div style={{ color: "#ffb4b4", marginBottom: 16 }}>{error}</div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
        <Input name="title" label="Title" value={form.title} onChange={handleChange} />
        <Input name="category" label="Category" value={form.category} onChange={handleChange} />
        <Input name="sector" label="Sector" value={form.sector} onChange={handleChange} />
        <Input name="year" label="Year" value={form.year} onChange={handleChange} />
        <Input name="budget" label="Budget" value={form.budget} onChange={handleChange} />
        <Input name="status" label="Status" value={form.status} onChange={handleChange} />

        <Textarea name="description" label="Description" value={form.description} onChange={handleChange} />
        <Textarea name="solution" label="Solution" value={form.solution} onChange={handleChange} />

        <Textarea name="benefits" label="Benefits (one per line)" value={form.benefits} onChange={handleChange} />
        <Textarea name="services" label="Services (one per line)" value={form.services} onChange={handleChange} />
        <Textarea name="roles" label="Roles (one per line)" value={form.roles} onChange={handleChange} />
        <Textarea name="technology" label="Technology (one per line)" value={form.technology} onChange={handleChange} />

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
            cursor: "pointer"
          }}
        >
          {saving ? "Saving…" : "Create Case"}
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
