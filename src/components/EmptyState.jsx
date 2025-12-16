export default function EmptyState({ title, hint }) {
  return (
    <div style={{ padding: 24, border: "1px dashed #ccc", borderRadius: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <div style={{ opacity: 0.8 }}>{hint}</div>
    </div>
  );
}
