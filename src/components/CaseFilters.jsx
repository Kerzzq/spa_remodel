export default function CaseFilters({
  query,
  setQuery,
  groupBy,
  setGroupBy,
  onlyFavorites,
  setOnlyFavorites
}) {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar..."
        style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd", minWidth: 220 }}
      />

      <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
        Agrupar por:
        <select
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
          style={{ padding: 8, borderRadius: 10, border: "1px solid #ddd" }}
        >
          <option value="none">Nada</option>
          <option value="category">Categoría</option>
          <option value="status">Estado</option>
        </select>
      </label>

      <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <input
          type="checkbox"
          checked={onlyFavorites}
          onChange={(e) => setOnlyFavorites(e.target.checked)}
        />
        Solo favoritos
      </label>
    </div>
  );
}
