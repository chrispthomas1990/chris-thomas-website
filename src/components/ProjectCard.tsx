import { Link } from "react-router-dom";
import type { Project } from "../work";

type ProjectCardProps = {
  index: number;
  project: Project;
};

export default function ProjectCard({ index, project }: ProjectCardProps) {
  return (
    <Link
      className={`work-tile tile-${index + 1} is-${project.thumbnailOrientation}`}
      to={`/work/${project.slug}`}
    >
      <span className="work-image">
        <span className="placeholder-image" aria-hidden="true" />
      </span>
      <span className="work-meta">
        <strong>{project.title}</strong>
      </span>
    </Link>
  );
}
