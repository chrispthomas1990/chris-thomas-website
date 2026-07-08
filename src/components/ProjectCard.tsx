import { Link } from "react-router-dom";
import type { Project } from "../content/caseStudies";
import "./ProjectCard.css";

type ProjectCardProps = {
  className?: string;
  mediaHeightSource?: string;
  mediaHeightTarget?: string;
  project: Project;
};

export default function ProjectCard({
  className,
  mediaHeightSource,
  mediaHeightTarget,
  project,
}: ProjectCardProps) {
  const { thumbnail } = project;
  const tileClassName = ["work-tile", className].filter(Boolean).join(" ");

  return (
    <Link className={tileClassName} to={`/work/${project.slug}`}>
      <span
        className="work-image"
        data-height-source={mediaHeightSource}
        data-height-target={mediaHeightTarget}
      >
        {thumbnail.kind === "video" ? (
          <video
            className={thumbnail.className}
            aria-label={thumbnail.alt}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={thumbnail.src} type="video/mp4" />
          </video>
        ) : (
          <img
            className={thumbnail.className}
            src={thumbnail.src}
            alt={thumbnail.alt}
          />
        )}
      </span>
      <span className="work-meta">
        <strong>{project.title}</strong>
      </span>
    </Link>
  );
}
