import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./views/Home";
import Cases from "./views/Cases";
import CaseDetail from "./views/CaseDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,   // 👈 Layout vive AQUÍ
    children: [
      { index: true, element: <Home /> },
      { path: "cases", element: <Cases /> },
      { path: "cases/:id", element: <CaseDetail /> }
    ]
  }
]);

export default router;
