import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const consentStorageKey = "chris-thomas-cookie-consent";

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(window.localStorage.getItem(consentStorageKey) !== "accepted");
  }, []);

  const acceptCookies = () => {
    window.localStorage.setItem(consentStorageKey, "accepted");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <section className="cookie-banner" aria-label="Cookie consent">
      <div>
        <h2>Cookie consent</h2>
        <p>
          This website uses essential cookies to keep the site working and may use
          optional cookies to understand how the site is used.
        </p>
      </div>
      <div className="cookie-banner-actions">
        <Link className="text-link" to="/cookie-policy">
          Cookie policy
        </Link>
        <button type="button" onClick={acceptCookies}>
          Accept
        </button>
      </div>
    </section>
  );
}
