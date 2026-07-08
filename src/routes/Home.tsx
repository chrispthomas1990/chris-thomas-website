import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { homepageCaseStudies } from "../content/caseStudies";
import { pageContent } from "../content/pages";
import { sharedContent } from "../content/shared";
import "./Home.css";

type HomepageTileLayout = {
  className: string;
  mediaHeightSource?: string;
  mediaHeightTarget?: string;
};

const homepageTileLayouts: HomepageTileLayout[] = [
  { className: "work-tile-wide", mediaHeightSource: "row-1" },
  { className: "work-tile-narrow", mediaHeightTarget: "row-1" },
  { className: "work-tile-narrow", mediaHeightTarget: "row-2" },
  { className: "work-tile-wide", mediaHeightSource: "row-2" },
  { className: "work-tile-wide", mediaHeightSource: "row-3" },
  { className: "work-tile-narrow", mediaHeightTarget: "row-3" },
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

    const sourceImages = homepageTileLayouts.flatMap((layout) => {
      if (!layout.mediaHeightSource) {
        return [];
      }

      const image = gallery.querySelector<HTMLElement>(
        `[data-height-source="${layout.mediaHeightSource}"]`,
      );

      return image
        ? [
            {
              image,
              property: `--work-${layout.mediaHeightSource}-image-height`,
            },
          ]
        : [];
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
        {homepageCaseStudies.map((project, index) => (
          <ProjectCard
            className={homepageTileLayouts[index].className}
            mediaHeightSource={homepageTileLayouts[index].mediaHeightSource}
            mediaHeightTarget={homepageTileLayouts[index].mediaHeightTarget}
            project={project}
            key={project.slug}
          />
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
