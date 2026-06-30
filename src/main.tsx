import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./routes/App";
import CaseStudy from "./routes/CaseStudy";
import Contact from "./routes/Contact";
import Home from "./routes/Home";
import Info from "./routes/Info";
import LegalPage from "./routes/LegalPage";
import "./styles.css";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "work/:slug",
        element: <CaseStudy />,
      },
      {
        path: "info",
        element: <Info />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "privacy-policy",
        element: <LegalPage page="privacy" />,
      },
      {
        path: "cookie-policy",
        element: <LegalPage page="cookies" />,
      },
    ],
  },
];

const basename =
  import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL;

const router = createBrowserRouter(routes, { basename });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
