import { type MouseEvent, useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import CookieConsentBanner from "../components/CookieConsentBanner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { siteMetadata } from "../content/site";
import {
  useBodyClass,
  useBodyScrollLock,
  useEscapeKey,
  useMediaQueryChange,
  useManualScrollRestoration,
  useRouteScrollReset,
  useScrollChrome,
} from "../hooks";

const defaultThemeColor = "#101010";
const themeStorageKey = "preferred-theme";

type ThemeMode = "light" | "dark";

function getInitialTheme(): ThemeMode {
  const savedTheme = window.localStorage.getItem(themeStorageKey);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const { hash, pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialTheme);
  const { isHeaderHidden } = useScrollChrome(isMenuOpen);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);
  const toggleTheme = () => {
    setThemeMode((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };
  const skipToContent = (event: MouseEvent<HTMLAnchorElement>) => {
    const mainContent = document.querySelector<HTMLElement>("#main-content");

    if (!mainContent) {
      return;
    }

    event.preventDefault();

    const rootStyles = getComputedStyle(document.documentElement);
    const headerHeight =
      Number.parseFloat(rootStyles.getPropertyValue("--site-header-height")) || 0;
    const pagePad = Number.parseFloat(rootStyles.getPropertyValue("--page-pad-x")) || 0;
    const targetTop =
      mainContent.getBoundingClientRect().top +
      window.scrollY -
      headerHeight -
      pagePad;

    mainContent.focus({ preventScroll: true });
    window.scrollTo({ top: Math.max(0, targetTop), left: 0 });
  };
  const closeMenuAtDesktop = useCallback((matchesDesktop: boolean) => {
    if (matchesDesktop) {
      setIsMenuOpen(false);
    }
  }, []);

  useManualScrollRestoration();
  useRouteScrollReset(hash, pathname);
  useBodyClass("nav-open", isMenuOpen);
  useBodyScrollLock(isMenuOpen, pathname);
  useBodyClass("header-hidden", isHeaderHidden);
  useEscapeKey(isMenuOpen, closeMenu);
  useMediaQueryChange("(width >= 768px)", closeMenuAtDesktop);

  useEffect(() => {
    document.title = siteMetadata.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", siteMetadata.description);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
    window.localStorage.setItem(themeStorageKey, themeMode);
  }, [themeMode]);

  useEffect(() => {
    closeMenu();
  }, [closeMenu, hash, pathname]);

  useEffect(() => {
    const themeColor =
      themeMode === "dark" || isMenuOpen ? defaultThemeColor : "#f3f0e8";

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", themeColor);
  }, [isMenuOpen, themeMode]);

  return (
    <>
      <div className="site-shell">
        <a className="skip-link" href="#main-content" onClick={skipToContent}>
          Skip to content
        </a>
        <Header
          isHidden={isHeaderHidden}
          isMenuOpen={isMenuOpen}
          themeMode={themeMode}
          onCloseMenu={closeMenu}
          onToggleTheme={toggleTheme}
          onToggleMenu={toggleMenu}
        />
        <main id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
      <Footer />
      <CookieConsentBanner />
    </>
  );
}
