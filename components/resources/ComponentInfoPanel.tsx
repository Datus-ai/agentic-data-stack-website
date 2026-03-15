interface AgentSkill {
  name: string;
  url: string;
}

interface ComponentInfoPanelProps {
  website?: string;
  github?: string;
  license?: string;
  docsUrl?: string;
  mcpSupport?: boolean;
  mcpServerUrl?: string;
  cliSupport?: boolean;
  cliName?: string;
  cliDocsUrl?: string;
  cliInstall?: string;
  agentSkills?: AgentSkill[];
}

export default function ComponentInfoPanel({
  website,
  github,
  license,
  docsUrl,
  mcpSupport,
  mcpServerUrl,
  cliSupport,
  cliName,
  cliDocsUrl,
  cliInstall,
  agentSkills,
}: ComponentInfoPanelProps) {
  return (
    <div className="space-y-5">
      {/* Links & License */}
      <aside className="rounded-2xl border border-card-border bg-card-bg p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
          Links
        </h3>
        <div className="mt-3 space-y-3">
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 shrink-0 text-muted group-hover:text-foreground transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9 9 0 0 1 3 12c0-1.47.353-2.856.978-4.082" />
              </svg>
              <span className="truncate text-sm text-accent-light group-hover:text-foreground transition-colors">
                {website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </span>
            </a>
          )}

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0 text-muted group-hover:text-foreground transition-colors">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
              </svg>
              <span className="truncate text-sm text-accent-light group-hover:text-foreground transition-colors">
                {github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
              </span>
            </a>
          )}

          {docsUrl && (
            <a
              href={docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 shrink-0 text-muted group-hover:text-foreground transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
              <span className="truncate text-sm text-accent-light group-hover:text-foreground transition-colors">
                Documentation
              </span>
            </a>
          )}

          {license && (
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 shrink-0 text-muted">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
              </svg>
              <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs font-medium text-muted ring-1 ring-white/10">
                {license}
              </span>
            </div>
          )}
        </div>
      </aside>

      {/* MCP Server */}
      {mcpSupport && (
        <aside className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 text-emerald-400">
                <path d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-emerald-400">
              MCP Server
            </h3>
          </div>
          {mcpServerUrl ? (
            <a
              href={mcpServerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-xs text-emerald-300 transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
              </svg>
              <span className="truncate">
                {mcpServerUrl.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="ml-auto h-3 w-3 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          ) : (
            <p className="mt-2 text-xs text-muted">
              MCP integration available
            </p>
          )}
        </aside>
      )}

      {/* CLI */}
      {cliSupport && (cliName || cliDocsUrl) && (
        <aside className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500/10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 text-blue-400">
                <path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 0 1 4.25 2h7.5A2.25 2.25 0 0 1 14 4.25v7.5A2.25 2.25 0 0 1 11.75 14h-7.5A2.25 2.25 0 0 1 2 11.75v-7.5ZM4.75 5a.75.75 0 0 0-.53 1.28L5.94 8l-1.72 1.72a.75.75 0 1 0 1.06 1.06l2.25-2.25a.75.75 0 0 0 0-1.06L5.28 5.22A.75.75 0 0 0 4.75 5ZM8.5 10.25a.75.75 0 0 0 0 1.5h2.75a.75.75 0 0 0 0-1.5H8.5Z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-blue-400">
              CLI
            </h3>
          </div>
          {cliName && (
            <div className="mt-3 rounded-lg bg-black/30 px-3 py-2">
              <code className="text-xs text-blue-300 font-mono">
                {cliName}
              </code>
            </div>
          )}
          {cliInstall && (
            <div className="mt-2 rounded-lg bg-black/30 px-3 py-2">
              <code className="text-[11px] text-muted font-mono break-all">
                $ {cliInstall}
              </code>
            </div>
          )}
          {cliDocsUrl && (
            <a
              href={cliDocsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-2 text-xs text-blue-300 transition-colors hover:text-blue-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
              CLI Documentation
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="ml-auto h-3 w-3 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          )}
        </aside>
      )}

      {/* Agent Skills */}
      {agentSkills && agentSkills.length > 0 && (
        <aside className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-500/10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 text-violet-400">
                <path d="M8 .5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 .5Zm0 10a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 10.5Zm5.5-3a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 .75-.75ZM3.25 6.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5Z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-violet-400">
              Agent Skills
            </h3>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {agentSkills.map((skill) => (
              <a
                key={skill.name}
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-violet-500/10 px-2 py-1 text-xs font-medium text-violet-300 ring-1 ring-violet-500/20 transition-all hover:bg-violet-500/20 hover:text-violet-200 hover:ring-violet-500/40"
              >
                {skill.name}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-2.5 w-2.5 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            ))}
          </div>
        </aside>
      )}

      {/* Playground CTA */}
      <aside className="rounded-2xl border border-dashed border-amber-500/30 bg-amber-500/5 p-5">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 text-amber-400">
              <path d="M5.525 3.025a3.5 3.5 0 0 1 4.95 0 .75.75 0 1 0 1.06-1.06 5 5 0 0 0-7.07 0 .75.75 0 0 0 1.06 1.06ZM4.111 5.553a.75.75 0 0 1-.04 1.06A3.987 3.987 0 0 0 2.5 9.5a.75.75 0 0 1-1.5 0 5.487 5.487 0 0 1 2.172-4.007.75.75 0 0 1 1.06.04Zm7.889-.04a.75.75 0 0 1 1.02-.04A5.488 5.488 0 0 1 15 9.5a.75.75 0 0 1-1.5 0 3.988 3.988 0 0 0-1.572-2.927.75.75 0 0 1-.04-1.06h.111ZM8 6a2.5 2.5 0 0 0-1.768 4.268l-1.178 3.533a.5.5 0 0 0 .474.658h.028l1.194-.189.825.825a.5.5 0 0 0 .85-.248L8.93 13h.14l.506 1.847a.5.5 0 0 0 .85.248l.825-.825 1.194.19h.028a.5.5 0 0 0 .474-.659l-1.178-3.533A2.5 2.5 0 0 0 8 6Z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-amber-400">
            Playground
          </h3>
        </div>
        <p className="mt-2 text-xs text-amber-300/70">
          Agent playground coming soon. Try agent + component integration in your browser.
        </p>
        <button
          disabled
          className="mt-3 w-full rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-400/50 cursor-not-allowed"
        >
          Coming Soon
        </button>
      </aside>
    </div>
  );
}
