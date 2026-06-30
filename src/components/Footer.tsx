import { Link } from "react-router-dom";
import { companyName, footerLinks, navigationContent } from "../content/site";
import BackToTopButton from "./BackToTopButton";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <nav className="footer-legal" aria-label={navigationContent.legalAriaLabel}>
          {footerLinks.map((item) => (
            <Link to={item.to} key={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="footer-copyright">
          © {currentYear} {companyName.toUpperCase()}
        </p>

        <BackToTopButton />
      </div>
    </footer>
  );
}
