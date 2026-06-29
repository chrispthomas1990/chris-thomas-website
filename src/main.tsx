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

const router = createBrowserRouter([
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
        path: "sitemap",
        element: <LegalPage page="sitemap" />,
      },
      {
        path: "privacy-policy",
        element: <LegalPage page="privacy" />,
      },
      {
        path: "cookie-policy",
        element: <LegalPage page="cookies" />,
      },
      {
        path: "accessibility-statement",
        element: <LegalPage page="accessibility" />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
