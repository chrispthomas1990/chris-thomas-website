import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  brandContent,
  navigationContent,
  primaryNavigation,
  socialLinks,
} from "../content/site";
import "./Header.css";

const socialIcons = {
  GitHub: faGithub,
  LinkedIn: faLinkedinIn,
};

type HeaderProps = {
  isHidden: boolean;
  isMenuOpen: boolean;
  onCloseMenu: () => void;
  onToggleMenu: () => void;
};

export default function Header({
  isHidden,
  isMenuOpen,
  onCloseMenu,
  onToggleMenu,
}: HeaderProps) {
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
        >
          <div className="primary-nav-links">
            {primaryNavigation.map((item) => (
              <Link to={item.to} onClick={onCloseMenu} key={item.to}>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="social-nav" aria-label={navigationContent.socialAriaLabel}>
            {socialLinks.map((item) => (
              <a
                className="icon-link"
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                onClick={onCloseMenu}
                key={item.href}
              >
                <FontAwesomeIcon icon={socialIcons[item.label]} aria-hidden="true" />
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
