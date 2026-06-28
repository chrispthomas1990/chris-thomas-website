import ProjectCard from "../components/ProjectCard";
import { projects } from "../work";

export default function Home() {
  return (
    <div className="page-stack">
      <section className="intro">
        <div className="intro-main">
          <p className="kicker">Portfolio 2027</p>
          <h1>Brand identity, digital and campaign work with a clear point of view.</h1>
        </div>
      </section>

      <section className="gallery-grid" id="work" aria-label="Selected work">
        {projects.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.slug} />
        ))}
      </section>
    </div>
  );
}
