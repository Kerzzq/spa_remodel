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
      <div className="inetumLogo">
        <span className="inetumWord">inetum</span>

        <span className="inetumMark">
          <span className="inetumSquare ad" />
          <span className="inetumSquare am" />
          <span className="inetumSquare md" />
          <span className="inetumSquare ii" />
        </span>
      </div>


      {/* Navegación */}
      <nav style={{ display: "flex", gap: 24, fontSize: 14 }}>
        <NavLink to="/" style={navLink}>
          Home
        </NavLink>
        <a href="#" style={linkStyle}>Soluciones</a>

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
