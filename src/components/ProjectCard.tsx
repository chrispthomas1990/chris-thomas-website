import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { getMediaPanelStyle, MediaContent } from "./MediaPanel";
import type { Project } from "../content/caseStudies";
import { useRevealOnScroll } from "../hooks";
import "./ProjectCard.css";

type ProjectCardProps = {
  className?: string;
  project: Project;
  revealDelay?: number;
};

export default function ProjectCard({
  className,
  project,
  revealDelay = 0,
}: ProjectCardProps) {
  const { elementRef, isVisible } = useRevealOnScroll<HTMLAnchorElement>();
  const { thumbnail } = project;
  const tileClassName = [
    "work-tile",
    isVisible ? "is-visible" : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const mediaClassName = "case-panel case-media-panel";

  return (
    <Link
      ref={elementRef}
      className={tileClassName}
      style={
        { "--work-tile-reveal-delay": `${revealDelay}ms` } as CSSProperties
      }
      to={`/work/${project.slug}`}
    >
      <span className={mediaClassName} style={getMediaPanelStyle(thumbnail)}>
        <MediaContent media={thumbnail} />
      </span>
      <span className="work-meta">
        <strong>{project.title}</strong>
      </span>
    </Link>
  );
}
