import { useEffect, useRef, useState } from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  brandContent,
  navigationContent,
  primaryNavigation,
  socialLinks,
} from "../content/site";
import type { ThemeMode } from "../theme";
import "./Header.css";

const socialIcons = {
  GitHub: faGithub,
  LinkedIn: faLinkedinIn,
};

type HeaderProps = {
  isHidden: boolean;
  isMenuOpen: boolean;
  themeMode: ThemeMode;
  onCloseMenu: () => void;
  onToggleTheme: () => void;
  onToggleMenu: () => void;
};

type HeaderIconLinkProps = {
  href: string;
  icon: IconDefinition;
  label: string;
  tabIndex?: number;
  onClick: () => void;
};

function HeaderIconLink({
  href,
  icon,
  label,
  onClick,
  tabIndex,
}: HeaderIconLinkProps) {
  return (
    <a
      className="icon-link"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      onClick={onClick}
      tabIndex={tabIndex}
    >
      <FontAwesomeIcon icon={icon} aria-hidden="true" />
    </a>
  );
}

type ThemeToggleButtonProps = {
  isDarkMode: boolean;
  tabIndex?: number;
  onToggleTheme: () => void;
};

function ThemeToggleButton({
  isDarkMode,
  onToggleTheme,
  tabIndex,
}: ThemeToggleButtonProps) {
  return (
    <button
      className="theme-toggle icon-link"
      type="button"
      aria-label={
        isDarkMode
          ? navigationContent.enableLightModeLabel
          : navigationContent.enableDarkModeLabel
      }
      aria-pressed={isDarkMode}
      tabIndex={tabIndex}
      onClick={onToggleTheme}
    >
      <FontAwesomeIcon icon={faCircleHalfStroke} aria-hidden="true" />
    </button>
  );
}

export default function Header({
  isHidden,
  isMenuOpen,
  themeMode,
  onCloseMenu,
  onToggleTheme,
  onToggleMenu,
}: HeaderProps) {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstNavLinkRef = useRef<HTMLAnchorElement>(null);
  const wasMenuOpenRef = useRef(isMenuOpen);
  const [isDesktopNav, setIsDesktopNav] = useState(() =>
    window.matchMedia("(width >= 768px)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(width >= 768px)");
    const handleChange = (event: MediaQueryListEvent) => {
      setIsDesktopNav(event.matches);
    };

    setIsDesktopNav(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen && !isDesktopNav) {
      firstNavLinkRef.current?.focus();
    } else if (
      wasMenuOpenRef.current &&
      !isMenuOpen &&
      document.activeElement !== menuButtonRef.current
    ) {
      menuButtonRef.current?.focus();
    }

    wasMenuOpenRef.current = isMenuOpen;
  }, [isDesktopNav, isMenuOpen]);

  const isMobileNavHidden = !isMenuOpen && !isDesktopNav;
  const isDarkMode = themeMode === "dark";
  const mobileNavTabIndex = isMobileNavHidden ? -1 : undefined;

  return (
    <header
      className={`site-header${isHidden ? " is-hidden" : ""}${
        isMenuOpen ? " is-menu-open" : ""
      }`}
    >
      <div className="site-header-inner">
        <Link
          className="brand"
          to="/"
          aria-label={brandContent.homeAriaLabel}
          onClick={onCloseMenu}
        >
          <span>{brandContent.name}</span>
          <span>{brandContent.role}</span>
        </Link>
        <button
          ref={menuButtonRef}
          className={`menu-toggle${isMenuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={
            isMenuOpen ? navigationContent.closeMenuLabel : navigationContent.openMenuLabel
          }
          aria-expanded={isMenuOpen}
          aria-controls={navigationContent.primaryNavId}
          onClick={onToggleMenu}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <nav
          className={`top-nav${isMenuOpen ? " is-open" : ""}`}
          id={navigationContent.primaryNavId}
          aria-label={navigationContent.primaryAriaLabel}
          aria-hidden={isMobileNavHidden ? "true" : undefined}
        >
          <div className="primary-nav-links">
            {primaryNavigation.map((item, index) => (
              <Link
                to={item.to}
                key={item.to}
                ref={index === 0 ? firstNavLinkRef : undefined}
                tabIndex={isMobileNavHidden ? -1 : undefined}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="nav-actions">
            <div className="social-nav" aria-label={navigationContent.socialAriaLabel}>
              {socialLinks.map((item) => (
                <HeaderIconLink
                  href={item.href}
                  icon={socialIcons[item.label]}
                  label={item.label}
                  onClick={onCloseMenu}
                  tabIndex={mobileNavTabIndex}
                  key={item.href}
                />
              ))}
            </div>
            <span className="nav-action-divider" aria-hidden="true" />
            <ThemeToggleButton
              isDarkMode={isDarkMode}
              onToggleTheme={onToggleTheme}
              tabIndex={mobileNavTabIndex}
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
