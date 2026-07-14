import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./routes/App";
import "./styles.css";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("./routes/Home")).default,
        }),
      },
      {
        path: "work/:slug",
        lazy: async () => ({
          Component: (await import("./routes/CaseStudy")).default,
        }),
      },
      {
        path: "info",
        lazy: async () => ({
          Component: (await import("./routes/Info")).default,
        }),
      },
      {
        path: "contact",
        lazy: async () => ({
          Component: (await import("./routes/Contact")).default,
        }),
      },
      {
        path: "privacy-policy",
        lazy: async () => {
          const LegalPage = (await import("./routes/LegalPage")).default;

          return {
            Component: () => <LegalPage page="privacy" />,
          };
        },
      },
      {
        path: "cookie-policy",
        lazy: async () => {
          const LegalPage = (await import("./routes/LegalPage")).default;

          return {
            Component: () => <LegalPage page="cookies" />,
          };
        },
      },
      {
        path: "*",
        lazy: async () => ({
          Component: (await import("./routes/NotFound")).default,
        }),
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
