const layers = [
  {
    label: "Context", outcome: "Shared meaning",
    title: "Context & Semantic Intelligence",
    components: "Catalog · Metadata · Lineage · Ownership · Semantic Layer · Metrics · Business Glossary · Policy Context",
    description: "Makes data understandable for agents and provides shared language, constraints, and memory.",
  },
  {
    label: "Planning", outcome: "Task routing",
    title: "Planning, Orchestration & Skills",
    components: "Planner · Workflow Engine · MCP / Tooling · Skills · Sub-agents · Human Approval · Memory Routing",
    description: "Turns requests into structured plans, invokes tools, coordinates multi-step workflows, and manages control flow.",
  },
  {
    label: "Execution", outcome: "Operational action",
    title: "Execution & Data Operations",
    components: "SQL Engines · Lakehouse / Warehouse · ETL / ELT · Transformations · Data Quality · Versioning · Time Travel",
    description: "Executes queries, pipelines, model builds, backfills, validation, and operational actions across the data platform.",
  },
  {
    label: "Foundation", outcome: "Control & trust",
    title: "Storage, Systems & Governance Foundation",
    components: "Table Formats · Object Storage · Databases · Stream Sources · IAM · Security · Observability · Cost Control",
    description: "Provides durable data, scalable infrastructure, access control, telemetry, and governance guardrails.",
  },
];

export default function ArchitectureDiagram() {
  return (
    <figure className="reference-architecture" lang="en" aria-label="Agentic Data Stack reference architecture">
      <div className="reference-experience">
        <h3>Agentic Experience Layer</h3>
        <p>Data Agents · Copilots · Analysts · Engineers · APIs · Chat Interfaces</p>
      </div>
      <ol className="reference-layers">
        {layers.map((layer, index) => (
          <li className={`reference-row reference-row-${index + 1}`} key={layer.label}>
            <span className="reference-label">{layer.label}</span>
            <div className="reference-card">
              <h3><span>{index + 1}.</span> {layer.title}</h3>
              <p className="reference-components">{layer.components}</p>
              <p className="reference-description">{layer.description}</p>
            </div>
            <span className="reference-outcome">{layer.outcome}</span>
          </li>
        ))}
      </ol>
      <figcaption className="reference-feedback">
        <strong>Continuous Feedback Loop</strong>
        <p>Evaluation · Monitoring · Cost Optimization · Reliability · Governance Improvement</p>
      </figcaption>
    </figure>
  );
}
