import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { homepageCaseStudies } from "../content/caseStudies";
import { pageContent } from "../content/pages";
import { sharedContent } from "../content/shared";
import "./Home.css";

const syncedThumbnailPairs = [
  { source: 1, property: "--work-row-1-image-height" },
  { source: 4, property: "--work-row-2-image-height" },
  { source: 5, property: "--work-row-3-image-height" },
] as const;

export default function Home() {
  const { home } = pageContent;
  const { cta } = sharedContent;
  const galleryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const gallery = galleryRef.current;

    if (!gallery) {
      return undefined;
    }

    const sourceImages = syncedThumbnailPairs.flatMap((pair) => {
      const image = gallery.querySelector<HTMLElement>(
        `.work-tile:nth-child(${pair.source}) .work-image`,
      );

      return image ? [{ image, property: pair.property }] : [];
    });

    const syncFeaturedImageHeights = () => {
      sourceImages.forEach(({ image, property }) => {
        gallery.style.setProperty(
          property,
          `${image.getBoundingClientRect().height}px`,
        );
      });
    };

    syncFeaturedImageHeights();

    const resizeObserver = new ResizeObserver(syncFeaturedImageHeights);
    sourceImages.forEach(({ image }) => {
      resizeObserver.observe(image);
    });

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="page-stack">
      <section className="portfolio-page">
        <div className="content-main">
          <div className="content-section">
            <h1>{home.hero.heading}</h1>
          </div>
        </div>
      </section>

      <section
        className="gallery-grid"
        id="work"
        aria-label={home.workAriaLabel}
        ref={galleryRef}
      >
        {homepageCaseStudies.map((project) => (
          <ProjectCard project={project} key={project.slug} />
        ))}
      </section>

      <div className="cta-section">
        <h2>{cta.heading}</h2>
        <p>{cta.body}</p>
        <Link className="button-link" to={cta.actionTo}>
          {cta.actionLabel}
        </Link>
      </div>
    </div>
  );
}
