import { type MouseEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  getInitialThemeMode,
  themeStorageKey,
  type ThemeMode,
} from "./theme";

type MediaQuerySubscription = {
  mediaQuery: MediaQueryList;
  listeners: Set<(matches: boolean) => void>;
  handleChange: (event: MediaQueryListEvent) => void;
};

const mediaQuerySubscriptions = new Map<string, MediaQuerySubscription>();

function subscribeToMediaQuery(
  query: string,
  listener: (matches: boolean) => void,
) {
  let subscription = mediaQuerySubscriptions.get(query);

  if (!subscription) {
    const mediaQuery = window.matchMedia(query);
    const listeners = new Set<(matches: boolean) => void>();
    const handleChange = (event: MediaQueryListEvent) => {
      listeners.forEach((currentListener) => currentListener(event.matches));
    };

    mediaQuery.addEventListener("change", handleChange);
    subscription = { mediaQuery, listeners, handleChange };
    mediaQuerySubscriptions.set(query, subscription);
  }

  subscription.listeners.add(listener);
  listener(subscription.mediaQuery.matches);

  return () => {
    subscription.listeners.delete(listener);

    if (subscription.listeners.size === 0) {
      subscription.mediaQuery.removeEventListener(
        "change",
        subscription.handleChange,
      );
      mediaQuerySubscriptions.delete(query);
    }
  };
}

const scrollListeners = new Set<() => void>();

function handleSharedScroll() {
  scrollListeners.forEach((listener) => listener());
}

function subscribeToScroll(listener: () => void) {
  if (scrollListeners.size === 0) {
    window.addEventListener("scroll", handleSharedScroll, { passive: true });
  }

  scrollListeners.add(listener);
  listener();

  return () => {
    scrollListeners.delete(listener);

    if (scrollListeners.size === 0) {
      window.removeEventListener("scroll", handleSharedScroll);
    }
  };
}

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
      try {
        document
          .getElementById(decodeURIComponent(hash.slice(1)))
          ?.scrollIntoView({ block: "start" });
      } catch {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
      }

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
    return subscribeToMediaQuery(query, onChange);
  }, [onChange, query]);
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    return subscribeToMediaQuery(query, setMatches);
  }, [query]);

  return matches;
}

export function useRevealOnScroll<T extends Element>() {
  const elementRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { rootMargin: "0px 0px 120px", threshold: 0.01 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { elementRef, isVisible };
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

    return subscribeToScroll(handleScroll);
  }, [resetThreshold, threshold]);

  return hasPassedThreshold;
}

export function useIsScrollingUp() {
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      if (currentScrollY < 24) {
        setIsScrollingUp(false);
      } else if (scrollDelta > 8) {
        setIsScrollingUp(false);
      } else if (scrollDelta < -8) {
        setIsScrollingUp(true);
      }

      lastScrollY = currentScrollY;
    };

    return subscribeToScroll(handleScroll);
  }, []);

  return isScrollingUp;
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

    return subscribeToScroll(handleScroll);
  }, [isHeaderPinned]);

  return { isHeaderHidden };
}
