import { Link } from "react-router-dom";
import { companyName, footerLinks } from "../site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <nav className="footer-legal" aria-label="Legal links">
          {footerLinks.map((item) => (
            <Link to={item.to} key={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="footer-copyright">
          © {currentYear} {companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
