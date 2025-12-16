import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function Home() {
  const { uiMessage, setUiMessage } = useApp();

  return (
    <div style={{ maxWidth: 900 }}>
      <h1 style={{ marginTop: 0 }}>Welcome - AIXC</h1>

      <p style={{ opacity: 0.85 }}>
        Esta es la SPA React migrada (sin iframes internos). Navega a la sección de casos
        para ver el showroom.
      </p>

      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <Link
          to="/cases"
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            background: "#222",
            color: "white",
            textDecoration: "none"
          }}
        >
          Ver casos →
        </Link>

        <button
          onClick={() => setUiMessage("Mensaje global actualizado desde Home")}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #ddd",
            background: "white"
          }}
        >
          Probar estado global
        </button>

        <div style={{ opacity: 0.8 }}>Estado global: <b>{uiMessage}</b></div>
      </div>

      <hr style={{ margin: "20px 0", border: 0, borderTop: "1px solid #eee" }} />

      <p style={{ opacity: 0.85 }}>
        Si copiaste <code>/public/statics</code>, luego podemos usar imágenes/tiles como en el HTML original.
      </p>
    </div>
  );
}
