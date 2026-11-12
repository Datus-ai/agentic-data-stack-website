"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Locale } from "@/lib/community";

const layers = [
  {
    label: "Context", color: "#167e87", title: "Context & Semantic Intelligence", zhTitle: "上下文与语义智能",
    outcome: "Shared meaning", zhOutcome: "建立共同理解",
    description: "Agents need more than access to tables. They need to understand what data means, where it comes from, who owns it, and which rules apply.",
    zhDescription: "Agent 不仅需要访问数据表，还需要理解数据的含义、来源、负责人以及适用的规则。上下文与语义让它从“找到数据”走向“理解数据”。",
    example: "Before answering “How did revenue change?”, an agent resolves the approved revenue metric, checks its lineage, and applies the relevant business policies.",
    zhExample: "当用户问“收入发生了什么变化”时，Agent 先找到经过确认的收入指标，核对数据血缘，再应用相关业务规则。",
    nodes: ["Catalog & Metadata", "Lineage & Ownership", "Semantic Layer", "Metrics", "Business Glossary", "Policy Context"], hub: "Shared context", zhHub: "共享上下文",
  },
  {
    label: "Planning", color: "#3a6ca9", title: "Planning, Orchestration & Skills", zhTitle: "规划、编排与技能",
    outcome: "Task routing", zhOutcome: "将目标转化为行动",
    description: "A request becomes a sequence of steps. The agent chooses tools and skills, coordinates sub-agents, routes memory, and brings people in when approval is needed.",
    zhDescription: "将一个请求拆解为可执行的步骤：选择工具和技能、协调子 Agent、调取记忆，并在需要审批时引入人的判断。",
    example: "To investigate a revenue drop, the agent plans a comparison, calls the appropriate tools, and requests approval before a consequential operation.",
    zhExample: "为了分析收入下降，Agent 制定对比计划，调用相应工具；遇到影响较大的操作时，先请求人工确认。",
    nodes: ["Planner", "Workflow Engine", "MCP / Tooling", "Skills & Sub-agents", "Human Approval", "Memory Routing"], hub: "Plan → coordinate", zhHub: "规划 → 协同",
  },
  {
    label: "Execution", color: "#8453b5", title: "Execution & Data Operations", zhTitle: "执行与数据操作",
    outcome: "Operational action", zhOutcome: "在数据平台上完成任务",
    description: "Plans become queries, pipelines, transformations, and validation. Execution connects agent decisions to real data operations, with versioning and time travel supporting reproducibility.",
    zhDescription: "把计划落实为查询、流水线、转换和验证，让 Agent 的决策连接到真实的数据操作。版本管理与时间旅行帮助复现和追溯执行结果。",
    example: "The agent queries the warehouse, compares business segments, validates the results, and prepares an explanation backed by data.",
    zhExample: "Agent 查询数仓、对比不同业务维度，验证结果，再给出有数据依据的解释。",
    nodes: ["SQL Engines", "Lakehouse / Warehouse", "ETL / ELT", "Transformations", "Data Quality", "Versioning / Time Travel"], hub: "Execute → validate", zhHub: "执行 → 验证",
  },
  {
    label: "Foundation", color: "#936824", title: "Storage, Systems & Governance Foundation", zhTitle: "存储、系统与治理基础",
    outcome: "Control & trust", zhOutcome: "支撑可靠、可治理的运行",
    description: "Durable storage and scalable systems support every layer above. Access controls, security, observability, and cost controls keep agent activity within clear operational boundaries.",
    zhDescription: "持久化存储和可扩展系统支撑上层能力。访问控制、安全、可观测性与成本控制，为 Agent 的活动建立清晰的运行边界。",
    example: "The same investigation runs against authorized data, records its activity, and stays within the platform’s resource and cost limits.",
    zhExample: "同一次分析只能访问已授权的数据，执行过程可观测，并受到平台资源与成本约束。",
    nodes: ["Table Formats", "Object Storage", "Databases / Streams", "IAM & Security", "Observability", "Cost Control"], hub: "Governed foundation", zhHub: "治理基础",
  },
];

export default function ArchitectureDiagram({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setEnhanced(true);
    let frame = 0;
    const update = () => {
      frame = 0;
      const element = scene.current;
      if (!element) return;
      const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 73;
      element.style.setProperty("--scene-top", `${headerHeight}px`);
      const rect = element.getBoundingClientRect();
      const runway = rect.height - (window.innerHeight - headerHeight);
      if (runway <= 0) return;
      const progress = (headerHeight - rect.top) / runway;
      setActive(Math.max(0, Math.min(3, Math.floor(progress * 4))));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);
  function selectLayer(index: number) {
    const element = scene.current;
    if (!element) return;
    const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 73;
    const rect = element.getBoundingClientRect();
    const runway = rect.height - (window.innerHeight - headerHeight);
    setActive(index);
    window.scrollTo({ top: window.scrollY + rect.top - headerHeight + runway * ((index + 0.5) / 4), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  const layer = layers[active];
  return <div className="architecture-immersive" data-enhanced={enhanced ? "true" : undefined}>
    <div className="architecture-scroll-track" ref={scene}>
      <div className="architecture-full-canvas" data-active={active}>
        <div className="architecture-canvas-guide"><span>AGENTIC DATA STACK</span><span>{zh ? "向下滚动，逐层探索 ↓" : "Scroll to explore each layer ↓"}</span></div>
        <svg className="architecture-convergence-lines" viewBox="0 0 1600 800" preserveAspectRatio="none" fill="none" aria-hidden="true">
          {layers.map((source, index) => {
            const y = 152 + index * 152;
            const path = `M -40 ${y} H 1000 C 1230 ${y}, 1330 380, 1480 380`;
            return <g key={source.label} className={`architecture-long-ray${active === index ? " is-active" : ""}`}>
              <path className="architecture-ray-base" d={path}/>
              <path className="architecture-ray-flow" d={path} pathLength="100"/>
            </g>;
          })}
        </svg>
        <div className="architecture-ray-sources" aria-label={zh ? "选择架构层" : "Select a layer"}>
          {layers.map((source, index) => <button key={source.label} type="button" className="architecture-source-label" aria-pressed={active === index} onClick={() => selectLayer(index)} style={{ "--ray-position": `${19 + index * 19}%`, "--mobile-ray-position": `${(19 + index * 19) * 0.51}%` } as CSSProperties}>
            <span>0{index + 1}</span>{source.label}<span className="architecture-source-indicator" aria-hidden="true"/>
          </button>)}
        </div>
        <div className="architecture-experience-point" aria-hidden="true"/>
        <div className="architecture-experience-label" lang="en">Agentic<br/><strong>Experience</strong></div>
        <article className={`architecture-floating-card${active > 1 ? " floats-above" : ""}`} key={active}>
          <p className="architecture-floating-index">LAYER 0{active + 1} <span>/ 04</span></p>
          <h3>{zh ? layer.zhTitle : layer.title}</h3>
          {zh && <p className="architecture-floating-subtitle" lang="en">{layer.title}</p>}
          <p className="architecture-floating-description">{zh ? layer.zhDescription : layer.description}</p>
          <ul className="architecture-floating-capabilities">{layer.nodes.map(node => <li key={node}>{node}</li>)}</ul>
          <div className="architecture-floating-example"><span>{zh ? "一次业务分析中的作用" : "IN A REAL-WORLD WORKFLOW"}</span><p>{zh ? layer.zhExample : layer.example}</p></div>
        </article>
        <div className="architecture-canvas-progress" aria-hidden="true"><span>0{active + 1} / 04</span><div>{layers.map((item, index) => <i key={item.label} className={index === active ? "is-active" : ""}/>)}</div></div>
      </div>
    </div>
    <noscript><div className="architecture-static-content">{layers.map(item => <article key={item.label}><h3>{zh ? item.zhTitle : item.title}</h3><p>{zh ? item.zhDescription : item.description}</p><p>{item.nodes.join(" · ")}</p></article>)}</div></noscript>
  </div>;
}
