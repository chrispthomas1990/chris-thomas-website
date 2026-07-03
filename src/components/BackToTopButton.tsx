import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { utilityContent } from "../content/site";
import "./BackToTopButton.css";

function getScrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

export default function BackToTopButton() {
  return (
    <button
      className="back-to-top"
      type="button"
      aria-label={utilityContent.backToTopAriaLabel}
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: getScrollBehavior() });
      }}
    >
      <FontAwesomeIcon icon={faArrowUp} aria-hidden="true" />
    </button>
  );
}
