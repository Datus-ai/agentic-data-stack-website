import Link from "next/link";
import AgentBadges from "./AgentBadges";

interface ComponentCardProps {
  name: string;
  slug: string;
  description: string;
  website?: string;
  github?: string;
  license?: string;
  mcpSupport?: boolean;
  cliSupport?: boolean;
  agentSkills?: { name: string; url: string }[];
  categorySlug: string;
}

export default function ComponentCard({
  name,
  slug,
  description,
  website,
  github,
  license,
  mcpSupport,
  cliSupport,
  agentSkills,
  categorySlug,
}: ComponentCardProps) {
  return (
    <div className="group relative flex flex-col rounded-2xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <Link
          href={`/resources/${categorySlug}/${slug}`}
          className="text-lg font-semibold text-foreground transition-colors hover:text-accent-light"
        >
          {name}
        </Link>
        {license && (
          <span className="shrink-0 rounded-full bg-white/5 px-2.5 py-0.5 text-xs font-medium text-muted ring-1 ring-white/10">
            {license}
          </span>
        )}
      </div>

      <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
        {description}
      </p>

      <div className="mb-4">
        <AgentBadges mcpSupport={mcpSupport} cliSupport={cliSupport} agentSkills={agentSkills} />
      </div>

      <div className="flex items-center gap-3 border-t border-card-border pt-4">
        <Link
          href={`/resources/${categorySlug}/${slug}`}
          className="text-sm font-medium text-accent-light transition-colors hover:text-foreground"
        >
          Details &rarr;
        </Link>
        <div className="ml-auto flex items-center gap-2">
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-1.5 text-muted transition-colors hover:bg-white/5 hover:text-foreground"
              aria-label={`${name} website`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9 9 0 0 1 3 12c0-1.47.353-2.856.978-4.082" />
              </svg>
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-1.5 text-muted transition-colors hover:bg-white/5 hover:text-foreground"
              aria-label={`${name} GitHub`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
