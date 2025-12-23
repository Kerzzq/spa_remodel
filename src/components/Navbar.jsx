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

       {/* Logo AMAIA */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/statics/amaia_logo_white.png"
          alt="AMAIA"
          style={{
            height: 52,
            objectFit: "contain"
          }}
        />
      </div>


      {/* Navegación */}
      <nav style={{ display: "flex", gap: 24, fontSize: 16 }}>
        <NavLink to="/" style={navLink}>
          Home
        </NavLink>
        <a href="#" style={linkStyle}>Solutions</a>

        <NavLink to="/cases" style={navLink}>
          Success Stories
        </NavLink>

        <a href="#" style={linkStyle}>Contact</a>
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
