import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import CookieConsentBanner from "../components/CookieConsentBanner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { caseStudies } from "../content/caseStudies";
import { siteMetadata } from "../content/site";
import {
  useBodyClass,
  useBodyScrollLock,
  useEscapeKey,
  useMediaQueryChange,
  useManualScrollRestoration,
  useRouteScrollReset,
  useScrollChrome,
  useSkipToContent,
  useThemeMode,
} from "../hooks";
import { getThemeColor } from "../theme";

type PageMetadata = {
  title: string;
  description: string;
};

const staticPageMetadata: Record<string, PageMetadata> = {
  "/": siteMetadata,
  "/info": {
    title: "Info | Chris Thomas",
    description:
      "Learn about Chris Thomas, a UI Designer and Front-End Engineer working across digital products, brand systems, and campaign sites.",
  },
  "/contact": {
    title: "Contact | Chris Thomas",
    description:
      "Contact Chris Thomas to discuss front-end development, website design, design systems, consulting, and digital product work.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Chris Thomas",
    description:
      "Read how Chris Thomas Creative Limited handles personal information submitted through this website and project enquiries.",
  },
  "/cookie-policy": {
    title: "Cookie Policy | Chris Thomas",
    description:
      "Read the cookie policy for the Chris Thomas design and front-end development portfolio.",
  },
};

function getPageMetadata(pathname: string): PageMetadata {
  const normalizedPath = pathname === "/" ? pathname : pathname.replace(/\/$/, "");
  const staticMetadata = staticPageMetadata[normalizedPath];

  if (staticMetadata) {
    return staticMetadata;
  }

  const caseStudyMatch = normalizedPath.match(/^\/work\/([^/]+)$/);

  if (caseStudyMatch) {
    const project = caseStudies.find(
      ({ slug }) => slug === decodeURIComponent(caseStudyMatch[1]),
    );

    if (project) {
      return {
        title: `${project.title.replace(/\.$/, "")} | Chris Thomas`,
        description: project.summary,
      };
    }
  }

  return {
    title: "Page Not Found | Chris Thomas",
    description: "The requested page could not be found.",
  };
}

export default function App() {
  const { hash, pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { themeMode, toggleTheme } = useThemeMode();
  const { isHeaderHidden } = useScrollChrome(isMenuOpen);
  const skipToContent = useSkipToContent("main-content");

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);
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
    const metadata = getPageMetadata(pathname);

    document.title = metadata.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", metadata.description);
  }, [pathname]);

  useEffect(() => {
    closeMenu();
  }, [closeMenu, hash, pathname]);

  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", getThemeColor(themeMode, isMenuOpen));
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
