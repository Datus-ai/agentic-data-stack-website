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

function TopicVisual({ index, zh }: { index: number; zh: boolean }) {
  const layer = layers[index];
  return <div className="layer-topic-visual" style={{ "--layer-color": layer.color } as CSSProperties}>
    <div className="layer-topic-hub"><span aria-hidden="true">0{index + 1}</span><strong>{zh ? layer.zhHub : layer.hub}</strong></div>
    <div className="layer-topic-nodes">{layer.nodes.map((node, i) => <span key={node} style={{ "--node-order": i } as CSSProperties}>{node}</span>)}</div>
    <p className="layer-topic-outcome">{zh ? layer.zhOutcome : layer.outcome}</p>
  </div>;
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
      <div className="architecture-stage-inner">
        <p className="architecture-stage-eyebrow">AGENTIC EXPERIENCE LAYER</p>
        <p className="architecture-stage-experience">Data Agents · Copilots · APIs · Chat Interfaces</p>
        <nav className="architecture-layer-nav" aria-label={zh ? "跳转到架构层" : "Jump to an architecture layer"}>
          {layers.map((layer, index) => <a href={`#architecture-layer-${index + 1}`} key={layer.label} aria-current={active === index ? "step" : undefined} style={{ "--layer-color": layer.color } as CSSProperties}><span>0{index + 1}</span>{layer.label}<span aria-hidden="true">↗</span></a>)}
        </nav>
        <div className="architecture-topic-panel" key={active}><TopicVisual index={active} zh={zh} /></div>
        <div className="architecture-stage-feedback"><span aria-hidden="true">↻</span><div><strong>{zh ? "持续反馈，贯穿全栈" : "Continuous feedback loop"}</strong><p>{zh ? "评估 · 监控 · 成本优化 · 可靠性 · 治理改进" : "Evaluation · Monitoring · Cost · Reliability · Governance"}</p></div></div>
      </div>
    </aside>
  </div>;
}
