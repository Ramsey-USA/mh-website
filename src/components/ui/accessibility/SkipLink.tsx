"use client";

/**
 * Skip to Main Content Link
 * WCAG AAA compliance - allows keyboard users to skip navigation
 */
export function SkipLink() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const main = document.querySelector("main");
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus();
      main.removeAttribute("tabindex");
      main.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a href="#main-content" className="skip-link" onClick={handleClick}>
      Skip to main content
    </a>
  );
}
