import { Link } from "react-router-dom";
import { sharedContent } from "../content/shared";

export default function NotFound() {
  const { pageNotFound } = sharedContent;

  return (
    <div className="page-stack">
      <section className="content-main">
        <section className="content-section not-found-section">
          <h1>{pageNotFound.heading}</h1>
          <p>{pageNotFound.body}</p>
          <Link className="button-link" to={pageNotFound.actionTo}>
            {pageNotFound.actionLabel}
          </Link>
        </section>
      </section>
    </div>
  );
}
