import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { homepageCaseStudies } from "../content/caseStudies";
import { pageContent } from "../content/pages";
import { sharedContent } from "../content/shared";
import "./Home.css";

type HomepageTileLayout = {
  className: string;
};

const homepageTileLayouts: HomepageTileLayout[] = [
  { className: "work-tile-wide" },
  { className: "work-tile-narrow" },
  { className: "work-tile-narrow" },
  { className: "work-tile-wide" },
  { className: "work-tile-wide" },
  { className: "work-tile-narrow" },
] as const;

export default function Home() {
  const { home } = pageContent;
  const { cta } = sharedContent;

  return (
    <div className="page-stack">
      <section className="portfolio-page">
        <div className="content-main">
          <div className="content-section">
            <h1>{home.hero.heading}</h1>
          </div>
        </div>
      </section>

      <section
        className="bento-grid gallery-grid"
        id="work"
        aria-label={home.workAriaLabel}
      >
        {homepageCaseStudies.map((project, index) => (
          <ProjectCard
            className={
              homepageTileLayouts[index % homepageTileLayouts.length].className
            }
            project={project}
            revealDelay={(index + 1) * 240}
            thumbnailLoading={index < 2 ? "eager" : "lazy"}
            key={project.slug}
          />
        ))}
      </section>

      <div className="cta-section">
        <h2>{cta.heading}</h2>
        <p>{cta.body}</p>
        <Link className="button-link" to={cta.actionTo}>
          {cta.actionLabel}
        </Link>
      </div>
    </div>
  );
}
