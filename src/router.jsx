import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home.jsx";
import Cases from "./views/Cases.jsx";
import CaseDetail from "./views/CaseDetail.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/cases", element: <Cases /> },
  { path: "/cases/:id", element: <CaseDetail /> }
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
