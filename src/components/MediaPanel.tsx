import type { CSSProperties } from "react";
import type { CaseStudyMedia } from "../content/caseStudies";
import "./MediaPanel.css";

export function getMediaPanelStyle(media: CaseStudyMedia): CSSProperties {
  return {
    "--case-media-aspect-ratio": media.aspectRatio ?? "16 / 9",
  } as CSSProperties;
}

type MediaContentProps = {
  loading?: HTMLImageElement["loading"];
  media: CaseStudyMedia;
};

export function MediaContent({
  loading = "lazy",
  media,
}: MediaContentProps) {
  return media.kind === "video" ? (
    <video
      className={media.className}
      aria-label={media.alt}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
    >
      <source src={media.src} type="video/mp4" />
    </video>
  ) : (
    <img
      className={media.className}
      src={media.src}
      alt={media.alt}
      loading={loading}
      decoding="async"
    />
  );
}
