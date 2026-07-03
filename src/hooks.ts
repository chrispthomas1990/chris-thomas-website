import { type MouseEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  getInitialThemeMode,
  themeStorageKey,
  type ThemeMode,
} from "./theme";

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

export function useBodyScrollLock(isLocked: boolean, restoreKey: string) {
  const latestRestoreKey = useRef(restoreKey);

  useLayoutEffect(() => {
    latestRestoreKey.current = restoreKey;
  }, [restoreKey]);

  useEffect(() => {
    if (!isLocked) {
      return;
    }

    const scrollY = window.scrollY;
    const lockRestoreKey = restoreKey;
    const { overflow, position, top, width } = document.body.style;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = overflow;
      document.body.style.position = position;
      document.body.style.top = top;
      document.body.style.width = width;

      if (lockRestoreKey === latestRestoreKey.current) {
        window.scrollTo({ top: scrollY, left: 0 });
      }
    };
  }, [isLocked, restoreKey]);
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

export function useMediaQueryChange(query: string, onChange: (matches: boolean) => void) {
  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) => {
      onChange(event.matches);
    };

    onChange(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [onChange, query]);
}

export function useThemeMode() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialThemeMode);

  const toggleTheme = () => {
    setThemeMode((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
    window.localStorage.setItem(themeStorageKey, themeMode);
  }, [themeMode]);

  return { themeMode, toggleTheme };
}

export function useSkipToContent(targetId: string) {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    const rootStyles = getComputedStyle(document.documentElement);
    const headerHeight =
      Number.parseFloat(rootStyles.getPropertyValue("--site-header-height")) || 0;
    const pagePad = Number.parseFloat(rootStyles.getPropertyValue("--page-pad-x")) || 0;
    const targetTop =
      target.getBoundingClientRect().top + window.scrollY - headerHeight - pagePad;

    target.focus({ preventScroll: true });
    window.scrollTo({ top: Math.max(0, targetTop), left: 0 });
  };
}

export function useScrollThreshold(threshold: number, resetThreshold = threshold) {
  const [hasPassedThreshold, setHasPassedThreshold] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasPassedThreshold((hasPassed) => {
        if (hasPassed) {
          return window.scrollY > resetThreshold;
        }

        return window.scrollY >= threshold;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [resetThreshold, threshold]);

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
