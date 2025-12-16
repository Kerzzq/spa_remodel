import AppRouter from "../router.jsx";
import NavBar from "./NavBar.jsx";
import Chat from "../copilot/Chat.jsx";

export default function Layout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Contenido */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <NavBar />
        <div style={{ flex: 1, overflow: "auto", padding: 20 }}>
          <AppRouter />
        </div>
      </div>

      {/* Chat fijo */}
      <div style={{ width: 380, borderLeft: "1px solid #ddd", height: "100vh" }}>
        <Chat />
      </div>
    </div>
  );
}
