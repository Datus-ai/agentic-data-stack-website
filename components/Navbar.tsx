"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const sectionLinks = [
  { label: "Evolution", anchor: "#evolution" },
  { label: "Focus", anchor: "#focus" },
  { label: "Participate", anchor: "#participate" },
  { label: "CFP Tracks", anchor: "#tracks" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function sectionHref(anchor: string) {
    return isHome ? anchor : `/${anchor}`;
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-card-border shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <img src="/images/logo.png" alt="Agentic Data Stack" className="h-8 w-8 rounded-md" />
          <span className="hidden sm:inline">Agentic Data Stack</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {sectionLinks.map((link) => (
            <a
              key={link.anchor}
              href={sectionHref(link.anchor)}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/resources"
            className={`text-sm transition-colors hover:text-foreground ${
              pathname.startsWith("/resources")
                ? "text-foreground font-medium"
                : "text-muted"
            }`}
          >
            Resources
          </Link>
          <a
            href="/coming-soon"
            className="rounded-full bg-gradient-to-r from-violet-600 to-blue-500 px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Join Community
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-foreground transition-transform ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-foreground transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-foreground transition-transform ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-card-border bg-background/95 backdrop-blur-lg md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {sectionLinks.map((link) => (
              <a
                key={link.anchor}
                href={sectionHref(link.anchor)}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/resources"
              onClick={() => setMobileOpen(false)}
              className={`text-sm transition-colors hover:text-foreground ${
                pathname.startsWith("/resources")
                  ? "text-foreground font-medium"
                  : "text-muted"
              }`}
            >
              Resources
            </Link>
            <a
              href="/coming-soon"
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-gradient-to-r from-violet-600 to-blue-500 px-5 py-2 text-center text-sm font-medium text-white"
            >
              Join Community
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
