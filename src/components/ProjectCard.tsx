import { Link } from "react-router-dom";
import type { Project } from "../content/projects";
import "./ProjectCard.css";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link className="work-tile" to={`/work/${project.slug}`}>
      <span className="work-image">
        <span className="placeholder-image" aria-hidden="true" />
      </span>
      <span className="work-meta">
        <strong>{project.title}</strong>
      </span>
    </Link>
  );
}
