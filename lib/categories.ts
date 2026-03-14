export interface ToolInfo {
  name: string;
  slug: string;
  description: string;
  website?: string;
  github?: string;
  license?: string;
  mcpSupport?: boolean;
  cliSupport?: boolean;
  agentSkills?: string[];
}

export interface Category {
  title: string;
  slug: string;
  description: string;
  icon: string;
  tools: ToolInfo[];
}

export const categories: Category[] = [
  {
    title: "Catalog Service",
    slug: "catalog-service",
    description:
      "Metadata catalogs that provide unified governance, discovery, and interoperability across data lakehouse engines and formats.",
    icon: "catalog",
    tools: [
      {
        name: "Apache Polaris",
        slug: "apache-polaris",
        description:
          "Open-source catalog for Apache Iceberg, providing RESTful interoperability across engines.",
        website: "https://polaris.apache.org",
        github: "https://github.com/apache/polaris",
        license: "Apache-2.0",
        mcpSupport: true,
        cliSupport: true,
        agentSkills: ["catalog-browse", "namespace-manage", "table-discover"],
      },
      {
        name: "Unity Catalog",
        slug: "unity-catalog",
        description:
          "Open-source universal catalog for data and AI, supporting multi-format and multi-engine governance.",
        website: "https://www.unitycatalog.io",
        github: "https://github.com/unitycatalog/unitycatalog",
        license: "Apache-2.0",
        mcpSupport: true,
        cliSupport: true,
        agentSkills: ["catalog-browse", "access-control", "lineage"],
      },
      {
        name: "Gravitino",
        slug: "gravitino",
        description:
          "High-performance metadata lake that unifies metadata from diverse sources for data and AI.",
        website: "https://gravitino.apache.org",
        github: "https://github.com/apache/gravitino",
        license: "Apache-2.0",
        mcpSupport: false,
        cliSupport: true,
        agentSkills: ["catalog-browse", "schema-manage"],
      },
      {
        name: "Hive Metastore",
        slug: "hive-metastore",
        description:
          "The foundational metadata service for Hadoop ecosystem, still widely used for table and schema management.",
        website: "https://hive.apache.org",
        github: "https://github.com/apache/hive",
        license: "Apache-2.0",
        mcpSupport: false,
        cliSupport: true,
        agentSkills: [],
      },
    ],
  },
  {
    title: "Lake Format",
    slug: "lake-format",
    description:
      "Open table formats that bring ACID transactions, schema evolution, and time travel to data lakes.",
    icon: "lake",
    tools: [
      {
        name: "Apache Iceberg",
        slug: "apache-iceberg",
        description:
          "Open table format for huge analytic datasets with agent-friendly branching and time travel.",
        website: "https://iceberg.apache.org",
        github: "https://github.com/apache/iceberg",
        license: "Apache-2.0",
        mcpSupport: true,
        cliSupport: true,
        agentSkills: ["query", "branch", "snapshot", "time-travel"],
      },
      {
        name: "Delta Lake",
        slug: "delta-lake",
        description:
          "Open storage framework that brings reliability and performance to data lakes.",
        website: "https://delta.io",
        github: "https://github.com/delta-io/delta",
        license: "Apache-2.0",
        mcpSupport: true,
        cliSupport: true,
        agentSkills: ["query", "time-travel", "optimize"],
      },
      {
        name: "Apache Hudi",
        slug: "apache-hudi",
        description:
          "Streaming data lakehouse platform with incremental processing and record-level updates.",
        website: "https://hudi.apache.org",
        github: "https://github.com/apache/hudi",
        license: "Apache-2.0",
        mcpSupport: false,
        cliSupport: true,
        agentSkills: ["query", "incremental-read"],
      },
      {
        name: "Apache Paimon",
        slug: "apache-paimon",
        description:
          "Streaming data lake platform supporting high-speed ingestion and changelog tracking.",
        website: "https://paimon.apache.org",
        github: "https://github.com/apache/paimon",
        license: "Apache-2.0",
        mcpSupport: false,
        cliSupport: true,
        agentSkills: ["query", "changelog"],
      },
    ],
  },
  {
    title: "SQL Engine",
    slug: "sql-engine",
    description:
      "Distributed and embedded SQL engines that power analytics queries across lakehouse storage.",
    icon: "engine",
    tools: [
      {
        name: "Trino",
        slug: "trino",
        description:
          "Fast distributed SQL query engine for big data analytics across federated data sources.",
        website: "https://trino.io",
        github: "https://github.com/trinodb/trino",
        license: "Apache-2.0",
        mcpSupport: true,
        cliSupport: true,
        agentSkills: ["query", "federated-query", "catalog-browse"],
      },
      {
        name: "DuckDB",
        slug: "duckdb",
        description:
          "In-process SQL OLAP database with excellent agent integration for local analytics.",
        website: "https://duckdb.org",
        github: "https://github.com/duckdb/duckdb",
        license: "MIT",
        mcpSupport: true,
        cliSupport: true,
        agentSkills: ["query", "data-import", "export"],
      },
      {
        name: "Apache Spark",
        slug: "apache-spark",
        description:
          "Unified analytics engine for large-scale data processing with SQL, streaming, and ML.",
        website: "https://spark.apache.org",
        github: "https://github.com/apache/spark",
        license: "Apache-2.0",
        mcpSupport: false,
        cliSupport: true,
        agentSkills: ["query", "etl", "ml-pipeline"],
      },
      {
        name: "StarRocks",
        slug: "starrocks",
        description:
          "High-performance analytical database for real-time and batch analytics at scale.",
        website: "https://www.starrocks.io",
        github: "https://github.com/StarRocks/starrocks",
        license: "Apache-2.0",
        mcpSupport: false,
        cliSupport: true,
        agentSkills: ["query", "real-time-analytics"],
      },
    ],
  },
  {
    title: "Semantic Layer",
    slug: "semantic-layer",
    description:
      "Metric and semantic layers that provide consistent business definitions for agents and humans alike.",
    icon: "semantic",
    tools: [
      {
        name: "Cube",
        slug: "cube",
        description:
          "Universal semantic layer for building data applications with consistent metrics.",
        website: "https://cube.dev",
        github: "https://github.com/cube-js/cube",
        license: "Apache-2.0",
        mcpSupport: true,
        cliSupport: true,
        agentSkills: ["query", "metric-discover", "semantic-query"],
      },
      {
        name: "dbt Semantic Layer",
        slug: "dbt-semantic-layer",
        description:
          "MetricFlow-powered semantic layer integrated into the dbt ecosystem for governed metrics.",
        website: "https://www.getdbt.com/product/semantic-layer",
        license: "Apache-2.0",
        mcpSupport: true,
        cliSupport: true,
        agentSkills: ["metric-query", "dimension-browse"],
      },
      {
        name: "MetriQL",
        slug: "metriql",
        description:
          "Open-source metric store that centralizes metric definitions for analytics tools.",
        website: "https://metriql.com",
        github: "https://github.com/metriql/metriql",
        license: "Apache-2.0",
        mcpSupport: false,
        cliSupport: true,
        agentSkills: ["metric-query"],
      },
    ],
  },
  {
    title: "ETL & ELT Tools",
    slug: "etl-elt-tools",
    description:
      "Data integration and transformation tools that move and shape data across the modern stack.",
    icon: "etl",
    tools: [
      {
        name: "Airbyte",
        slug: "airbyte",
        description:
          "Open-source data integration platform with 300+ connectors for ELT pipelines.",
        website: "https://airbyte.com",
        github: "https://github.com/airbytehq/airbyte",
        license: "MIT",
        mcpSupport: true,
        cliSupport: true,
        agentSkills: ["sync-trigger", "connector-manage", "status-check"],
      },
      {
        name: "dbt",
        slug: "dbt",
        description:
          "SQL-first transformation workflow that enables analytics engineers to transform data in the warehouse.",
        website: "https://www.getdbt.com",
        github: "https://github.com/dbt-labs/dbt-core",
        license: "Apache-2.0",
        mcpSupport: true,
        cliSupport: true,
        agentSkills: ["model-run", "test", "docs-generate", "lineage"],
      },
      {
        name: "Apache Flink",
        slug: "apache-flink",
        description:
          "Stream processing framework for real-time data pipelines and event-driven applications.",
        website: "https://flink.apache.org",
        github: "https://github.com/apache/flink",
        license: "Apache-2.0",
        mcpSupport: false,
        cliSupport: true,
        agentSkills: ["job-submit", "job-monitor"],
      },
      {
        name: "Dagster",
        slug: "dagster",
        description:
          "Cloud-native data orchestrator with software-defined assets and built-in observability.",
        website: "https://dagster.io",
        github: "https://github.com/dagster-io/dagster",
        license: "Apache-2.0",
        mcpSupport: true,
        cliSupport: true,
        agentSkills: ["asset-materialize", "pipeline-run", "sensor-manage"],
      },
    ],
  },
  {
    title: "BI Tools",
    slug: "bi-tools",
    description:
      "Open-source business intelligence platforms for data visualization, dashboards, and exploration.",
    icon: "bi",
    tools: [
      {
        name: "Apache Superset",
        slug: "apache-superset",
        description:
          "Modern data exploration and visualization platform with rich charting capabilities.",
        website: "https://superset.apache.org",
        github: "https://github.com/apache/superset",
        license: "Apache-2.0",
        mcpSupport: true,
        cliSupport: true,
        agentSkills: ["chart-create", "dashboard-query", "data-explore"],
      },
      {
        name: "Metabase",
        slug: "metabase",
        description:
          "Simple and powerful analytics tool that lets anyone ask questions and learn from data.",
        website: "https://www.metabase.com",
        github: "https://github.com/metabase/metabase",
        license: "AGPL-3.0",
        mcpSupport: true,
        cliSupport: false,
        agentSkills: ["question-create", "dashboard-query"],
      },
      {
        name: "Redash",
        slug: "redash",
        description:
          "Query and visualize data with shareable dashboards and collaborative data exploration.",
        website: "https://redash.io",
        github: "https://github.com/getredash/redash",
        license: "BSD-2-Clause",
        mcpSupport: false,
        cliSupport: true,
        agentSkills: ["query", "dashboard-query"],
      },
      {
        name: "Lightdash",
        slug: "lightdash",
        description:
          "Open-source BI tool built for dbt users, enabling self-serve analytics from dbt models.",
        website: "https://www.lightdash.com",
        github: "https://github.com/lightdash/lightdash",
        license: "MIT",
        mcpSupport: false,
        cliSupport: true,
        agentSkills: ["chart-create", "metric-explore"],
      },
    ],
  },
  {
    title: "Data Agents",
    slug: "data-agents",
    description:
      "Agent frameworks and implementations that bring autonomous capabilities to data engineering and analytics workflows.",
    icon: "agent",
    tools: [
      {
        name: "DatusAI",
        slug: "datusai",
        description:
          "AI-native data agent platform that automates data engineering tasks with intelligent planning and execution.",
        website: "https://datus.ai",
        license: "Commercial",
        mcpSupport: true,
        cliSupport: true,
        agentSkills: ["data-pipeline", "query-generation", "schema-discovery", "data-quality"],
      },
      {
        name: "WrenAI",
        slug: "wrenai",
        description:
          "Open-source text-to-SQL AI agent that understands your data semantics and generates accurate queries.",
        website: "https://www.getwren.ai",
        github: "https://github.com/Canner/WrenAI",
        license: "AGPL-3.0",
        mcpSupport: true,
        cliSupport: true,
        agentSkills: ["text-to-sql", "semantic-model", "data-explore", "chart-generate"],
      },
      {
        name: "LangChain",
        slug: "langchain",
        description:
          "Framework for building applications with LLMs through composable tools and chains.",
        website: "https://www.langchain.com",
        github: "https://github.com/langchain-ai/langchain",
        license: "MIT",
        mcpSupport: true,
        cliSupport: true,
        agentSkills: ["chain-build", "tool-use", "retrieval"],
      },
      {
        name: "CrewAI",
        slug: "crewai",
        description:
          "Framework for orchestrating autonomous AI agents that work together on complex tasks.",
        website: "https://www.crewai.com",
        github: "https://github.com/crewAIInc/crewAI",
        license: "MIT",
        mcpSupport: true,
        cliSupport: true,
        agentSkills: ["agent-orchestrate", "task-delegate", "tool-use"],
      },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}
