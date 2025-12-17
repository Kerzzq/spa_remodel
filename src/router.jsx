import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./views/Home.jsx";
import Cases from "./views/Cases.jsx";
import CaseDetail from "./views/CaseDetail.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,   // 👈 Layout DENTRO del Router
    children: [
      { path: "/", element: <Home /> },
      { path: "/cases", element: <Cases /> },
      { path: "/cases/:id", element: <CaseDetail /> }
    ]
  }
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
