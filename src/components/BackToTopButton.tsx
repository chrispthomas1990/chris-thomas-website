type BackToTopButtonProps = {
  isVisible: boolean;
};

export default function BackToTopButton({ isVisible }: BackToTopButtonProps) {
  return (
    <button
      className={`back-to-top${isVisible ? " is-visible" : ""}`}
      type="button"
      aria-label="Return to top"
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
