import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer.jsx";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="layoutRoot">
      <div className="layoutOverlay" />

      <div className="layoutContent">
        <NavBar />

        {/* 👇 SIN overflow interno: scroll solo en body */}
        <main className="layoutMain">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
