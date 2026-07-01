import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sharedContent } from "../content/shared";
import "./CookieConsentBanner.css";

const { cookieBanner } = sharedContent;

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(window.localStorage.getItem(cookieBanner.storageKey) !== "accepted");
  }, []);

  const acceptCookies = () => {
    window.localStorage.setItem(cookieBanner.storageKey, "accepted");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <section className="cookie-banner" aria-label={cookieBanner.ariaLabel}>
      <div>
        <h3>{cookieBanner.heading}</h3>
        <p>{cookieBanner.body}</p>
      </div>
      <div className="cookie-banner-actions">
        <Link className="text-link" to={cookieBanner.policyTo}>
          {cookieBanner.policyLabel}
        </Link>
        <button type="button" onClick={acceptCookies}>
          {cookieBanner.acceptLabel}
        </button>
      </div>
    </section>
  );
}
