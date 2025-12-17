import { Link, useLocation } from "react-router-dom";

function NavLink({ to, label }) {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        padding: "8px 12px",
        borderRadius: 8,
        color: "white",
        background: active ? "#222" : "transparent"
      }}
    >
      {label}
    </Link>
  );
}

export default function NavBar() {
  return (
    <div style={{ padding: 16, borderBottom: "1px solid #eee", display: "flex", gap: 8 }}>
      <div style={{ fontWeight: 700, marginRight: 12, fontSize: 28 }}>Showroom IA</div>
      <NavLink to="/" label="Home" />
      <NavLink to="/cases" label="Casos" />
    </div>
  );
}
