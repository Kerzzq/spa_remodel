import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function Home() {
  const { uiMessage, setUiMessage } = useApp();

  return (
    <div style={{ alignItems: "center", display: "flex", flexDirection: "column", gap: 12 }}>
      <h1 style={{ marginTop: 0 }}>Welcome - AMAIA</h1>

      <div style={{ display: "flex", gap: 0, alignItems: "center", flexWrap: "wrap" }}>
        <Link
          to="/presentation"
          style={{
            border: "1px solid #e6e6e6",
            borderRadius: 12,
            backgroundOpacity: 10,
            fontWeight: 900,
            color: "white",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            textDecoration: "none",
          }}
        >
          Amaia Presentation
        </Link>
      </div>


      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <Link
          to="/cases"
          style={{
            border: "1px solid #e6e6e6",
            borderRadius: 12,
            backgroundOpacity: 10,
            fontWeight: 900,
            color: "white",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            textDecoration: "none",
          }}
        >
          Success Stories
        </Link>
      </div>




      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <Link
          to="/"
          style={{
            border: "1px solid #e6e6e6",
            borderRadius: 12,
            backgroundOpacity: 10,
            fontWeight: 900,
            color: "white",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            textDecoration: "none",
          }}
        >
          Let's Explore
        </Link>
      </div>


            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <Link
          to="/administration"
          style={{
            border: "1px solid #e6e6e6",
            borderRadius: 12,
            backgroundOpacity: 10,
            fontWeight: 900,
            color: "white",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            textDecoration: "none",
          }}
        >
          Administration
        </Link>
      </div>

      <hr style={{ margin: "20px 0", border: 0, borderTop: "1px solid #eee" }} />

    </div>
  );
}
