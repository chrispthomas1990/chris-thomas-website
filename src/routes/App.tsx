import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BackToTopButton from "../components/BackToTopButton";
import CookieConsentBanner from "../components/CookieConsentBanner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {
  useBodyClass,
  useEscapeKey,
  useManualScrollRestoration,
  useRouteScrollReset,
  useScrollChrome,
} from "../hooks";

export default function App() {
  const { hash, pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isHeaderHidden, showBackToTop } = useScrollChrome(isMenuOpen);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);

  useManualScrollRestoration();
  useRouteScrollReset(hash, pathname);
  useBodyClass("nav-open", isMenuOpen);
  useBodyClass("header-hidden", isHeaderHidden);
  useEscapeKey(isMenuOpen, closeMenu);

  useEffect(() => {
    closeMenu();
  }, [closeMenu, hash, pathname]);

  return (
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
      <Footer />
      <CookieConsentBanner />
      <BackToTopButton isVisible={showBackToTop} />
    </div>
  );
}
