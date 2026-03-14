interface AgentBadgesProps {
  mcpSupport?: boolean;
  cliSupport?: boolean;
  agentSkills?: string[];
}

export default function AgentBadges({ mcpSupport, cliSupport, agentSkills }: AgentBadgesProps) {
  const hasBadges = mcpSupport || cliSupport || (agentSkills && agentSkills.length > 0);
  if (!hasBadges) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {mcpSupport && (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
            <path fillRule="evenodd" d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z" clipRule="evenodd" />
          </svg>
          MCP
        </span>
      )}
      {cliSupport && (
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400 ring-1 ring-blue-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
            <path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 0 1 4.25 2h7.5A2.25 2.25 0 0 1 14 4.25v7.5A2.25 2.25 0 0 1 11.75 14h-7.5A2.25 2.25 0 0 1 2 11.75v-7.5ZM4.75 5a.75.75 0 0 0-.53 1.28L5.94 8l-1.72 1.72a.75.75 0 1 0 1.06 1.06l2.25-2.25a.75.75 0 0 0 0-1.06L5.28 5.22A.75.75 0 0 0 4.75 5ZM8.5 10.25a.75.75 0 0 0 0 1.5h2.75a.75.75 0 0 0 0-1.5H8.5Z" clipRule="evenodd" />
          </svg>
          CLI
        </span>
      )}
      {agentSkills && agentSkills.length > 0 && (
        <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-400 ring-1 ring-violet-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
            <path d="M8 .5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 .5Zm0 10a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 10.5Zm5.5-3a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 .75-.75ZM3.25 6.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5Z" />
          </svg>
          {agentSkills.length} {agentSkills.length === 1 ? "Skill" : "Skills"}
        </span>
      )}
    </div>
  );
}
