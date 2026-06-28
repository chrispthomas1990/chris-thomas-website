import { Link, useParams } from "react-router-dom";
import { caseStudyMediaPanelCount } from "../site";
import { projects } from "../work";

export default function CaseStudy() {
  const { slug } = useParams();
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projectIndex >= 0 ? projects[projectIndex] : undefined;

  if (!project) {
    return (
      <section className="not-found">
        <p className="kicker">Project not found</p>
        <h1>This case study is not available.</h1>
        <Link className="text-link" to="/">
          Back to the homepage
        </Link>
      </section>
    );
  }

  const previousProject =
    projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const mediaPanelIndexes = Array.from(
    { length: caseStudyMediaPanelCount },
    (_, index) => index + 1,
  );

  return (
    <article className="case-study">
      <nav className="case-subnav" aria-label="Case study navigation">
        <Link to={`/work/${previousProject.slug}`}>Previous</Link>
        <Link to="/">Back to work</Link>
        <Link to={`/work/${nextProject.slug}`}>Next</Link>
      </nav>

      <section className="case-hero">
        <p className="kicker">{project.category}</p>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
      </section>

      <section className="bento-grid case-grid" aria-label={`${project.title} case study`}>
        <div className="case-panel feature-panel">
          <span className="placeholder-image" aria-hidden="true" />
        </div>
        <div className="case-panel text-panel">
          <p className="kicker">Overview</p>
          <h2>Project context</h2>
          <p>{project.context}</p>
        </div>
        <div className="case-panel text-panel">
          <p className="kicker">Role</p>
          <h2>{project.role}</h2>
          <p>
            Placeholder copy for responsibilities, collaborators, constraints,
            and outcomes.
          </p>
        </div>
        <div className="case-panel">
          <span className="placeholder-image" aria-hidden="true" />
        </div>
        {mediaPanelIndexes.map((index) => (
          <div className="case-panel media-panel" key={`media-panel-${index}`} />
        ))}
        <div className="case-panel text-panel wide-panel">
          <p className="kicker">Result</p>
          <h2>A concise case study area ready for final content.</h2>
          <p>
            Add process notes, metrics, client impact, and links to live work
            here. The bento layout will adapt from desktop to mobile.
          </p>
        </div>
        <div className="case-cta">
          <p className="kicker">Start a conversation</p>
          <h2>Interested in work like this?</h2>
          <p>
            If this project feels close to what you are planning, send over a
            few details and I will help shape the next step.
          </p>
          <Link className="button-link" to="/contact">
            Get in touch
          </Link>
        </div>
      </section>
    </article>
  );
}
