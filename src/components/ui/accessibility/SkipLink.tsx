"use client";

export function SkipLink() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const main = document.querySelector<HTMLElement>("main");
    if (!main) return;

    // Temporarily make the element programmatically focusable;
    // clean up only after focus leaves so the browser can process it.
    main.setAttribute("tabindex", "-1");
    main.focus();
    main.addEventListener("blur", () => main.removeAttribute("tabindex"), {
      once: true,
    });

    // Respect user's motion preference before smooth-scrolling
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!prefersReducedMotion) {
      main.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a href="#main-content" className="skip-link" onClick={handleClick}>
      Skip to main content
    </a>
  );
}
