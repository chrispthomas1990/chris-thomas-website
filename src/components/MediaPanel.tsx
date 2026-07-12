import type { CSSProperties } from "react";
import type { CaseStudyMedia } from "../content/caseStudies";
import "./MediaPanel.css";

export function getMediaPanelStyle(media: CaseStudyMedia): CSSProperties {
  return {
    "--case-media-aspect-ratio": media.aspectRatio ?? "16 / 9",
  } as CSSProperties;
}

export function MediaContent({ media }: { media: CaseStudyMedia }) {
  return media.kind === "video" ? (
    <video
      aria-label={media.alt}
      autoPlay
      loop
      muted
      playsInline
    >
      <source src={media.src} type="video/mp4" />
    </video>
  ) : (
    <img
      src={media.src}
      alt={media.alt}
      width={1920}
      height={1080}
    />
  );
}
