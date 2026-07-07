import { Link } from "react-router-dom";
import type { Project } from "../content/caseStudies";
import "./ProjectCard.css";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const { thumbnail } = project;

  return (
    <Link className="work-tile" to={`/work/${project.slug}`}>
      <span className="work-image">
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
