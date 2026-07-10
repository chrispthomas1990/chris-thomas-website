import { Link } from "react-router-dom";
import { getMediaPanelStyle, MediaContent } from "./MediaPanel";
import type { Project } from "../content/caseStudies";
import "./ProjectCard.css";

type ProjectCardProps = {
  className?: string;
  project: Project;
};

export default function ProjectCard({
  className,
  project,
}: ProjectCardProps) {
  const { thumbnail } = project;
  const tileClassName = ["work-tile", className].filter(Boolean).join(" ");
  const mediaClassName = "case-panel case-media-panel";

  return (
    <Link className={tileClassName} to={`/work/${project.slug}`}>
      <span className={mediaClassName} style={getMediaPanelStyle(thumbnail)}>
        <MediaContent media={thumbnail} />
      </span>
      <span className="work-meta">
        <strong>{project.title}</strong>
      </span>
    </Link>
  );
}
