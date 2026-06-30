import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import CookieConsentBanner from "../components/CookieConsentBanner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { siteMetadata } from "../content/site";
import {
  useBodyClass,
  useEscapeKey,
  useManualScrollRestoration,
  useRouteScrollReset,
  useScrollChrome,
} from "../hooks";

const defaultThemeColor = "#101010";
const menuThemeColor = "#354018";

export default function App() {
  const { hash, pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isHeaderHidden } = useScrollChrome(isMenuOpen);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);

  useManualScrollRestoration();
  useRouteScrollReset(hash, pathname);
  useBodyClass("nav-open", isMenuOpen);
  useBodyClass("header-hidden", isHeaderHidden);
  useEscapeKey(isMenuOpen, closeMenu);

  useEffect(() => {
    document.title = siteMetadata.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", siteMetadata.description);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [closeMenu, hash, pathname]);

  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isMenuOpen ? menuThemeColor : defaultThemeColor);
  }, [isMenuOpen]);

  return (
    <>
      <div className="site-shell">
        <Header
          isHidden={isHeaderHidden}
          isMenuOpen={isMenuOpen}
          onCloseMenu={closeMenu}
          onToggleMenu={toggleMenu}
        />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
      <CookieConsentBanner />
    </>
  );
}
