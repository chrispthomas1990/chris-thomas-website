import {
  faArrowLeft,
  faArrowRight,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import { caseStudies, projectContent } from "../content/caseStudies";
import type { CaseStudyMedia } from "../content/caseStudies";
import { sharedContent } from "../content/shared";
import { useIsScrollingUp, useScrollThreshold } from "../hooks";
import NotFound from "./NotFound";
import "./CaseStudy.css";

function getMediaPanelStyle(media: CaseStudyMedia): CSSProperties {
  return {
    "--case-media-aspect-ratio": media.aspectRatio ?? "16 / 9",
  } as CSSProperties;
}

function renderCaseStudyMedia(
  media: CaseStudyMedia,
  loading: HTMLImageElement["loading"] = "lazy",
) {
  return media.kind === "video" ? (
    <video
      className={media.className}
      aria-label={media.alt}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
    >
      <source src={media.src} type="video/mp4" />
    </video>
  ) : (
    <img
      className={media.className}
      src={media.src}
      alt={media.alt}
      loading={loading}
      decoding="async"
    />
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const isScrollingUp = useIsScrollingUp();
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
  const [firstMedia, ...remainingMedia] = project.media;

  return (
    <article className="case-study">
      <nav
        className={`case-study-subnav${
          isSubnavVisible && !isScrollingUp ? " is-visible" : ""
        }`}
        aria-label={caseStudy.navAriaLabel}
      >
        <Link
          to={`/work/${previousProject.slug}`}
          aria-label={caseStudy.previousAriaLabel}
        >
          <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
        </Link>
        <Link
          className="case-study-subnav-home"
          to="/"
          aria-label={caseStudy.homeAriaLabel}
        >
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
        <div
          className="case-panel feature-panel case-media-panel"
          style={firstMedia ? getMediaPanelStyle(firstMedia) : undefined}
        >
          {firstMedia ? (
            renderCaseStudyMedia(firstMedia, "eager")
          ) : (
            <span className="placeholder-image" aria-hidden="true" />
          )}
        </div>
        <div className="case-panel text-panel">
          <h2>{project.contextHeading ?? caseStudy.overviewHeading}</h2>
          <p>{project.context}</p>
        </div>
        <div className="case-panel text-panel">
          <h2>{project.role}</h2>
          <p>{project.roleBody ?? caseStudy.roleBody}</p>
        </div>
        {remainingMedia.map((media) => (
          <div
            className={`case-panel case-media-panel media-panel${
              media.layout === "compact" ? " media-panel-compact" : ""
            }`}
            key={media.src}
            style={getMediaPanelStyle(media)}
          >
            {renderCaseStudyMedia(media)}
          </div>
        ))}
        <div className="case-panel text-panel wide-panel">
          <h2>{project.resultHeading ?? caseStudy.resultHeading}</h2>
          <p>{project.resultBody ?? caseStudy.resultBody}</p>
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
