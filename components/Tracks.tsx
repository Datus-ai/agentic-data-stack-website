const tracks = [
  {
    number: "1",
    title: "Foundations of Agentic Data Stack",
    topics: [
      "What makes modern data stack agentic?",
      "Agentic vs traditional data architectures",
      "From passive data platforms to active, reasoning systems",
      "Lessons learned when introducing agents into data stacks",
    ],
  },
  {
    number: "2",
    title: "Catalog, Metadata & Context",
    topics: [
      "Catalog services as agent memory",
      "Metadata, lineage, and ownership for agent reasoning",
      "Making data catalogs actionable for agents",
      "Context modeling for large-scale data systems",
    ],
  },
  {
    number: "3",
    title: "Lake Formats, Versioning & Time Travel",
    topics: [
      "Table formats and branching for agent workflows",
      "Time travel as checkpoints for agents",
      "Reproducibility and auditability in agent-driven analytics",
      "Managing cost and performance with large numbers of versions",
    ],
  },
  {
    number: "4",
    title: "Lakehouse/Warehouse Engines & Execution",
    topics: [
      "Query engines as components for agents",
      "Plan-aware and cost-aware execution for agent workloads",
      "Feedback loops between agents and query engines",
      "Optimizing execution for iterative and exploratory agents",
    ],
  },
  {
    number: "5",
    title: "Semantic Layer & Metrics",
    topics: [
      "Metrics and semantic models as first-class agent knowledge",
      "Metric reasoning, attribution, and explanation",
      "Bridging BI semantics and agent planning",
      "Semantic consistency across agents, dashboards, and pipelines",
    ],
  },
  {
    number: "6",
    title: "Data Agents & Agent Frameworks",
    topics: [
      "Designing data agents over data stacks",
      "Sub-agents, skills, and task-oriented architectures",
      "Human-in-the-loop design for data agents",
      "Evaluating reliability and correctness of data agents",
    ],
  },
  {
    number: "7",
    title: "ETL / ELT & Agentic Pipelines",
    topics: [
      "Pipelines operated or assisted by agents",
      "Agent-driven data quality checks and recovery",
      "Backfills, schema evolution, and migration with agents",
      "From DAGs to adaptive workflows",
    ],
  },
  {
    number: "8",
    title: "Agentic Data Stack in Production",
    topics: [
      "Real-world agentic data stack architectures",
      "Build vs buy decisions and trade-offs",
      "Migration stories from traditional data stacks",
      "What worked — and what didn't — in production",
    ],
  },
  {
    number: "9",
    title: "Platform Engineering, DevOps & SRE",
    topics: [
      "Operating agents and data systems together",
      "Cost control, isolation, and multi-tenancy",
      "Observability for agent workflows (logs, traces, feedback)",
      "Security, permissions, and access control for agents",
    ],
  },
  {
    number: "10",
    title: "Governance, Reliability & Evaluation",
    topics: [
      "Guardrails and approval flows for agent actions",
      "Governance and compliance in agentic data systems",
      "Offline and online evaluation of agent workflows",
      "Continuous improvement with feedback loops",
    ],
  },
];

export default function Tracks() {
  return (
    <section id="tracks" className="relative px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 h-[300px] w-[300px] rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Call for{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Proposals
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            10 tracks covering the full spectrum of agentic data systems.
            Share your experience &mdash; submit a talk.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {tracks.map((track) => (
            <div
              key={track.number}
              className="group rounded-2xl border border-card-border bg-card-bg/50 p-5 transition-all duration-300 hover:border-violet-500/40 hover:bg-card-bg hover:shadow-lg hover:shadow-violet-500/5"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-xs font-bold text-violet-400">
                  {track.number}
                </span>
                <h3 className="text-sm font-semibold leading-snug sm:text-base">
                  {track.title}
                </h3>
              </div>
              <ul className="space-y-1.5 pl-11">
                {track.topics.map((topic) => (
                  <li
                    key={topic}
                    className="text-xs leading-relaxed text-muted sm:text-sm"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
