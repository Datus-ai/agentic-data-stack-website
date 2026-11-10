import type { Metadata } from "next";
export type Locale = "en" | "zh";
export type Localized = { en: string; zh: string };
export const text = (value: Localized, locale: Locale) => value[locale];
export const localPath = (path: string, locale: Locale) =>
  locale === "zh" ? `/zh${path === "/" ? "" : path}` : path;
export const siteUrl = "https://agenticdatastack.org";
export const calendarUrl = "https://luma.com/AgenticDataStack";
export const calendarEmbed =
  "https://luma.com/embed/calendar/cal-drir8uAibjBkrlB/events";
export const linkedinUrl =
  "https://www.linkedin.com/company/agentic-data-stack/";
export const definition = {
  en: "The Agentic Data Stack is a data technology stack designed and evolved for AI agents, enabling them to understand data and business context and carry out discovery, development, analysis, and operations under governed, verifiable conditions.",
  zh: "Agentic Data Stack 指面向 AI Agent 设计和演进的数据技术栈，使 Agent 能够理解数据与业务上下文，并在受治理、可验证的条件下完成数据发现、开发、分析和运维等任务。",
};
export const communityIntro = {
  en: "An open, vendor-neutral, practice-driven community exploring Data Agents and the next generation of data infrastructure. We connect developers, data engineers, architects, researchers, enterprise teams, and open-source communities to share what works, what fails, and what comes next.",
  zh: "一个开放、厂商中立、实践驱动的技术社区，连接 Data Agent 开发者、数据工程师、架构师、AI 研究者、企业实践团队和开源社区，分享前沿技术、真实生产经验，也讨论遇到的问题和失败的尝试。",
};
export const organizations = [
  {
    id: "datus",
    name: "DatusAI",
    url: "https://datus.ai",
    logo: "/images/organizations/datus-white.svg",
    description: {
      en: "AI-native workflows for data teams.",
      zh: "面向数据团队的 AI 原生工作流。",
    },
  },
  {
    id: "nebula",
    name: "NebulaGraph",
    url: "https://www.nebula-graph.io",
    logo: "/images/organizations/nebula.svg",
    description: {
      en: "An open-source, distributed graph database.",
      zh: "开源分布式图数据库。",
    },
  },
  {
    id: "starrocks",
    name: "StarRocks",
    url: "https://www.starrocks.io",
    logo: "/images/organizations/starrocks.svg",
    description: {
      en: "An open-source engine for real-time analytics.",
      zh: "面向实时分析的开源分析引擎。",
    },
  },
];
export const topics: {
  title: Localized;
  description: Localized;
  category: string;
}[] = [
  {
    title: { en: "Data Agents in practice", zh: "Data Agent 的能力与实践" },
    description: {
      en: "Planning, tool use, context management, and verification in data development, analytics, and operations.",
      zh: "探索数据开发、智能问数、分析与运维中的规划、工具使用、上下文管理和结果验证。",
    },
    category: "data-agents",
  },
  {
    title: { en: "Data & business context", zh: "数据与业务上下文" },
    description: {
      en: "Help agents understand business meaning beyond SQL with reusable enterprise context.",
      zh: "让 Agent 理解数据与业务语义，构建高质量、可复用的 Enterprise Context，而不只是生成 SQL。",
    },
    category: "catalog-service",
  },
  {
    title: { en: "Semantics, graphs & ontology", zh: "语义层、知识图谱与本体" },
    description: {
      en: "Connect metrics, business objects, relationships, and rules to move from analysis toward decisions and action.",
      zh: "连接指标、业务对象、关系与规则，从数据分析走向业务洞察、决策与行动。",
    },
    category: "semantic-layer",
  },
  {
    title: { en: "Agent-ready infrastructure", zh: "Agent-ready 数据基础设施" },
    description: {
      en: "How databases, catalogs, lakehouses, and pipelines evolve for autonomous exploration.",
      zh: "数据库、Data Catalog、Lakehouse 和 Pipeline 如何演进，支持 Agent 自主探索与持续工作。",
    },
    category: "lake-format",
  },
  {
    title: { en: "Reliability in production", zh: "生产环境的可靠性" },
    description: {
      en: "Evaluation, accuracy, permissions, security, observability, and the cost of complex execution.",
      zh: "讨论准确性、可靠性、可解释性，以及权限、安全、成本、可观测性与复杂任务执行。",
    },
    category: "sql-engine",
  },
  {
    title: { en: "People & agents", zh: "人与 Agent 的协作" },
    description: {
      en: "How engineers, analysts, and business teams work as agents take on more of the data workflow.",
      zh: "当 Agent 承担更多数据工作，工程师、分析师和业务人员的角色与工作方式如何演变。",
    },
    category: "bi-tools",
  },
];
export function pageMetadata(
  title: Localized,
  description: Localized,
  path: string,
  locale: Locale,
): Metadata {
  return {
    title: `${text(title, locale)} | Agentic Data Stack`,
    description: text(description, locale),
    alternates: {
      canonical: localPath(path, locale),
      languages: {
        en: path,
        "zh-CN": localPath(path, "zh"),
        "x-default": path,
      },
    },
    openGraph: {
      title: text(title, locale),
      description: text(description, locale),
      url: localPath(path, locale),
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? "en_US" : "zh_CN",
      images: ["/images/og-image.png"],
    },
  };
}
