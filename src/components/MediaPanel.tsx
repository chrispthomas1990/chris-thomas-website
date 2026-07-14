import type { CSSProperties } from "react";
import type { CaseStudyMedia } from "../content/caseStudies";
import "./MediaPanel.css";

export function getMediaPanelStyle(media: CaseStudyMedia): CSSProperties {
  return {
    "--case-media-aspect-ratio": media.aspectRatio ?? "16 / 9",
  } as CSSProperties;
}

export function MediaContent({
  media,
  sizes,
}: {
  media: CaseStudyMedia;
  sizes: string;
}) {
  return media.kind === "video" ? (
    <video
      aria-label={media.alt}
      autoPlay
      loop
      muted
      playsInline
      poster={media.videoSources?.poster}
    >
      {media.videoSources?.mobileWebm ? (
        <source
          src={media.videoSources.mobileWebm}
          type="video/webm"
          media="(max-width: 767px)"
        />
      ) : null}
      {media.videoSources?.mobileMp4 ? (
        <source
          src={media.videoSources.mobileMp4}
          type="video/mp4"
          media="(max-width: 767px)"
        />
      ) : null}
      {media.videoSources?.desktopWebm ? (
        <source src={media.videoSources.desktopWebm} type="video/webm" />
      ) : null}
      {media.videoSources?.desktopMp4 ? (
        <source src={media.videoSources.desktopMp4} type="video/mp4" />
      ) : null}
      <source src={media.src} type="video/mp4" />
    </video>
  ) : (
    <img
      src={media.src}
      srcSet={media.srcSet}
      sizes={sizes}
      alt={media.alt}
      width={1920}
      height={1080}
    />
  );
}
