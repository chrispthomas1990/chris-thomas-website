import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { pageContent } from "../content/pages";
import { projects } from "../content/projects";
import { sharedContent } from "../content/shared";
import "./Home.css";

export default function Home() {
  const { home } = pageContent;
  const { cta } = sharedContent;

  return (
    <div className="page-stack">
      <section className="portfolio-page">
        <div className="content-main">
          <div className="content-section">
            <p className="kicker">{home.hero.kicker}</p>
            <h1>{home.hero.heading}</h1>
          </div>
        </div>
      </section>

      <section className="gallery-grid" id="work" aria-label={home.workAriaLabel}>
        {projects.map((project) => (
          <ProjectCard project={project} key={project.slug} />
        ))}
      </section>

      <div className="cta-section">
        <p className="kicker">{cta.kicker}</p>
        <h2>{cta.heading}</h2>
        <p>{cta.body}</p>
        <Link className="button-link" to={cta.actionTo}>
          {cta.actionLabel}
        </Link>
      </div>
    </div>
  );
}
