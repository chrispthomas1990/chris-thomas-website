import {
  faArrowLeft,
  faArrowRight,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { CSSProperties, ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { getMediaPanelStyle, MediaContent } from "../components/MediaPanel";
import {
  caseStudies,
  projectContent,
  type CaseStudyMedia,
} from "../content/caseStudies";
import { sharedContent } from "../content/shared";
import {
  useIsScrollingUp,
  useRevealOnScroll,
  useScrollThreshold,
} from "../hooks";
import NotFound from "./NotFound";
import "./CaseStudy.css";

type RevealingMediaPanelProps = {
  className: string;
  media?: CaseStudyMedia;
  revealDelay?: number;
};

type RevealingTextPanelProps = {
  children: ReactNode;
  className?: string;
  revealDelay?: number;
};

function RevealingTextPanel({
  children,
  className,
  revealDelay = 0,
}: RevealingTextPanelProps) {
  const { elementRef, isVisible } = useRevealOnScroll<HTMLDivElement>();
  const panelClassName = [
    "case-panel",
    "text-panel",
    "case-panel-reveal",
    isVisible ? "is-visible" : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={elementRef}
      className={panelClassName}
      style={
        {
          "--case-panel-reveal-delay": `${revealDelay}ms`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

function RevealingMediaPanel({
  className,
  media,
  revealDelay = 0,
}: RevealingMediaPanelProps) {
  const { elementRef, isVisible } = useRevealOnScroll<HTMLDivElement>();
  const panelClassName = [
    className,
    "case-panel-reveal",
    isVisible ? "is-visible" : undefined,
  ]
    .filter(Boolean)
    .join(" ");
  const style = media
    ? ({
        ...getMediaPanelStyle(media),
        "--case-panel-reveal-delay": `${revealDelay}ms`,
      } as CSSProperties)
    : undefined;

  return (
    <div ref={elementRef} className={panelClassName} style={style}>
      {media ? (
        <MediaContent media={media} />
      ) : (
        <span className="placeholder-image" aria-hidden="true" />
      )}
    </div>
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
        <RevealingMediaPanel
          className="case-panel feature-panel case-media-panel"
          media={firstMedia}
        />
        <RevealingTextPanel revealDelay={120}>
          <h2>{project.contextHeading ?? caseStudy.overviewHeading}</h2>
          <p>{project.context}</p>
        </RevealingTextPanel>
        <RevealingTextPanel revealDelay={240}>
          <h2>{project.role}</h2>
          <p>{project.roleBody ?? caseStudy.roleBody}</p>
        </RevealingTextPanel>
        {remainingMedia.map((media, index) => (
          <RevealingMediaPanel
            className={`case-panel case-media-panel media-panel${
              media.layout === "compact" ? " media-panel-compact" : ""
            }`}
            key={media.src}
            media={media}
            revealDelay={(index % 2) * 120}
          />
        ))}
        <RevealingTextPanel className="wide-panel" revealDelay={120}>
          <h2>{project.resultHeading ?? caseStudy.resultHeading}</h2>
          <p>{project.resultBody ?? caseStudy.resultBody}</p>
        </RevealingTextPanel>
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
