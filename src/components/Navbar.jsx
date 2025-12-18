import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header
      style={{
        padding: "24px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.15)"
      }}
    >
      {/* Logo Inetum */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontWeight: 900, fontSize: 24 }}>
          inetum
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              background: "white",
              marginLeft: 2
            }}
          />
        </span>
      </div>

      {/* Navegación */}
      <nav style={{ display: "flex", gap: 24, fontSize: 14 }}>
        <NavLink to="/" style={navLink}>
          Home
        </NavLink>
        <a href="#" style={linkStyle}>Soluciones</a>
        <a href="#" style={linkStyle}>Sectores</a>

        <NavLink to="/cases" style={navLink}>
          Historias de Éxito
        </NavLink>

        <a href="#" style={linkStyle}>Contacto</a>
      </nav>
    </header>
  );
}

const linkStyle = {
  color: "rgba(255,255,255,0.85)",
  textDecoration: "none",
  fontWeight: 500
};

const navLink = ({ isActive }) => ({
  color: "white",
  fontWeight: 700,
  textDecoration: "none"
});
