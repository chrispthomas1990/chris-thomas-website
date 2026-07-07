import {
  faArrowLeft,
  faArrowRight,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import {
  caseStudies,
  caseStudyMediaPanelCount,
  projectContent,
} from "../content/caseStudies";
import { sharedContent } from "../content/shared";
import { useScrollThreshold } from "../hooks";
import NotFound from "./NotFound";
import "./CaseStudy.css";

export default function CaseStudy() {
  const { slug } = useParams();
  const isSubnavVisible = useScrollThreshold(128, 80);
  const projectIndex = caseStudies.findIndex((item) => item.slug === slug);
  const project = projectIndex >= 0 ? caseStudies[projectIndex] : undefined;
  const { caseStudy } = projectContent;
  const { cta } = sharedContent;

  if (!project) {
    return <NotFound />;
  }

  const previousProject =
    caseStudies[(projectIndex - 1 + caseStudies.length) % caseStudies.length];
  const nextProject = caseStudies[(projectIndex + 1) % caseStudies.length];
  const projectTitleForLabels = project.title.replace(/\.$/, "");
  const mediaPanelIndexes = Array.from(
    { length: caseStudyMediaPanelCount },
    (_, index) => index + 1,
  );

  return (
    <article className="case-study">
      <nav
        className={`case-study-subnav${isSubnavVisible ? " is-visible" : ""}`}
        aria-label={caseStudy.navAriaLabel}
      >
        <Link
          to={`/work/${previousProject.slug}`}
          aria-label={caseStudy.previousAriaLabel}
        >
          <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
        </Link>
        <Link className="case-study-subnav-home" to="/" aria-label={caseStudy.homeAriaLabel}>
          <FontAwesomeIcon icon={faHouse} aria-hidden="true" />
        </Link>
        <Link to={`/work/${nextProject.slug}`} aria-label={caseStudy.nextAriaLabel}>
          <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
        </Link>
      </nav>

      <section className="case-study-page">
        <div className="content-main">
          <div className="content-section">
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
          </div>
        </div>
      </section>

      <section
        className="bento-grid case-grid"
        aria-label={`${projectTitleForLabels} ${caseStudy.gridAriaSuffix}`}
      >
        <div className="case-panel feature-panel case-media-panel">
          <span className="placeholder-image" aria-hidden="true" />
        </div>
        <div className="case-panel text-panel">
          <h2>{caseStudy.overviewHeading}</h2>
          <p>{project.context}</p>
        </div>
        <div className="case-panel text-panel">
          <h2>{project.role}</h2>
          <p>{caseStudy.roleBody}</p>
        </div>
        <div className="case-panel case-media-panel">
          <span className="placeholder-image" aria-hidden="true" />
        </div>
        {mediaPanelIndexes.map((index) => (
          <div
            className="case-panel case-media-panel media-panel"
            key={`media-panel-${index}`}
          />
        ))}
        <div className="case-panel text-panel wide-panel">
          <h2>{caseStudy.resultHeading}</h2>
          <p>{caseStudy.resultBody}</p>
        </div>
        <div className="cta-section">
          <h2>{cta.heading}</h2>
          <p>{cta.body}</p>
          <Link className="button-link" to={cta.actionTo}>
            {cta.actionLabel}
          </Link>
        </div>
      </section>
    </article>
  );
}
