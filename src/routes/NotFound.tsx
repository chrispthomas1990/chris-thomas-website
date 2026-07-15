import NavigationButton from "../components/NavigationButton";
import { sharedContent } from "../content/shared";

export default function NotFound() {
  const { pageNotFound } = sharedContent;

  return (
    <div className="page-stack">
      <section className="content-main">
        <section className="content-section not-found-section">
          <h1>{pageNotFound.heading}</h1>
          <p>{pageNotFound.body}</p>
          <NavigationButton to={pageNotFound.actionTo}>
            {pageNotFound.actionLabel}
          </NavigationButton>
        </section>
      </section>
    </div>
  );
}
