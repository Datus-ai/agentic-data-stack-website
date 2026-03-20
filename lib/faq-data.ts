/**
 * FAQ data for different pages
 * Used for both UI rendering and Schema.org structured data
 */

export interface FAQItem {
  question: string;
  answer: string;
}

// Homepage FAQ
export const homepageFAQ: FAQItem[] = [
  {
    question: "What is an agentic data stack?",
    answer: "An agentic data stack is a data architecture designed for AI agents to autonomously build, query, and optimize data pipelines. It includes MCP-enabled catalogs, versioned lake formats, API-first SQL engines, and intelligent orchestration tools that agents can interact with programmatically.",
  },
  {
    question: "How is an agentic data stack different from a traditional data stack?",
    answer: "Traditional data stacks require human data engineers to manually configure pipelines. Agentic data stacks provide API-first interfaces, declarative configurations, and self-service capabilities that allow AI agents to autonomously discover data, build transformations, and optimize queries without human intervention.",
  },
  {
    question: "What are the key components of an agentic data stack?",
    answer: "An agentic data stack typically consists of: (1) MCP-enabled catalog services for metadata discovery, (2) versioned lake formats like Apache Iceberg or Delta Lake for time-travel and rollback, (3) API-first SQL engines like Trino or DuckDB, (4) semantic layers for business logic abstraction, (5) declarative ETL/ELT tools, and (6) data agents for autonomous operations.",
  },
  {
    question: "Are agentic data stack tools free and open source?",
    answer: "Yes, most agentic data stack components are open-source and free to use. This includes Apache Iceberg, Delta Lake, DuckDB, Trino, dbt, Airbyte, Apache Airflow, Unity Catalog, Apache Superset, and many more. We maintain a directory of 27+ free tools across 8 categories.",
  },
  {
    question: "Who should use an agentic data stack?",
    answer: "Agentic data stacks are ideal for data engineering teams building AI-powered analytics, organizations deploying autonomous data pipelines, and companies looking to reduce manual data engineering work through intelligent automation. Both startups and enterprises can benefit from agentic architecture patterns.",
  },
];

// Resources page FAQ
export const resourcesFAQ: FAQItem[] = [
  {
    question: "What tools are included in the agentic data stack directory?",
    answer: "We catalog 27+ open-source tools across 8 categories: Catalog Services (Unity Catalog, Apache Polaris, Gravitino), Lake Formats (Apache Iceberg, Delta Lake, Apache Hudi), SQL Engines (Trino, DuckDB, Apache Spark), Semantic Layers (Cube, dbt Semantic Layer), ETL/ELT Tools (Airbyte, dbt, Apache Flink), BI Tools (Apache Superset, Metabase), Schedulers (Apache Airflow, Dagster), and Data Agents (DatusAI, WrenAI).",
  },
  {
    question: "How do I choose the right tools for my agentic data stack?",
    answer: "Use our 6-Principle Evaluation Framework to assess tools: (1) API-First Design - programmatic access for agents, (2) Declarative Configuration - YAML/JSON over imperative code, (3) Semantic Awareness - business logic understanding, (4) Versioning & Time-Travel - rollback capabilities, (5) Observable & Explainable - audit trails for agent actions, and (6) Self-Service Ready - minimal human intervention required.",
  },
  {
    question: "Are these tools production-ready?",
    answer: "Yes, all tools in our directory are production-grade and battle-tested. Tools like Apache Iceberg, Trino, dbt, and Airbyte are used by thousands of companies including Netflix, Uber, Apple, and Airbnb. We focus on mature projects with active communities, not experimental frameworks.",
  },
  {
    question: "Can I use these tools with cloud data warehouses like Snowflake or BigQuery?",
    answer: "Absolutely. Most tools support hybrid architectures. For example, Trino and DuckDB can query Snowflake/BigQuery directly, Apache Iceberg works with S3/GCS/ADLS, and dbt supports 30+ data platforms. You can mix cloud-native services with open-source components based on your needs.",
  },
  {
    question: "How do I get started building an agentic data stack?",
    answer: "Start with three core components: (1) Choose a lake format (Apache Iceberg or Delta Lake) for versioned storage, (2) Set up a catalog service (Unity Catalog or Apache Polaris) for metadata management, and (3) Deploy a SQL engine (Trino or DuckDB) for flexible querying. Then layer on transformation tools (dbt), orchestration (Airflow), and data agents as your needs grow.",
  },
];

// Blog page FAQ (optional, can be added later)
export const blogFAQ: FAQItem[] = [
  {
    question: "What topics does the Agentic Data Stack blog cover?",
    answer: "Our blog focuses on agentic data architecture patterns, evaluation frameworks for AI-ready data tools, real-world implementation case studies, and best practices for building autonomous data pipelines. We publish deep technical content for data engineers and architects.",
  },
  {
    question: "How often is new content published?",
    answer: "We publish in-depth technical articles bi-weekly, covering architecture patterns, tool comparisons, and hands-on tutorials. We prioritize quality over frequency, ensuring each article provides actionable insights for production environments.",
  },
];
