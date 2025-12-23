import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./views/Home";
import Cases from "./views/Cases";
import CaseDetail from "./views/CaseDetail";
import AmaiaPresentation from "./views/AmaiaPresentation";
import Administration from "./views/Administration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,   // 👈 Layout vive AQUÍ
    children: [
      { index: true, element: <Home /> },
      { path: "cases", element: <Cases /> },
      { path: "cases/:id", element: <CaseDetail /> },
      { path: "presentation", element: <AmaiaPresentation /> },
      { path: "administration", element: <Administration /> }
    ]
  }
]);

export default router;
