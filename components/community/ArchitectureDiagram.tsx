"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Locale } from "@/lib/community";

const layers = [
  {
    label: "Context", color: "#46d6df", title: "Context & Semantic Intelligence", zhTitle: "上下文与语义智能",
    outcome: "Shared meaning", zhOutcome: "建立共同理解",
    description: "Agents need more than access to tables. They need to understand what data means, where it comes from, who owns it, and which rules apply.",
    zhDescription: "Agent 不仅需要访问数据表，还需要理解数据的含义、来源、负责人以及适用的规则。上下文与语义让它从“找到数据”走向“理解数据”。",
    example: "Before answering “How did revenue change?”, an agent resolves the approved revenue metric, checks its lineage, and applies the relevant business policies.",
    zhExample: "当用户问“收入发生了什么变化”时，Agent 先找到经过确认的收入指标，核对数据血缘，再应用相关业务规则。",
    nodes: ["Catalog & Metadata", "Lineage & Ownership", "Semantic Layer", "Metrics", "Business Glossary", "Policy Context"], hub: "Shared context", zhHub: "共享上下文",
  },
  {
    label: "Planning", color: "#78aaff", title: "Planning, Orchestration & Skills", zhTitle: "规划、编排与技能",
    outcome: "Task routing", zhOutcome: "将目标转化为行动",
    description: "A request becomes a sequence of steps. The agent chooses tools and skills, coordinates sub-agents, routes memory, and brings people in when approval is needed.",
    zhDescription: "将一个请求拆解为可执行的步骤：选择工具和技能、协调子 Agent、调取记忆，并在需要审批时引入人的判断。",
    example: "To investigate a revenue drop, the agent plans a comparison, calls the appropriate tools, and requests approval before a consequential operation.",
    zhExample: "为了分析收入下降，Agent 制定对比计划，调用相应工具；遇到影响较大的操作时，先请求人工确认。",
    nodes: ["Planner", "Workflow Engine", "MCP / Tooling", "Skills & Sub-agents", "Human Approval", "Memory Routing"], hub: "Plan → coordinate", zhHub: "规划 → 协同",
  },
  {
    label: "Execution", color: "#bb8aff", title: "Execution & Data Operations", zhTitle: "执行与数据操作",
    outcome: "Operational action", zhOutcome: "在数据平台上完成任务",
    description: "Plans become queries, pipelines, transformations, and validation. Execution connects agent decisions to real data operations, with versioning and time travel supporting reproducibility.",
    zhDescription: "把计划落实为查询、流水线、转换和验证，让 Agent 的决策连接到真实的数据操作。版本管理与时间旅行帮助复现和追溯执行结果。",
    example: "The agent queries the warehouse, compares business segments, validates the results, and prepares an explanation backed by data.",
    zhExample: "Agent 查询数仓、对比不同业务维度，验证结果，再给出有数据依据的解释。",
    nodes: ["SQL Engines", "Lakehouse / Warehouse", "ETL / ELT", "Transformations", "Data Quality", "Versioning / Time Travel"], hub: "Execute → validate", zhHub: "执行 → 验证",
  },
  {
    label: "Foundation", color: "#efbc67", title: "Storage, Systems & Governance Foundation", zhTitle: "存储、系统与治理基础",
    outcome: "Control & trust", zhOutcome: "支撑可靠、可治理的运行",
    description: "Durable storage and scalable systems support every layer above. Access controls, security, observability, and cost controls keep agent activity within clear operational boundaries.",
    zhDescription: "持久化存储和可扩展系统支撑上层能力。访问控制、安全、可观测性与成本控制，为 Agent 的活动建立清晰的运行边界。",
    example: "The same investigation runs against authorized data, records its activity, and stays within the platform’s resource and cost limits.",
    zhExample: "同一次分析只能访问已授权的数据，执行过程可观测，并受到平台资源与成本约束。",
    nodes: ["Table Formats", "Object Storage", "Databases / Streams", "IAM & Security", "Observability", "Cost Control"], hub: "Governed foundation", zhHub: "治理基础",
  },
];

function LayerSymbol({ index }: { index: number }) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {index === 0 && <><circle cx="16" cy="16" r="5"/><circle cx="5" cy="6" r="2.5"/><circle cx="27" cy="6" r="2.5"/><circle cx="16" cy="28" r="2.5"/><path d="m7 8 6 5m12-5-6 5m-3 8v4"/></>}
    {index === 1 && <><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="21" y="21" width="8" height="8" rx="2"/><path d="M11 7h10a4 4 0 0 1 4 4v10M7 15v6a4 4 0 0 0 4 4h5m-3-3 3 3-3 3"/></>}
    {index === 2 && <><ellipse cx="16" cy="7" rx="11" ry="4"/><path d="M5 7v17c0 2 5 4 11 4s11-2 11-4V7M5 15c0 2 5 4 11 4"/><path d="m15 11-4 7h6l-2 7 7-10h-6l2-4"/></>}
    {index === 3 && <><path d="M16 3 27 7v9c0 6-6 11-11 14C11 27 5 22 5 16V7Z"/><path d="m11 16 4 4 7-8"/></>}
  </svg>;
}

function TopicVisual({ index, zh }: { index: number; zh: boolean }) {
  const layer = layers[index];
  return <figure className="layer-convergence" style={{ "--layer-color": layer.color } as CSSProperties} aria-label={`${layer.title}: ${layer.nodes.join(", ")} → ${layer.hub}`}>
    <div className="layer-visual-heading"><span>LAYER 0{index + 1} / {zh ? "本层能力" : "LAYER FOCUS"}</span><strong>{zh ? layer.zhHub : layer.hub}</strong></div>
    <div className="layer-stream-canvas">
      <svg className="layer-stream-lines" viewBox="0 0 600 440" fill="none" aria-hidden="true">
        {layer.nodes.map((node, i) => {
          const y = 50 + i * 62;
          const path = `M 8 ${y} H 245 C 380 ${y}, 420 205, 540 205`;
          return <g key={node}><path className="layer-stream-track" d={path}/><path className="layer-stream-pulse" d={path} pathLength="100" style={{ animationDelay: `${i * -.65}s` }}/><circle cx="8" cy={y} r="3" fill="currentColor"/></g>;
        })}
        <circle className="layer-stream-halo" cx="540" cy="205" r="43"/>
        <circle className="layer-stream-core" cx="540" cy="205" r="32"/>
      </svg>
      <ol className="layer-stream-labels">{layer.nodes.map((node, i) => <li key={node} style={{ top: `${(50 + i * 62) / 440 * 100}%` }}><span>0{i + 1}</span>{node}</li>)}</ol>
      <div className="layer-stream-symbol"><LayerSymbol index={index}/></div>
      <span className="layer-stream-result">{zh ? layer.zhOutcome : layer.outcome}</span>
    </div>
    <figcaption>{zh ? "多个组件协同，汇聚为这一层的能力。" : "Distinct components converge into a shared capability."}</figcaption>
  </figure>;
}

export default function ArchitectureDiagram({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const target = window.innerHeight * 0.46;
      let nearest = 0;
      let distance = Infinity;
      steps.current.forEach((step, index) => {
        if (!step) return;
        const rect = step.getBoundingClientRect();
        const nextDistance = Math.abs(rect.top + rect.height / 2 - target);
        if (nextDistance < distance) { nearest = index; distance = nextDistance; }
      });
      setActive(nearest);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);

  return <div className="architecture-story">
    <div className="architecture-story-copy">
      <p className="architecture-scroll-hint">{zh ? "向下滚动，逐层探索架构 ↓" : "Scroll to explore the stack, layer by layer ↓"}</p>
        <nav className="architecture-layer-nav" aria-label={zh ? "跳转到架构层" : "Jump to an architecture layer"}>
          {layers.map((layer, index) => <a href={`#architecture-layer-${index + 1}`} key={layer.label} aria-current={active === index ? "step" : undefined} style={{ "--layer-color": layer.color } as CSSProperties}><span>0{index + 1}</span>{layer.label}<span aria-hidden="true">↗</span></a>)}
        </nav>
      {layers.map((layer, index) => <article id={`architecture-layer-${index + 1}`} key={layer.label} ref={el => { steps.current[index] = el; }} className={`architecture-step${active === index ? " is-active" : ""}`} style={{ "--layer-color": layer.color } as CSSProperties}>
        <p className="layer-step-number">LAYER 0{index + 1} <span>/ 04</span></p>
        <h3>{zh ? layer.zhTitle : layer.title}</h3>
        {zh && <p className="layer-english-title" lang="en">{layer.title}</p>}
        <p className="layer-explanation">{zh ? layer.zhDescription : layer.description}</p>
        <div className="layer-example"><span>{zh ? "以一次业务分析为例" : "FOLLOW ONE INVESTIGATION"}</span><p>{zh ? layer.zhExample : layer.example}</p></div>
        <div className="layer-mobile-visual"><TopicVisual index={index} zh={zh} /></div>
      </article>)}
    </div>
    <aside className="architecture-story-stage" aria-label={zh ? "架构层级可视化" : "Architecture layer visualization"}>
      <div className="architecture-topic-panel" key={active}><TopicVisual index={active} zh={zh} /></div>
    </aside>
  </div>;
}
