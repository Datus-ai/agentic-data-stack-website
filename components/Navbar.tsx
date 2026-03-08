"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Evolution", href: "#evolution" },
  { label: "Focus", href: "#focus" },
  { label: "Participate", href: "#participate" },
  { label: "CFP Tracks", href: "#tracks" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-card-border shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <img src="/images/logo.png" alt="Agentic Data Stack" className="h-8 w-8 rounded-lg object-cover" />
          <span className="hidden sm:inline">Agentic Data Stack</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.linkedin.com/company/agentic-data-stack/"
            target="_blank"
            rel="noopener noreferrer"
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://www.linkedin.com/company/agentic-data-stack/"
              target="_blank"
              rel="noopener noreferrer"
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
