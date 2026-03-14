import Link from "next/link";
import SubscribeForm from "@/components/newsletter/SubscribeForm";

const footerLinks = {
  Content: [
    { label: "Blog", href: "/blog" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Resources", href: "/resources" },
    { label: "Call for Proposals", href: "/#tracks" },
  ],
  Community: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/agentic-data-stack/", external: true },
    { label: "Luma Calendar", href: "https://lu.ma/AgenticDataStack", external: true },
  ],
  Resources: [
    { label: "Catalog Service", href: "/resources/catalog-service" },
    { label: "Lake Format", href: "/resources/lake-format" },
    { label: "SQL Engine", href: "/resources/sql-engine" },
    { label: "Semantic Layer", href: "/resources/semantic-layer" },
    { label: "ETL & ELT Tools", href: "/resources/etl-elt-tools" },
    { label: "BI Tools", href: "/resources/bi-tools" },
    { label: "Data Agents", href: "/resources/data-agents" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-card-bg/30 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Newsletter CTA strip */}
        <div className="mb-16 rounded-2xl border border-card-border bg-background/50 p-8 sm:flex sm:items-center sm:gap-8">
          <div className="mb-4 sm:mb-0 sm:flex-1">
            <h3 className="text-lg font-semibold">Stay in the loop</h3>
            <p className="mt-1 text-sm text-muted">
              Weekly digest on agentic data infrastructure. No spam.
            </p>
          </div>
          <div className="sm:w-96">
            <SubscribeForm compact />
          </div>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
              <img src="/images/logo.png" alt="Agentic Data Stack" className="h-8 w-8 rounded-md" />
              Agentic Data Stack
            </Link>
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
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-card-border pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Agentic Data Stack. All rights
            reserved. Built by{" "}
            <a
              href="https://datus.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 transition-colors hover:text-violet-300"
            >
              DatusAI
            </a>
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
