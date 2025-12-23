import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminCaseEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/cases")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((c) => String(c.id) === String(id));
        if (!found) throw new Error();

        setForm({
          ...found,
          benefits: (found.benefits || []).join("\n"),
          services: (found.services || []).join("\n"),
          roles: (found.roles || []).join("\n"),
          technology: (found.technology || []).join("\n")
        });

        setLoading(false);
      })
      .catch(() => {
        setError("Caso no encontrado");
        setLoading(false);
      });
  }, [id]);

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
    return Object.values(form).every((v) => String(v).trim() !== "");
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

      if (!res.ok) throw new Error();

      navigate("/admin");
    } catch {
      setError("Error al guardar cambios");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div style={{ padding: 40, color: "white" }}>Cargando…</div>;
  }

  if (error) {
    return <div style={{ padding: 40, color: "#ffb4b4" }}>{error}</div>;
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", color: "white" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24 }}>
        Edit Case
      </h1>

      {error && (
        <div style={{ color: "#ffb4b4", marginBottom: 16 }}>{error}</div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
        {Object.keys(form).map(
          (key) =>
            key !== "id" && (
              key === "description" ||
              key === "solution" ||
              key === "benefits" ||
              key === "services" ||
              key === "roles" ||
              key === "technology" ? (
                <Textarea
                  key={key}
                  name={key}
                  label={key}
                  value={form[key]}
                  onChange={handleChange}
                />
              ) : (
                <Input
                  key={key}
                  name={key}
                  label={key}
                  value={form[key]}
                  onChange={handleChange}
                />
              )
            )
        )}

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
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

/* =========================
   INPUTS
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
