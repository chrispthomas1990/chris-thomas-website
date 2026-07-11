import { useState, type CSSProperties } from "react";
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
  const [readySrc, setReadySrc] = useState<string>();
  const isReady = readySrc === media.src;
  const mediaClassName = [
    media.className,
    "case-media-resource",
    isReady ? "is-ready" : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return media.kind === "video" ? (
    <video
      className={mediaClassName}
      aria-label={media.alt}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      onLoadedData={() => setReadySrc(media.src)}
    >
      <source src={media.src} type="video/mp4" />
    </video>
  ) : (
    <img
      className={mediaClassName}
      src={media.src}
      alt={media.alt}
      width={1920}
      height={1080}
      loading={loading}
      decoding={loading === "eager" ? "sync" : "async"}
      onLoad={() => setReadySrc(media.src)}
    />
  );
}
