export default function Evolution() {
  return (
    <section id="evolution" className="relative px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-0 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Agentic Data Stack
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            A reference architecture for data systems designed for agents,
            context, reasoning, execution, and governance.
          </p>
        </div>

        <div className="mt-16 overflow-hidden rounded-2xl border border-violet-500/20">
          <svg
            viewBox="0 130 1600 940"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-auto w-full"
            role="img"
            aria-label="Agentic Data Stack reference architecture"
          >
            <defs>
              <linearGradient id="bg" x1="0" y1="0" x2="1600" y2="1080" gradientUnits="userSpaceOnUse">
                <stop stopColor="#07111F" />
                <stop offset="1" stopColor="#0F172A" />
              </linearGradient>
              <linearGradient id="agentGlow" x1="400" y1="120" x2="1200" y2="120" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22D3EE" />
                <stop offset="1" stopColor="#A855F7" />
              </linearGradient>
              <linearGradient id="layerStroke" x1="240" y1="0" x2="1360" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22D3EE" />
                <stop offset="1" stopColor="#A855F7" />
              </linearGradient>
              <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="18" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="10" stdDeviation="20" floodColor="#020617" floodOpacity="0.45" />
              </filter>
            </defs>

            <rect width="1600" height="1080" fill="url(#bg)" />
            <circle cx="1360" cy="120" r="220" fill="#0EA5E9" fillOpacity="0.08" />
            <circle cx="260" cy="980" r="260" fill="#A855F7" fillOpacity="0.08" />

            {/* Agent layer */}
            <g filter="url(#softGlow)">
              <rect x="400" y="160" width="800" height="120" rx="28" fill="#0F172A" stroke="url(#agentGlow)" strokeWidth="2.5" />
            </g>
            <text x="800" y="212" style={{ font: "700 26px Inter, Arial, sans-serif", fill: "#ECFEFF" }} textAnchor="middle">Agentic Experience Layer</text>
            <text x="800" y="243" style={{ font: "500 16px Inter, Arial, sans-serif", fill: "#C4B5FD" }} textAnchor="middle">Data Agents · Copilots · Analysts · Engineers · APIs · Chat Interfaces</text>

            {/* Connector down */}
            <path d="M800 280V322" stroke="#64748B" strokeWidth="2" strokeDasharray="8 8" />

            {/* Layer 1 */}
            <g filter="url(#cardShadow)">
              <rect x="220" y="330" width="1160" height="130" rx="28" fill="#111827" stroke="url(#layerStroke)" strokeOpacity="0.55" strokeWidth="2" />
            </g>
            <text x="260" y="378" style={{ font: "700 24px Inter, Arial, sans-serif", fill: "#F8FAFC" }}>1. Context &amp; Semantic Intelligence</text>
            <text x="260" y="410" style={{ font: "500 16px Inter, Arial, sans-serif", fill: "#CBD5E1" }}>Catalog · Metadata · Lineage · Ownership · Semantic Layer · Metrics · Business Glossary · Policy Context</text>
            <text x="260" y="436" style={{ font: "500 14px Inter, Arial, sans-serif", fill: "#94A3B8" }}>Makes data understandable for agents and provides shared language, constraints, and memory.</text>

            {/* Layer 2 */}
            <g filter="url(#cardShadow)">
              <rect x="220" y="490" width="1160" height="130" rx="28" fill="#111827" stroke="url(#layerStroke)" strokeOpacity="0.55" strokeWidth="2" />
            </g>
            <text x="260" y="538" style={{ font: "700 24px Inter, Arial, sans-serif", fill: "#F8FAFC" }}>2. Planning, Orchestration &amp; Skills</text>
            <text x="260" y="570" style={{ font: "500 16px Inter, Arial, sans-serif", fill: "#CBD5E1" }}>Planner · Workflow Engine · MCP / Tooling · Skills · Sub-agents · Human Approval · Memory Routing</text>
            <text x="260" y="596" style={{ font: "500 14px Inter, Arial, sans-serif", fill: "#94A3B8" }}>Turns requests into structured plans, invokes tools, coordinates multi-step workflows, and manages control flow.</text>

            {/* Layer 3 */}
            <g filter="url(#cardShadow)">
              <rect x="220" y="650" width="1160" height="130" rx="28" fill="#111827" stroke="url(#layerStroke)" strokeOpacity="0.55" strokeWidth="2" />
            </g>
            <text x="260" y="698" style={{ font: "700 24px Inter, Arial, sans-serif", fill: "#F8FAFC" }}>3. Execution &amp; Data Operations</text>
            <text x="260" y="730" style={{ font: "500 16px Inter, Arial, sans-serif", fill: "#CBD5E1" }}>SQL Engines · Lakehouse / Warehouse · ETL / ELT · Transformations · Data Quality · Versioning · Time Travel</text>
            <text x="260" y="756" style={{ font: "500 14px Inter, Arial, sans-serif", fill: "#94A3B8" }}>Executes queries, pipelines, model builds, backfills, validation, and operational actions across the data platform.</text>

            {/* Layer 4 */}
            <g filter="url(#cardShadow)">
              <rect x="220" y="810" width="1160" height="130" rx="28" fill="#111827" stroke="url(#layerStroke)" strokeOpacity="0.55" strokeWidth="2" />
            </g>
            <text x="260" y="858" style={{ font: "700 24px Inter, Arial, sans-serif", fill: "#F8FAFC" }}>4. Storage, Systems &amp; Governance Foundation</text>
            <text x="260" y="890" style={{ font: "500 16px Inter, Arial, sans-serif", fill: "#CBD5E1" }}>Table Formats · Object Storage · Databases · Stream Sources · IAM · Security · Observability · Cost Control</text>
            <text x="260" y="916" style={{ font: "500 14px Inter, Arial, sans-serif", fill: "#94A3B8" }}>Provides durable data, scalable infrastructure, access control, telemetry, and governance guardrails.</text>

            {/* Vertical connectors between layers */}
            <line x1="800" y1="460" x2="800" y2="490" stroke="#64748B" strokeWidth="2" strokeDasharray="6 6" />
            <line x1="800" y1="620" x2="800" y2="650" stroke="#64748B" strokeWidth="2" strokeDasharray="6 6" />
            <line x1="800" y1="780" x2="800" y2="810" stroke="#64748B" strokeWidth="2" strokeDasharray="6 6" />

            {/* Side pills left with connectors */}
            <line x1="188" y1="369" x2="220" y2="369" stroke="#22D3EE" strokeOpacity="0.25" strokeWidth="1.5" />
            <rect x="78" y="352" width="110" height="34" rx="17" fill="#083344" stroke="#22D3EE" strokeOpacity="0.35" />
            <text x="133" y="374" style={{ font: "600 14px Inter, Arial, sans-serif", fill: "#CFFAFE" }} textAnchor="middle">Context</text>

            <line x1="188" y1="529" x2="220" y2="529" stroke="#60A5FA" strokeOpacity="0.25" strokeWidth="1.5" />
            <rect x="66" y="512" width="122" height="34" rx="17" fill="#172554" stroke="#60A5FA" strokeOpacity="0.35" />
            <text x="127" y="534" style={{ font: "600 14px Inter, Arial, sans-serif", fill: "#CFFAFE" }} textAnchor="middle">Planning</text>

            <line x1="188" y1="689" x2="220" y2="689" stroke="#A855F7" strokeOpacity="0.3" strokeWidth="1.5" />
            <rect x="68" y="672" width="120" height="34" rx="17" fill="#3B0764" stroke="#A855F7" strokeOpacity="0.4" />
            <text x="128" y="694" style={{ font: "600 14px Inter, Arial, sans-serif", fill: "#CFFAFE" }} textAnchor="middle">Execution</text>

            <line x1="188" y1="849" x2="220" y2="849" stroke="#F59E0B" strokeOpacity="0.25" strokeWidth="1.5" />
            <rect x="58" y="832" width="130" height="34" rx="17" fill="#3F1D0D" stroke="#F59E0B" strokeOpacity="0.35" />
            <text x="123" y="854" style={{ font: "600 14px Inter, Arial, sans-serif", fill: "#CFFAFE" }} textAnchor="middle">Foundation</text>

            {/* Right annotations with connectors */}
            <line x1="1380" y1="369" x2="1410" y2="369" stroke="#475569" strokeOpacity="0.4" strokeWidth="1.5" />
            <rect x="1410" y="352" width="120" height="34" rx="17" fill="#0F172A" stroke="#475569" />
            <text x="1470" y="374" style={{ font: "500 14px Inter, Arial, sans-serif", fill: "#94A3B8" }} textAnchor="middle">Shared meaning</text>

            <line x1="1380" y1="529" x2="1410" y2="529" stroke="#475569" strokeOpacity="0.4" strokeWidth="1.5" />
            <rect x="1410" y="512" width="120" height="34" rx="17" fill="#0F172A" stroke="#475569" />
            <text x="1470" y="534" style={{ font: "500 14px Inter, Arial, sans-serif", fill: "#94A3B8" }} textAnchor="middle">Task routing</text>

            <line x1="1380" y1="689" x2="1410" y2="689" stroke="#475569" strokeOpacity="0.4" strokeWidth="1.5" />
            <rect x="1410" y="672" width="120" height="34" rx="17" fill="#0F172A" stroke="#475569" />
            <text x="1470" y="694" style={{ font: "500 14px Inter, Arial, sans-serif", fill: "#94A3B8" }} textAnchor="middle">Operational action</text>

            <line x1="1380" y1="849" x2="1410" y2="849" stroke="#475569" strokeOpacity="0.4" strokeWidth="1.5" />
            <rect x="1410" y="832" width="120" height="34" rx="17" fill="#0F172A" stroke="#475569" />
            <text x="1470" y="854" style={{ font: "500 14px Inter, Arial, sans-serif", fill: "#94A3B8" }} textAnchor="middle">Control &amp; trust</text>

            {/* Bottom loop */}
            <path d="M240 980C420 1018 1180 1018 1360 980" stroke="#334155" strokeWidth="2" />
            <path d="M800 940V974" stroke="#334155" strokeWidth="2" />
            <text x="800" y="1018" style={{ font: "700 22px Inter, Arial, sans-serif", fill: "#E2E8F0" }} textAnchor="middle">Continuous Feedback Loop</text>
            <text x="800" y="1044" style={{ font: "500 14px Inter, Arial, sans-serif", fill: "#94A3B8" }} textAnchor="middle">Evaluation · Monitoring · Cost Optimization · Reliability · Governance Improvement</text>
          </svg>
        </div>
      </div>
    </section>
  );
}
