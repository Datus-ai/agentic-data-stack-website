export const categoryZh: Record<
  string,
  { title: string; description: string }
> = {
  "catalog-service": {
    title: "目录服务",
    description:
      "统一治理、发现元数据，让不同湖仓引擎与表格式互操作，为 Agent 提供数据上下文。",
  },
  "lake-format": {
    title: "湖表格式",
    description:
      "通过表快照、事务、版本与时间旅行，为 Agent 的安全迭代和数据恢复提供基础。",
  },
  "sql-engine": {
    title: "SQL 引擎",
    description:
      "连接数据源与分析任务，支持从本地探索到大规模分布式查询的执行需求。",
  },
  "semantic-layer": {
    title: "语义层",
    description:
      "统一业务指标与定义，让 Agent 理解业务含义，生成一致、可治理的分析结果。",
  },
  "etl-elt-tools": {
    title: "ETL / ELT 工具",
    description: "接入、转换与处理数据，构建可编排、可验证的数据流水线。",
  },
  "bi-tools": {
    title: "BI 与分析工具",
    description: "通过数据探索、可视化与仪表盘，让分析结果可理解、可分享。",
  },
  "data-agents": {
    title: "Data Agents",
    description:
      "使用大模型、规划、工具与上下文能力，完成数据开发、查询与分析任务。",
  },
  scheduler: {
    title: "调度与编排",
    description:
      "定义任务依赖、安排执行与监控工作流，连接 Agent 与现有数据生产流程。",
  },
  "graph-database": {
    title: "图数据库",
    description:
      "建模实体与关系，为知识图谱、GraphRAG、语义上下文和关联分析提供基础。",
  },
};
export const componentZh: Record<string, string> = {
  "apache-polaris":
    "Apache Iceberg 的开源目录，提供基于 REST 的跨引擎互操作能力。",
  "unity-catalog": "面向数据与 AI 的开源统一目录，支持多格式、多引擎治理。",
  gravitino: "统一多种数据源元数据的高性能元数据湖，服务数据与 AI 应用。",
  "hive-metastore": "Hadoop 生态的基础元数据服务，广泛用于表和 Schema 管理。",
  "apache-iceberg": "面向大规模分析数据集的开放表格式，支持分支与时间旅行。",
  "delta-lake": "为数据湖提供可靠性与性能的开放存储框架。",
  "apache-hudi": "支持增量处理与记录级更新的流式数据湖仓平台。",
  "apache-paimon": "支持高速摄入与变更日志跟踪的流式数据湖平台。",
  trino: "面向大数据分析的分布式 SQL 引擎，可联邦查询多种数据源。",
  duckdb: "进程内 SQL OLAP 数据库，适合 Agent 的本地分析与数据处理。",
  "apache-spark": "统一的大规模数据处理引擎，覆盖 SQL、流处理与机器学习。",
  starrocks: "面向大规模实时与批量分析的高性能分析数据库。",
  clickhouse: "面向 PB 级实时分析的高性能列式 OLAP 数据库。",
  cube: "提供一致指标、支持构建数据应用的通用语义层。",
  "dbt-semantic-layer": "集成 dbt 生态、由 MetricFlow 驱动的治理型指标语义层。",
  airbyte: "开源数据集成平台，为 ELT 流水线提供丰富连接器。",
  dbt: "以 SQL 为核心的转换工作流，让分析工程师在数仓中构建数据模型。",
  "apache-flink": "面向实时流水线与事件驱动应用的流处理框架。",
  "apache-superset": "支持丰富图表的数据探索与可视化平台。",
  metabase: "易用的分析工具，帮助团队提出问题并从数据中获得洞察。",
  redash: "通过可分享仪表盘与协作式探索查询和可视化数据。",
  lightdash: "面向 dbt 用户的开源 BI 工具，基于 dbt 模型提供自助分析。",
  datusai: "通过智能规划与执行自动化数据工程任务的 AI 原生 Data Agent 平台。",
  wrenai: "理解数据语义并生成查询的开源 Text-to-SQL AI Agent。",
  langchain: "通过可组合工具与链构建大模型应用的框架。",
  crewai: "编排多个自主 AI Agent 协作完成复杂任务的框架。",
  "apache-airflow": "通过代码定义、调度和监控工作流的平台。",
  dagster: "采用软件定义资产并内置可观测性的云原生数据编排工具。",
  neo4j: "原生图数据库，提供 Cypher、向量搜索与成熟的 GraphRAG 生态。",
  tigergraph:
    "面向实时深层关联分析的分布式并行图数据库，提供 GSQL 与向量搜索。",
  puppygraph:
    "零 ETL 图查询引擎，使用 openCypher 和 Gremlin 直接查询现有湖仓、数仓与关系数据库。",
  nebulagraph:
    "采用 Shared-nothing 架构的开源分布式图数据库，面向超大规模图与毫秒级查询。",
};
