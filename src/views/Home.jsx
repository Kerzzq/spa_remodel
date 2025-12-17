import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function Home() {
  const { uiMessage, setUiMessage } = useApp();

  return (
    <div style={{ maxWidth: 900, alignItems: "center", display: "flex", flexDirection: "column", gap: 3 }}>
      <h1 style={{ marginTop: 0 }}>Welcome - AIXC</h1>

      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <Link
          to="/cases"
          style={{
            border: "1px solid #e6e6e6",
            borderRadius: 12,
            backgroundOpacity: 10,
            color: "white",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            textDecoration: "none",
          }}
        >
          Ver casos →
        </Link>
      </div>

      <hr style={{ margin: "20px 0", border: 0, borderTop: "1px solid #eee" }} />

    </div>
  );
}
