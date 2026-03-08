const footerLinks = {
  Community: [
    { label: "LinkedIn Page", href: "https://www.linkedin.com/company/agentic-data-stack/" },
    { label: "Luma Calendar", href: "https://lu.ma/AgenticDataStack" },
    { label: "Call for Proposals", href: "#" },
    { label: "Past Sessions", href: "#" },
  ],
  Explore: [
    { label: "Focus Areas", href: "#focus" },
    { label: "Participate", href: "#participate" },
    { label: "CFP Tracks", href: "#tracks" },
  ],
  Topics: [
    { label: "Agentic Architectures", href: "#tracks" },
    { label: "Catalog & Metadata", href: "#tracks" },
    { label: "Semantic Layer", href: "#tracks" },
    { label: "Production Practices", href: "#tracks" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-card-bg/30 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#" className="flex items-center gap-2 text-lg font-bold">
              <img src="/images/logo.png" alt="Agentic Data Stack" className="h-8 w-8 rounded-lg object-cover" />
              Agentic Data Stack
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              A community exploring how modern data stacks evolve to serve
              agents. Vendor-neutral. Practice-driven. Architecture-first.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="https://www.linkedin.com/company/agentic-data-stack/" target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-foreground" aria-label="LinkedIn">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="text-muted transition-colors hover:text-foreground" aria-label="Twitter">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-card-border pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Agentic Data Stack. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted transition-colors hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
