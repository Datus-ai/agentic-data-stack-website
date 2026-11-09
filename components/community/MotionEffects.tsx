"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MotionEffects() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const groups = Array.from(document.querySelectorAll<HTMLElement>(
      "main .site-section > .site-width, .footer-participate",
    ));
    const items: HTMLElement[] = [];
    const show = (group: HTMLElement) => {
      group.dataset.scrollReveal = "shown";
      observer?.unobserve(group);
    };
    const reset = () => {
      observer?.disconnect();
      groups.forEach(group => group.removeAttribute("data-scroll-reveal"));
      items.forEach(item => {
        item.removeAttribute("data-scroll-item");
        item.style.removeProperty("--reveal-delay");
      });
      items.length = 0;
    };
    const setup = () => {
      reset();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) show(entry.target as HTMLElement);
        });
      }, { threshold: 0.06, rootMargin: "0px 0px -24px 0px" });
      groups.forEach(group => {
        // Enhance only content below the viewport; initial content stays visible.
        if (group.getBoundingClientRect().top < window.innerHeight) return;
        group.dataset.scrollReveal = "pending";
        group.querySelectorAll<HTMLElement>(".topic-card, .article-card, .event-card, .founder, .footer-action-card").forEach((item,index) => {
          item.setAttribute("data-scroll-item", "");
          item.style.setProperty("--reveal-delay", `${Math.min(index, 3) * 65}ms`);
          items.push(item);
        });
        observer?.observe(group);
      });
    };
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const group = event.target.closest<HTMLElement>("[data-scroll-reveal='pending']");
      if (group) show(group);
    };
    setup();
    preference.addEventListener("change", setup);
    document.addEventListener("focusin", onFocus);
    return () => {
      reset();
      preference.removeEventListener("change", setup);
      document.removeEventListener("focusin", onFocus);
    };
  }, [pathname]);
  return null;
}
