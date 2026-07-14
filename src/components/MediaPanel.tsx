import { useEffect, useRef, useState, type CSSProperties } from "react";
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
    <ViewportVideo media={media} />
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

type NetworkInformation = {
  saveData?: boolean;
};

function ViewportVideo({
  media,
}: {
  media: Extract<CaseStudyMedia, { kind: "video" }>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisibleRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const connection = (navigator as Navigator & {
      connection?: NetworkInformation;
    }).connection;

    if (prefersReducedMotion || connection?.saveData) {
      return;
    }

    const playWhenReady = () => {
      if (!isVisibleRef.current) {
        return;
      }

      void video.play().catch(() => {
        // Autoplay can still be blocked by device-level browser policy. In
        // that case the poster remains visible as the intentional fallback.
      });
    };
    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          loadObserver.disconnect();
        }
      },
      { rootMargin: "300px 0px", threshold: 0 },
    );
    const playbackObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.35;

        if (isVisibleRef.current) {
          playWhenReady();
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.35, 0.75] },
    );

    loadObserver.observe(video);
    playbackObserver.observe(video);
    video.addEventListener("canplay", playWhenReady);

    return () => {
      loadObserver.disconnect();
      playbackObserver.disconnect();
      video.removeEventListener("canplay", playWhenReady);
      video.pause();
    };
  }, []);

  useEffect(() => {
    if (shouldLoad) {
      videoRef.current?.load();
    }
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      aria-label={media.alt}
      className="viewport-video"
      loop
      muted
      playsInline
      poster={media.videoSources.poster}
      preload="none"
    >
      {shouldLoad ? (
        <>
          <source src={media.videoSources.webm} type="video/webm" />
          <source src={media.videoSources.mp4} type="video/mp4" />
        </>
      ) : null}
    </video>
  );
}
