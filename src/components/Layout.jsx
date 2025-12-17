import { Outlet } from "react-router-dom";
import NavBar from "./Navbar.jsx";
import Chat from "../copilot/Chat.jsx";

export default function Layout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Contenido */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <NavBar />
        <div style={{ flex: 1, overflow: "auto", padding: 20 }}>
          <Outlet />
        </div>
      </div>

      {/* Chat fijo */}
      <div style={{ width: 380, borderLeft: "1px solid #ddd" }}>
        <Chat />
      </div>
    </div>
  );
}
