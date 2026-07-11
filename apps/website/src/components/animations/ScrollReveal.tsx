"use client";

import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    // Mark elements as JS-controlled immediately
    const scrollElements = document.querySelectorAll(".scroll-reveal");
    scrollElements.forEach((el) => el.classList.add("js-controlled"));

    if (typeof IntersectionObserver === "undefined") {
      // Fallback: reveal immediately when observer APIs are unavailable.
      scrollElements.forEach((el) => el.classList.add("revealed"));
      return;
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    }, observerOptions);

    scrollElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);
}

export default function ScrollReveal() {
  useScrollReveal();
  return null;
}
