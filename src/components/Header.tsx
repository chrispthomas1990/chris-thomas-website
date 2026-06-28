import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { primaryNavigation, socialLinks } from "../site";

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
    <header className={`site-header${isHidden ? " is-hidden" : ""}`}>
      <div className="site-header-inner">
        <Link
          className="brand"
          to="/"
          aria-label="Chris Thomas Front-End Engineer home"
          onClick={onCloseMenu}
        >
          <span>Chris Thomas</span>
          <span>Front-End Engineer</span>
        </Link>
        <button
          className={`menu-toggle${isMenuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={onToggleMenu}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <nav
          className={`top-nav${isMenuOpen ? " is-open" : ""}`}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          <div className="primary-nav-links">
            {primaryNavigation.map((item) => (
              <Link to={item.to} onClick={onCloseMenu} key={item.to}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="social-nav" aria-label="Social links">
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
