import { useEffect, useLayoutEffect, useState } from "react";

export function useManualScrollRestoration() {
  useEffect(() => {
    const originalScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = originalScrollRestoration;
    };
  }, []);
}

export function useRouteScrollReset(hash: string, pathname: string) {
  useLayoutEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ block: "start" });
      return;
    }

    window.scrollTo({ top: 0, left: 0 });
  }, [hash, pathname]);
}

export function useBodyClass(className: string, isActive: boolean) {
  useEffect(() => {
    document.body.classList.toggle(className, isActive);

    return () => {
      document.body.classList.remove(className);
    };
  }, [className, isActive]);
}

export function useEscapeKey(isActive: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!isActive) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscape();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive, onEscape]);
}

export function useScrollThreshold(threshold: number) {
  const [hasPassedThreshold, setHasPassedThreshold] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasPassedThreshold(window.scrollY >= threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return hasPassedThreshold;
}

export function useScrollChrome(isHeaderPinned: boolean) {
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      const maxScrollY = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const isAtScrollEnd = currentScrollY >= maxScrollY - 24;

      if (currentScrollY < 24 || isHeaderPinned) {
        setIsHeaderHidden(false);
      } else if (isAtScrollEnd) {
        lastScrollY = currentScrollY;
        return;
      } else if (scrollDelta > 8) {
        setIsHeaderHidden(true);
      } else if (scrollDelta < -8) {
        setIsHeaderHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHeaderPinned]);

  return { isHeaderHidden };
}
