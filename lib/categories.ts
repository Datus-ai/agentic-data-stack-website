export interface ExternalLink {
  title: string;
  url: string;
  description: string;
}

export interface AgentSkill {
  name: string;
  url: string;
}

export interface ToolInfo {
  name: string;
  slug: string;
  description: string;
  website?: string;
  github?: string;
  license?: string;
  docsUrl?: string;
  mcpSupport?: boolean;
  mcpServerUrl?: string;
  cliSupport?: boolean;
  cliName?: string;
  cliDocsUrl?: string;
  cliInstall?: string;
  agentSkills?: AgentSkill[];
  mainFeatures?: string[];
  externalLinks?: ExternalLink[];
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
        docsUrl: "https://polaris.apache.org/",
        mcpSupport: true,
        mcpServerUrl: "https://github.com/apache/polaris-tools",
        cliSupport: true,
        cliName: "polaris",
        cliDocsUrl:
          "https://polaris.apache.org/releases/1.1.0/command-line-interface/",
        cliInstall: "brew install apache-polaris",
        agentSkills: [
          { name: "polaris-catalog", url: "https://skills.rest/skill/polaris-catalog" },
        ],
        mainFeatures: [
          "Iceberg REST catalog implementing the Iceberg REST API for multi-engine interoperability",
          "Multi-cloud storage support: AWS S3, Azure Storage, Google Cloud Storage, MinIO",
          "Role-based access control (RBAC) with hierarchical privilege management",
          "Catalog federation with external Iceberg REST catalogs and Hive Metastore",
          "Open Policy Agent (OPA) integration for external authorization",
          "Credential vending and automated credential rotation",
          "Generic Tables support for cataloging non-Iceberg table formats",
          "Production deployment via Kubernetes Helm charts with Prometheus and Jaeger telemetry",
        ],
        externalLinks: [
          {
            title: "Polaris MCP Server Documentation",
            url: "https://polaris.apache.org/tools/polaris-mcp-server/",
            description:
              "Official docs for the Python MCP server that wraps Polaris REST APIs for agent/IDE integration",
          },
          {
            title: "REST API Specs",
            url: "https://polaris.apache.org/in-dev/unreleased/polaris-api-specs/",
            description:
              "OpenAPI specs for catalog, namespace, table, principal, and policy management",
          },
          {
            title: "CLI Reference",
            url: "https://polaris.apache.org/releases/1.1.0/command-line-interface/",
            description:
              "CLI docs for managing catalogs, principals, roles, and privileges",
          },
          {
            title: "Apache Polaris GitHub",
            url: "https://github.com/apache/polaris",
            description:
              "Main source repo for the Iceberg REST catalog implementation",
          },
          {
            title: "Polaris Tools Repository",
            url: "https://github.com/apache/polaris-tools",
            description:
              "Tooling repo containing the MCP server, benchmarks, and Iceberg catalog migrator",
          },
        ],
      },
      {
        name: "Unity Catalog",
        slug: "unity-catalog",
        description:
          "Open-source universal catalog for data and AI, supporting multi-format and multi-engine governance.",
        website: "https://www.unitycatalog.io",
        github: "https://github.com/unitycatalog/unitycatalog",
        license: "Apache-2.0",
        docsUrl: "https://docs.unitycatalog.io/",
        mcpSupport: true,
        mcpServerUrl: "https://github.com/databrickslabs/mcp",
        cliSupport: true,
        cliName: "bin/uc",
        cliDocsUrl: "https://docs.unitycatalog.io/usage/cli/",
        cliInstall: "Build from source with sbt (JDK 17): sbt createTarball",
        agentSkills: [],
        mainFeatures: [
          "Universal open-source catalog for data and AI governance (LF AI & Data)",
          "Multimodal asset management: tables, volumes, functions, and ML/AI models",
          "Multi-format support: Delta Lake, Apache Iceberg (UniForm), Parquet, CSV, JSON",
          "Interoperability with Iceberg REST Catalog and Hive Metastore interface",
          "Broad engine support: Spark, Trino, DuckDB, Daft, PuppyGraph, StarRocks",
          "Built-in user management with access control and token-based authentication",
          "Unified three-level namespace (catalog.schema.object) for all asset types",
          "Open API spec with Apache 2.0 license for vendor-neutral extensibility",
        ],
        externalLinks: [
          {
            title: "Unity Catalog AI Integrations",
            url: "https://docs.unitycatalog.io/ai/integrations/",
            description:
              "Official docs for LangChain, Anthropic, OpenAI, LlamaIndex, CrewAI agent integrations",
          },
          {
            title: "Databricks Labs MCP Server",
            url: "https://github.com/databrickslabs/mcp",
            description:
              "Official Databricks MCP server exposing UC Functions, Vector Search, and Genie spaces",
          },
          {
            title: "CLI Documentation",
            url: "https://docs.unitycatalog.io/usage/cli/",
            description:
              "CLI reference for managing catalogs, schemas, tables, volumes, and functions",
          },
          {
            title: "Databricks REST API - Catalogs",
            url: "https://docs.databricks.com/api/workspace/catalogs",
            description:
              "REST API reference for Unity Catalog workspace operations",
          },
          {
            title: "Unity Catalog GitHub",
            url: "https://github.com/unitycatalog/unitycatalog",
            description:
              "Main OSS repo — open multi-modal catalog for Data and AI",
          },
        ],
      },
      {
        name: "Gravitino",
        slug: "gravitino",
        description:
          "High-performance metadata lake that unifies metadata from diverse sources for data and AI.",
        website: "https://gravitino.apache.org",
        github: "https://github.com/apache/gravitino",
        license: "Apache-2.0",
        docsUrl: "https://gravitino.apache.org/",
        mcpSupport: true,
        mcpServerUrl: "https://github.com/datastrato/mcp-server-gravitino",
        cliSupport: true,
        cliName: "gcli.sh",
        cliDocsUrl: "https://gravitino.apache.org/docs/next/cli/",
        cliInstall:
          "Download binary tarball from GitHub releases and extract",
        agentSkills: [],
        mainFeatures: [
          "Federated metadata lake acting as a 'Catalog of Catalogs' for unified metadata",
          "Multi-catalog support: Hive, Iceberg, MySQL, PostgreSQL, Kafka, Doris, Paimon, Hudi",
          "Unified Role-Based Access Control (RBAC) with granular privileges",
          "Tag-based data governance for metadata classification and discovery",
          "Model Catalog for managing ML models with version tracking and aliases",
          "MCP Server integration for connecting AI agents with data context",
          "Metadata-driven actions framework for policies and automated job execution",
          "Geo-distributed architecture for managing metadata across multiple cloud providers",
        ],
        externalLinks: [
          {
            title: "Gravitino MCP Server",
            url: "https://github.com/datastrato/mcp-server-gravitino",
            description:
              "Official MCP server with tools for catalogs, schemas, tables, tags, roles, and models",
          },
          {
            title: "CLI Documentation",
            url: "https://gravitino.apache.org/docs/next/cli/",
            description:
              "CLI reference (gcli.sh) for managing metalakes, catalogs, schemas, tables, tags, and roles",
          },
          {
            title: "Apache Gravitino GitHub",
            url: "https://github.com/apache/gravitino",
            description: "Main source repo for the federated metadata lake",
          },
          {
            title: "Building a Universal Data Agent with LlamaIndex + Gravitino",
            url: "https://medium.com/datastrato/building-a-universal-data-agent-in-15-minutes-with-llamaindex-and-apache-gravitino-incubating-401ea24a3b39",
            description:
              "Guide for building AI data agents using Gravitino as the metadata layer",
          },
          {
            title: "MCP Server Announcement",
            url: "https://datastrato.medium.com/announcing-the-apache-gravitino-mcp-server-secure-context-aware-metadata-management-for-ai-agents-a73f6a608ab0",
            description:
              "Blog post explaining MCP server architecture, capabilities, and AI agent use cases",
          },
        ],
      },
      {
        name: "Hive Metastore",
        slug: "hive-metastore",
        description:
          "The foundational metadata service for Hadoop ecosystem, still widely used for table and schema management.",
        website: "https://hive.apache.org",
        github: "https://github.com/apache/hive",
        license: "Apache-2.0",
        docsUrl: "https://hive.apache.org/",
        mcpSupport: false,
        cliSupport: true,
        cliName: "schematool / beeline",
        cliDocsUrl:
          "https://cwiki.apache.org/confluence/display/Hive/Hive+Schema+Tool",
        cliInstall:
          "Download Apache Hive binary tarball, set HIVE_HOME, run schematool -initSchema",
        agentSkills: [],
        mainFeatures: [
          "Central metadata repository via Thrift interface for tables, partitions, databases, and functions",
          "Industry-standard metastore protocol supported by Spark, Trino, Presto, Impala",
          "Standalone metastore mode for running independently of the full Hive execution engine",
          "RDBMS-backed persistence via DataNucleus ORM (Derby, MySQL, PostgreSQL, Oracle)",
          "High availability through stateless architecture with multiple metastore instances",
          "Schema management tooling (schematool) for initialization and upgrades",
          "Bulk metadata operations (metatool) for NameNode migration and JDOQL queries",
          "Multi-catalog support (Hive 3.0+) for logical metadata separation",
        ],
        externalLinks: [
          {
            title: "Metastore Administration Guide",
            url: "https://hive.apache.org/docs/latest/admin/adminmanual-metastore-administration/",
            description:
              "Official admin docs for deploying, configuring, and managing the Hive Metastore service",
          },
          {
            title: "Apache Hive GitHub",
            url: "https://github.com/apache/hive",
            description:
              "Main source repo including standalone metastore server and Thrift API definitions",
          },
          {
            title: "Thrift API Definition",
            url: "https://github.com/apache/hive/blob/master/standalone-metastore/metastore-common/src/main/thrift/hive_metastore.thrift",
            description:
              "The Thrift IDL file defining all metastore API operations",
          },
          {
            title: "PyHive — Python Interface",
            url: "https://github.com/dropbox/PyHive",
            description:
              "Python DB-API and SQLAlchemy interface for Hive by Dropbox",
          },
          {
            title: "AWS Glue Data Catalog Client for HMS",
            url: "https://github.com/awslabs/aws-glue-data-catalog-client-for-apache-hive-metastore",
            description:
              "AWS open-source client enabling Glue Data Catalog as a drop-in HMS replacement",
          },
        ],
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
        docsUrl: "https://iceberg.apache.org/docs/latest/",
        mcpSupport: true,
        mcpServerUrl: "https://github.com/cloudera/iceberg-mcp-server",
        cliSupport: true,
        cliName: "pyiceberg",
        cliDocsUrl: "https://py.iceberg.apache.org/cli/",
        cliInstall: 'pip install "pyiceberg[cli]"',
        agentSkills: [],
        mainFeatures: [
          "ACID transactions on cloud object storage ensuring data integrity",
          "Schema evolution without table rewrites (add, rename, reorder columns)",
          "Hidden partitioning that decouples physical layout from query filters",
          "Time travel and version rollback for reproducible queries and recovery",
          "Multi-engine compatibility (Spark, Trino, Flink, Presto, Hive, Impala)",
          "Partition evolution allowing partition schemes to change without rewriting data",
          "Scalable metadata handling for tables with tens of petabytes of data",
          "File-level statistics enabling query engines to skip irrelevant data files",
        ],
        externalLinks: [
          {
            title: "Cloudera Iceberg MCP Server",
            url: "https://github.com/cloudera/iceberg-mcp-server",
            description:
              "MCP server providing read-only access to Iceberg tables via Impala with LangChain/OpenAI SDK integration",
          },
          {
            title: "REST Catalog Spec",
            url: "https://iceberg.apache.org/rest-catalog-spec/",
            description:
              "Official REST API specification for Iceberg catalogs — the standardized API agents use",
          },
          {
            title: "PyIceberg (Python SDK)",
            url: "https://github.com/apache/iceberg-python",
            description:
              "Native Python library for programmatic access to Iceberg table metadata and data, no Spark/JVM required",
          },
          {
            title: "Awesome Apache Iceberg",
            url: "https://github.com/zriyansh/awesome-apache-iceberg",
            description:
              "Curated list of Apache Iceberg resources, tools, and ecosystem projects",
          },
          {
            title: "Branching and Tagging Docs",
            url: "https://iceberg.apache.org/docs/latest/branching/",
            description:
              "Documentation for git-like branching, tagging, and fast-forward merge on Iceberg tables",
          },
        ],
      },
      {
        name: "Delta Lake",
        slug: "delta-lake",
        description:
          "Open storage framework that brings reliability and performance to data lakes.",
        website: "https://delta.io",
        github: "https://github.com/delta-io/delta",
        license: "Apache-2.0",
        docsUrl: "https://docs.delta.io/latest/",
        mcpSupport: true,
        mcpServerUrl: "https://github.com/databrickslabs/mcp",
        cliSupport: true,
        cliName: "spark-sql / deltalake (Python)",
        cliDocsUrl: "https://delta-io.github.io/delta-rs/",
        cliInstall: "pip install deltalake",
        agentSkills: [],
        mainFeatures: [
          "ACID transactions with optimistic concurrency control on object storage",
          "Schema enforcement on write and schema evolution support",
          "Time travel and data versioning for auditing, rollbacks, and reproducibility",
          "Unified batch and streaming processing on the same tables",
          "MERGE/UPDATE/DELETE operations (upserts) for incremental data management",
          "Broad engine support (Spark, Flink, Trino, Presto, Hive, Athena, Snowflake, BigQuery)",
          "Small file compaction and Z-Order indexing for query performance",
          "Change Data Feed for capturing row-level changes between table versions",
        ],
        externalLinks: [
          {
            title: "Databricks Labs MCP Server",
            url: "https://github.com/databrickslabs/mcp",
            description:
              "Official Databricks MCP server exposing Unity Catalog including Delta tables, vector search, and Genie",
          },
          {
            title: "delta-rs (Rust/Python SDK)",
            url: "https://github.com/delta-io/delta-rs",
            description:
              "Native Rust library with Python bindings for Delta Lake — no Spark required, ideal for lightweight agent access",
          },
          {
            title: "Python API Reference",
            url: "https://delta-io.github.io/delta-rs/python/api_reference.html",
            description:
              "Complete Python API docs for the deltalake package (read, write, optimize, vacuum, time-travel)",
          },
          {
            title: "Databricks MCP Documentation",
            url: "https://docs.databricks.com/aws/en/generative-ai/mcp/",
            description:
              "Official Databricks docs on hosting and using MCP servers with Unity Catalog permissions",
          },
          {
            title: "Awesome Lakehouse Guide",
            url: "https://github.com/dipankarmazumdar/awesome-lakehouse-guide",
            description:
              "Curated repo covering open table formats and lakehouse architecture",
          },
        ],
      },
      {
        name: "Apache Hudi",
        slug: "apache-hudi",
        description:
          "Streaming data lakehouse platform with incremental processing and record-level updates.",
        website: "https://hudi.apache.org",
        github: "https://github.com/apache/hudi",
        license: "Apache-2.0",
        docsUrl: "https://hudi.apache.org/docs/overview/",
        mcpSupport: false,
        cliSupport: true,
        cliName: "hudi-cli",
        cliDocsUrl: "https://hudi.apache.org/docs/cli/",
        cliInstall:
          "Download hudi-cli-bundle JAR and hudi-cli-with-bundle.sh from Maven/GitHub",
        agentSkills: [],
        mainFeatures: [
          "ACID transactions with record-level upserts and deletes on data lakes",
          "Two table types: Copy-on-Write (read-optimized) and Merge-on-Read (write-optimized)",
          "Incremental and snapshot queries plus Change Data Capture query support",
          "Built-in DeltaStreamer ingestion tool for Kafka, DFS, and database CDC sources",
          "Advanced indexing (bloom filters, HFile, bucket index) for fast record lookups",
          "Automatic file sizing, clustering, and compaction for performance optimization",
          "Multi-engine compatibility (Spark, Flink, Presto, Trino, Hive)",
          "Comprehensive admin CLI with 40+ commands for table management and diagnostics",
        ],
        externalLinks: [
          {
            title: "Apache Hudi GitHub",
            url: "https://github.com/apache/hudi",
            description:
              "Main repository — upserts, deletes, and incremental processing on big data",
          },
          {
            title: "hudi-rs (Rust/Python SDK)",
            url: "https://github.com/apache/hudi-rs",
            description:
              "Native Rust implementation with Python bindings for reading Hudi tables without Spark/JVM",
          },
          {
            title: "CLI Documentation",
            url: "https://hudi.apache.org/docs/cli/",
            description:
              "Official docs for the Hudi CLI tool for table management, inspection, and maintenance",
          },
          {
            title: "Python/Rust Quick Start",
            url: "https://hudi.apache.org/docs/python-rust-quick-start-guide/",
            description:
              "Getting started guide for the native Python binding based on hudi-rs",
          },
          {
            title: "Awesome Lakehouse Guide",
            url: "https://github.com/dipankarmazumdar/awesome-lakehouse-guide",
            description:
              "Curated repo covering open table formats including Hudi architecture",
          },
        ],
      },
      {
        name: "Apache Paimon",
        slug: "apache-paimon",
        description:
          "Streaming data lake platform supporting high-speed ingestion and changelog tracking.",
        website: "https://paimon.apache.org",
        github: "https://github.com/apache/paimon",
        license: "Apache-2.0",
        docsUrl: "https://paimon.apache.org/docs/master/",
        mcpSupport: false,
        cliSupport: true,
        cliName: "Flink Action JARs / Spark CALL",
        cliDocsUrl:
          "https://paimon.apache.org/docs/master/flink/action-jars/",
        cliInstall:
          "Download paimon-flink-action JAR from Maven Central",
        agentSkills: [],
        mainFeatures: [
          "Real-time streaming updates via LSM-tree structure with sub-minute query latency",
          "Flexible merge engines (deduplicate, partial-update, aggregate, first-row)",
          "Unified batch and streaming read/write with automatic changelog generation",
          "Primary key tables for upserts and append-only tables for ordered stream reads",
          "Full schema evolution support (add, rename, reorder columns)",
          "Native Flink CDC integration for MySQL, PostgreSQL, MongoDB change capture",
          "Multi-engine read support (Spark, Flink, StarRocks, Doris, Hive, Trino)",
          "Branch and tag management for table versioning and data experimentation",
        ],
        externalLinks: [
          {
            title: "Apache Paimon GitHub",
            url: "https://github.com/apache/paimon",
            description:
              "Main repository — lake format for Realtime Lakehouse Architecture with Flink and Spark",
          },
          {
            title: "REST Catalog Overview",
            url: "https://paimon.apache.org/docs/master/concepts/rest/overview/",
            description:
              "REST API documentation for Paimon's catalog service — the primary programmatic access point",
          },
          {
            title: "PyPaimon (Python SDK)",
            url: "https://github.com/apache/paimon-python",
            description:
              "Pure Python implementation for Paimon catalog access, reading and writing tables without JDK",
          },
          {
            title: "Changelog Producer Docs",
            url: "https://paimon.apache.org/docs/master/primary-key-table/changelog-producer/",
            description:
              "Documentation for changelog streaming modes (input, lookup, full-compaction)",
          },
          {
            title: "Python API Docs",
            url: "https://paimon.apache.org/docs/master/program-api/python-api/",
            description:
              "Official Python API documentation with catalog, read, and write interfaces",
          },
        ],
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
        docsUrl: "https://trino.io/docs/current/index.html",
        mcpSupport: true,
        mcpServerUrl: "https://github.com/tuannvm/mcp-trino",
        cliSupport: true,
        cliName: "trino",
        cliDocsUrl: "https://trino.io/docs/current/client/cli.html",
        cliInstall: "brew install trino",
        agentSkills: [],
        mainFeatures: [
          "Distributed massively parallel processing (MPP) SQL query engine for interactive analytics",
          "Federated querying across heterogeneous data sources in a single query",
          "ANSI SQL compliant with complex queries, joins, window functions, and subqueries",
          "Connector architecture with 30+ connectors (Hive, Iceberg, Delta, PostgreSQL, MongoDB, Kafka)",
          "Separation of compute and storage — queries data in place without ETL",
          "Cost-based query optimizer with predicate pushdown and join reordering",
          "Dynamic scaling with coordinator/worker architecture",
          "Built-in AI functions (ai_gen, ai_classify, ai_analyze_sentiment) for LLM invocation from SQL",
        ],
        externalLinks: [
          {
            title: "Trino MCP Server (Go)",
            url: "https://github.com/tuannvm/mcp-trino",
            description:
              "Community MCP server supporting execute_query, list_catalogs, list_schemas, list_tables, get_table_schema",
          },
          {
            title: "AI Functions Documentation",
            url: "https://trino.io/docs/current/functions/ai.html",
            description:
              "Built-in AI functions that invoke external LLMs directly from SQL queries",
          },
          {
            title: "CLI Documentation",
            url: "https://trino.io/docs/current/client/cli.html",
            description:
              "Official command line interface reference for interactive SQL queries",
          },
          {
            title: "Client REST API",
            url: "https://trino.io/docs/current/develop/client-protocol.html",
            description:
              "REST API documentation for submitting SQL queries and receiving results programmatically",
          },
          {
            title: "Trino Python Client",
            url: "https://github.com/trinodb/trino-python-client",
            description:
              "Official Python client with DBAPI 2.0 and SQLAlchemy adapter",
          },
        ],
      },
      {
        name: "DuckDB",
        slug: "duckdb",
        description:
          "In-process SQL OLAP database with excellent agent integration for local analytics.",
        website: "https://duckdb.org",
        github: "https://github.com/duckdb/duckdb",
        license: "MIT",
        docsUrl: "https://duckdb.org/docs/stable/",
        mcpSupport: true,
        mcpServerUrl:
          "https://github.com/motherduckdb/mcp-server-motherduck",
        cliSupport: true,
        cliName: "duckdb",
        cliDocsUrl:
          "https://duckdb.org/docs/stable/clients/cli/overview",
        cliInstall: "brew install duckdb",
        agentSkills: [],
        mainFeatures: [
          "In-process embedded analytical (OLAP) database with zero external dependencies",
          "Columnar-vectorized execution engine optimized for analytical queries on modern CPUs",
          "Native support for reading/writing Parquet, CSV, JSON, Excel, and Apache Arrow formats",
          "Rich SQL dialect with window functions, CTEs, nested types (arrays, structs, maps)",
          "Extension system for S3/HTTP(S) remote file access, spatial data, full-text search",
          "Direct querying of pandas/Polars DataFrames in Python without data copying",
          "Single-file portable binary on Linux, macOS, Windows (x86 and ARM)",
          "Handles terabyte-scale data on a single machine with streaming and multi-core parallelism",
        ],
        externalLinks: [
          {
            title: "MotherDuck MCP Server",
            url: "https://github.com/motherduckdb/mcp-server-motherduck",
            description:
              "Official MCP server for DuckDB and MotherDuck — supports local files, S3, and cloud connections",
          },
          {
            title: "DuckDB MCP Community Extension",
            url: "https://duckdb.org/community_extensions/extensions/duckdb_mcp",
            description:
              "Native DuckDB extension adding MCP client/server capabilities directly inside the database engine",
          },
          {
            title: "CLI Documentation",
            url: "https://duckdb.org/docs/stable/clients/cli/overview",
            description:
              "Official command line client reference with dot commands, autocompletion, and output modes",
          },
          {
            title: "Python API Reference",
            url: "https://duckdb.org/docs/stable/clients/python/reference/",
            description:
              "Official Python client API reference for programmatic DuckDB access",
          },
          {
            title: "Awesome DuckDB",
            url: "https://github.com/davidgasquez/awesome-duckdb",
            description:
              "Curated list of DuckDB resources including AI integrations",
          },
        ],
      },
      {
        name: "Apache Spark",
        slug: "apache-spark",
        description:
          "Unified analytics engine for large-scale data processing with SQL, streaming, and ML.",
        website: "https://spark.apache.org",
        github: "https://github.com/apache/spark",
        license: "Apache-2.0",
        docsUrl: "https://spark.apache.org/docs/latest/",
        mcpSupport: true,
        mcpServerUrl:
          "https://github.com/kubeflow/mcp-apache-spark-history-server",
        cliSupport: true,
        cliName: "spark-sql / spark-submit / pyspark",
        cliDocsUrl:
          "https://spark.apache.org/docs/latest/sql-distributed-sql-engine-spark-sql-cli.html",
        cliInstall: "brew install apache-spark  OR  pip install pyspark",
        agentSkills: [
          { name: "spark-optimization", url: "https://github.com/wshobson/agents/tree/main/plugins/data-engineering/skills/spark-optimization" },
        ],
        mainFeatures: [
          "Unified analytics engine for batch processing, streaming, machine learning, and graph processing",
          "In-memory computation delivering up to 100x faster processing vs disk-based MapReduce",
          "Multi-language APIs in Python, Scala, Java, and R with a pandas-compatible API",
          "Spark SQL engine for structured data processing with full SQL support and DataFrame APIs",
          "Structured Streaming for incremental, fault-tolerant stream processing",
          "MLlib built-in machine learning library with classification, regression, clustering",
          "Deploys on standalone clusters, Hadoop YARN, Kubernetes, or locally",
          "Spark Connect client-server architecture for remote connectivity",
        ],
        externalLinks: [
          {
            title: "Spark History Server MCP (Kubeflow)",
            url: "https://github.com/kubeflow/mcp-apache-spark-history-server",
            description:
              "Official Kubeflow MCP server enabling AI agents to analyze Spark job performance and identify bottlenecks",
          },
          {
            title: "PySpark AI (English SDK for Spark)",
            url: "https://github.com/pyspark-ai/pyspark-ai",
            description:
              "English SDK that compiles natural language instructions into PySpark DataFrames",
          },
          {
            title: "PySpark MCP Server",
            url: "https://github.com/SemyonSinchenko/pyspark-mcp-server",
            description:
              "MCP server for PySpark focused on query optimization using AI systems",
          },
          {
            title: "MLlib Guide",
            url: "https://spark.apache.org/docs/latest/ml-guide.html",
            description:
              "Official ML Pipelines documentation for classification, regression, clustering, and feature engineering",
          },
          {
            title: "Spark Submit Documentation",
            url: "https://spark.apache.org/docs/latest/submitting-applications.html",
            description:
              "CLI reference for spark-submit, the primary interface for launching Spark applications",
          },
        ],
      },
      {
        name: "StarRocks",
        slug: "starrocks",
        description:
          "High-performance analytical database for real-time and batch analytics at scale.",
        website: "https://www.starrocks.io",
        github: "https://github.com/StarRocks/starrocks",
        license: "Apache-2.0",
        docsUrl:
          "https://docs.starrocks.io/docs/introduction/StarRocks_intro/",
        mcpSupport: true,
        mcpServerUrl:
          "https://github.com/StarRocks/mcp-server-starrocks",
        cliSupport: true,
        cliName: "mysql (MySQL-protocol compatible)",
        cliDocsUrl:
          "https://docs.starrocks.io/docs/quick_start/shared-nothing/",
        cliInstall: "brew install mysql-client",
        agentSkills: [],
        mainFeatures: [
          "Sub-second OLAP query engine optimized for real-time, multi-dimensional analytics",
          "Vectorized execution engine with SIMD optimization delivering 3-10x performance gains",
          "Cost-based optimizer (CBO) with cascades framework supporting all 99 TPC-DS queries",
          "Real-time data ingestion with ACID transactions, primary key upserts, and partial updates",
          "Intelligent materialized views that auto-refresh and transparently rewrite queries",
          "Data lake analytics with native connectors for Hive, Iceberg, Delta Lake, and Hudi",
          "Flexible architecture supporting both shared-nothing and storage-compute separation",
          "MySQL protocol compatibility allowing connection from any MySQL client or BI tool",
        ],
        externalLinks: [
          {
            title: "StarRocks MCP Server (Official)",
            url: "https://github.com/StarRocks/mcp-server-starrocks",
            description:
              "Official MCP server with SQL execution, database exploration, Plotly visualization, and caching",
          },
          {
            title: "LangChain Vector Store Integration",
            url: "https://python.langchain.com/docs/integrations/vectorstores/starrocks/",
            description:
              "LangChain integration for using StarRocks as a vector store for semantic search and RAG",
          },
          {
            title: "API Reference",
            url: "https://docs.starrocks.io/docs/category/reference/",
            description:
              "Official SQL reference, function reference, and system configuration documentation",
          },
          {
            title: "StarRocks Python Client",
            url: "https://pypi.org/project/starrocks/",
            description:
              "Python client with SQLAlchemy dialect and Alembic support",
          },
          {
            title: "Integrations",
            url: "https://docs.starrocks.io/docs/integrations/",
            description:
              "Official integrations page covering BI tools, data loading, and orchestration connectors",
          },
        ],
      },
      {
        name: "ClickHouse",
        slug: "clickhouse",
        description:
          "High-performance columnar OLAP database for real-time analytics at petabyte scale.",
        website: "https://clickhouse.com",
        github: "https://github.com/ClickHouse/ClickHouse",
        license: "Apache-2.0",
        docsUrl: "https://clickhouse.com/docs",
        mcpSupport: true,
        mcpServerUrl: "https://github.com/ClickHouse/mcp-clickhouse",
        cliSupport: true,
        cliName: "clickhouse-client",
        cliDocsUrl:
          "https://clickhouse.com/docs/interfaces/cli",
        cliInstall: "curl https://clickhouse.com/ | sh",
        agentSkills: [
          { name: "clickhouse-best-practices", url: "https://github.com/ClickHouse/agent-skills/tree/main/skills/clickhouse-best-practices" },
        ],
        mainFeatures: [
          "Columnar storage with vectorized query execution for sub-second analytical queries",
          "Real-time data ingestion handling millions of rows per second with low latency",
          "Approximate query processing with HyperLogLog, quantiles, and sampling for fast estimates",
          "SQL-compatible interface with extensions for arrays, maps, tuples, and nested data",
          "Materialized views for incremental pre-aggregation and real-time data transformation",
          "Tiered storage with hot/warm/cold data across local SSD, S3, and object storage",
          "Linear horizontal scalability with distributed query execution across shards and replicas",
          "Native integrations with Kafka, S3, PostgreSQL, MySQL, and 50+ data sources",
        ],
        externalLinks: [
          {
            title: "ClickHouse MCP Server (Official)",
            url: "https://github.com/ClickHouse/mcp-clickhouse",
            description:
              "Official MCP server for connecting ClickHouse to AI assistants — SQL execution, schema exploration, chDB support",
          },
          {
            title: "ClickHouse Agent Skills (Official)",
            url: "https://github.com/ClickHouse/agent-skills",
            description:
              "Official agentskills.io skills with 28 best-practice rules for schema design, query optimization, and ingestion",
          },
          {
            title: "MCP Integration Guide",
            url: "https://clickhouse.com/docs/use-cases/AI/MCP",
            description:
              "Official docs for configuring ClickHouse MCP with Claude Desktop, Cursor, and other AI tools",
          },
          {
            title: "ClickHouse Python Client",
            url: "https://github.com/ClickHouse/clickhouse-connect",
            description:
              "Official Python driver for ClickHouse with SQLAlchemy, Apache Superset, and Pandas integration",
          },
          {
            title: "chDB — Embedded ClickHouse",
            url: "https://github.com/chdb-io/chdb",
            description:
              "In-process ClickHouse engine (like DuckDB for ClickHouse) for serverless local analytics",
          },
        ],
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
        docsUrl: "https://cube.dev/docs/product/introduction",
        mcpSupport: true,
        mcpServerUrl: "https://github.com/cubedevinc/cube-mcp-server",
        cliSupport: true,
        cliName: "cubejs-cli",
        cliDocsUrl:
          "https://cube.dev/docs/product/administration/workspace/cli/reference",
        cliInstall: "npx cubejs-cli <command>  OR  npm install -g cubejs-cli",
        agentSkills: [],
        mainFeatures: [
          "Code-first data modeling using YAML or JavaScript with version control integration",
          "Intelligent caching via pre-aggregations in Cube Store for aggregate-aware query acceleration",
          "Multiple API standards: REST, GraphQL, SQL, MDX, and DAX for universal tool interoperability",
          "AI API providing a standard interface for LLM-powered text-to-semantic-layer queries",
          "Comprehensive access control with Python/JavaScript-defined security policies",
          "Semantic SQL architecture (Postgres-compatible with MEASURE function) for AI agents",
          "Dataset-centric design using Cubes and Views as a queryable knowledge graph",
        ],
        externalLinks: [
          {
            title: "Cube MCP Server Documentation",
            url: "https://cube.dev/docs/product/apis-integrations/mcp-server",
            description:
              "Official docs for Cube's MCP server integration covering OAuth, Chat API, and setup",
          },
          {
            title: "REST API Reference",
            url: "https://cube.dev/docs/product/apis-integrations/core-data-apis/rest-api",
            description:
              "REST API docs for programmatic querying of the semantic layer with OpenAPI spec",
          },
          {
            title: "AI API Practical Guide",
            url: "https://cube.dev/blog/a-practical-guide-to-getting-started-with-cubes-ai-api",
            description:
              "Guide to the native AI API for building agents, chatbots, and copilots on top of Cube",
          },
          {
            title: "JavaScript SDK",
            url: "https://cube.dev/docs/product/apis-integrations/javascript-sdk",
            description:
              "Client SDK for building applications that query the Cube semantic layer",
          },
          {
            title: "Community Cube MCP Server",
            url: "https://github.com/isaacwasserman/mcp_cube_server",
            description:
              "Community-built MCP server for interacting with Cube semantic layers",
          },
        ],
      },
      {
        name: "dbt Semantic Layer",
        slug: "dbt-semantic-layer",
        description:
          "MetricFlow-powered semantic layer integrated into the dbt ecosystem for governed metrics.",
        website: "https://www.getdbt.com/product/semantic-layer",
        github: "https://github.com/dbt-labs/dbt-mcp",
        license: "Apache-2.0",
        docsUrl: "https://docs.getdbt.com/docs/use-dbt-semantic-layer/dbt-sl",
        mcpSupport: true,
        mcpServerUrl: "https://github.com/dbt-labs/dbt-mcp",
        cliSupport: true,
        cliName: "dbt sl / mf (MetricFlow)",
        cliDocsUrl:
          "https://docs.getdbt.com/docs/build/metricflow-commands",
        cliInstall: "pip install dbt-metricflow",
        agentSkills: [
          { name: "building-dbt-semantic-layer", url: "https://github.com/dbt-labs/dbt-agent-skills/tree/main/skills/dbt/skills/building-dbt-semantic-layer" },
          { name: "answering-natural-language-questions-with-dbt", url: "https://github.com/dbt-labs/dbt-agent-skills/tree/main/skills/dbt/skills/answering-natural-language-questions-with-dbt" },
        ],
        mainFeatures: [
          "Centralized metric definitions in YAML on top of existing dbt models",
          "MetricFlow-powered SQL generation optimized per data platform",
          "Complex metric types: ratio, expression, cumulative, and derived metrics",
          "Dynamic multi-hop join resolution based on entity keys and semantic model relationships",
          "Result caching and declarative caching for performance optimization",
          "Consistent metric access across all downstream tools organization-wide",
          "Export capabilities to write queries directly to the data platform on a schedule",
          "Robust access control and permissions for secure metric distribution",
        ],
        externalLinks: [
          {
            title: "dbt MCP Server Documentation",
            url: "https://docs.getdbt.com/docs/dbt-ai/about-mcp",
            description:
              "Official docs on the dbt MCP server with 60+ tools across 8 toolset categories",
          },
          {
            title: "Semantic Layer GraphQL API",
            url: "https://docs.getdbt.com/docs/dbt-cloud-apis/sl-graphql",
            description:
              "GraphQL API for querying metrics and dimensions from the dbt Semantic Layer",
          },
          {
            title: "Semantic Layer JDBC API",
            url: "https://docs.getdbt.com/docs/dbt-cloud-apis/sl-jdbc",
            description:
              "JDBC driver (ArrowFlight SQL) for querying Semantic Layer metrics programmatically",
          },
          {
            title: "Introducing the dbt MCP Server",
            url: "https://docs.getdbt.com/blog/introducing-dbt-mcp-server",
            description:
              "Announcement post explaining how the MCP server brings structured data to AI workflows",
          },
          {
            title: "Partner Integration Guide",
            url: "https://docs.getdbt.com/guides/sl-partner-integration-guide",
            description:
              "Best practices for integrating with the dbt Semantic Layer",
          },
        ],
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
          "Open-source data integration platform with 600+ connectors for ELT pipelines.",
        website: "https://airbyte.com",
        github: "https://github.com/airbytehq/airbyte",
        license: "MIT",
        docsUrl: "https://docs.airbyte.com",
        mcpSupport: true,
        mcpServerUrl: "https://github.com/airbytehq/PyAirbyte",
        cliSupport: true,
        cliName: "abctl",
        cliDocsUrl:
          "https://docs.airbyte.com/platform/deploying-airbyte/abctl",
        cliInstall:
          "curl -LsfS https://get.airbyte.com | bash -",
        agentSkills: [],
        mainFeatures: [
          "600+ pre-built connectors for APIs, databases, data warehouses, and data lakes",
          "Open-source ELT platform with both self-hosted and cloud-hosted deployment options",
          "AI-powered Connector Builder for creating custom connectors via natural language",
          "Python-based CDK (Connector Development Kit) for building custom connectors",
          "Change Data Capture (CDC) support for real-time database replication",
          "OpenTelemetry (OTEL) metrics for deep observability into sync health",
          "Connection tags and resource management for organizing and prioritizing syncs",
          "OAuth 2.0 and GraphQL support for secure API-based data movement",
        ],
        externalLinks: [
          {
            title: "PyAirbyte MCP Server Docs",
            url: "https://docs.airbyte.com/developers/mcp-servers/pyairbyte-mcp",
            description:
              "Official documentation for the PyAirbyte MCP server with setup instructions and tool reference",
          },
          {
            title: "REST API Reference",
            url: "https://reference.airbyte.com/reference/getting-started",
            description:
              "Complete REST API reference for programmatic control of connections, syncs, and sources",
          },
          {
            title: "Airbyte Agent Engine",
            url: "https://docs.airbyte.com/ai-agents",
            description:
              "Dedicated AI agent integration platform with agent-native connectors and MCP interface",
          },
          {
            title: "Connector Builder MCP Server",
            url: "https://github.com/airbytehq/connector-builder-mcp",
            description:
              "Official MCP server enabling AI agents to build and manage Airbyte connectors autonomously",
          },
          {
            title: "abctl CLI Reference",
            url: "https://docs.airbyte.com/platform/deploying-airbyte/abctl",
            description:
              "CLI tool for managing local Airbyte installations via Docker",
          },
        ],
      },
      {
        name: "dbt",
        slug: "dbt",
        description:
          "SQL-first transformation workflow that enables analytics engineers to transform data in the warehouse.",
        website: "https://www.getdbt.com",
        github: "https://github.com/dbt-labs/dbt-core",
        license: "Apache-2.0",
        docsUrl: "https://docs.getdbt.com",
        mcpSupport: true,
        mcpServerUrl: "https://github.com/dbt-labs/dbt-mcp",
        cliSupport: true,
        cliName: "dbt",
        cliDocsUrl: "https://docs.getdbt.com/reference/dbt-commands",
        cliInstall: "pip install dbt-core",
        agentSkills: [
          { name: "using-dbt-for-analytics-engineering", url: "https://github.com/dbt-labs/dbt-agent-skills/tree/main/skills/dbt/skills/using-dbt-for-analytics-engineering" },
          { name: "adding-dbt-unit-test", url: "https://github.com/dbt-labs/dbt-agent-skills/tree/main/skills/dbt/skills/adding-dbt-unit-test" },
          { name: "building-dbt-semantic-layer", url: "https://github.com/dbt-labs/dbt-agent-skills/tree/main/skills/dbt/skills/building-dbt-semantic-layer" },
          { name: "troubleshooting-dbt-job-errors", url: "https://github.com/dbt-labs/dbt-agent-skills/tree/main/skills/dbt/skills/troubleshooting-dbt-job-errors" },
          { name: "running-dbt-commands", url: "https://github.com/dbt-labs/dbt-agent-skills/tree/main/skills/dbt/skills/running-dbt-commands" },
          { name: "configuring-dbt-mcp-server", url: "https://github.com/dbt-labs/dbt-agent-skills/tree/main/skills/dbt/skills/configuring-dbt-mcp-server" },
          { name: "fetching-dbt-docs", url: "https://github.com/dbt-labs/dbt-agent-skills/tree/main/skills/dbt/skills/fetching-dbt-docs" },
          { name: "answering-natural-language-questions-with-dbt", url: "https://github.com/dbt-labs/dbt-agent-skills/tree/main/skills/dbt/skills/answering-natural-language-questions-with-dbt" },
        ],
        mainFeatures: [
          "SQL-first transformation framework — write SELECT statements, dbt handles DDL/DML",
          "Version-controlled, testable data transformations with Git-based workflows",
          "Built-in data testing framework (schema tests, custom tests, freshness checks)",
          "DAG-based dependency management for model execution ordering",
          "Jinja templating for dynamic SQL and reusable macros",
          "Auto-generated documentation with data lineage visualization",
          "Incremental model support for efficient large-dataset processing",
          "Package ecosystem (dbt Hub) for reusable transformation libraries",
        ],
        externalLinks: [
          {
            title: "dbt MCP Server (Official)",
            url: "https://github.com/dbt-labs/dbt-mcp",
            description:
              "Official MCP server with 60+ tools across 8 toolset categories for AI agent integration",
          },
          {
            title: "dbt MCP Documentation",
            url: "https://docs.getdbt.com/docs/dbt-ai/about-mcp",
            description:
              "Official docs on setting up and using the dbt MCP server with AI agents",
          },
          {
            title: "CLI Command Reference",
            url: "https://docs.getdbt.com/reference/dbt-commands",
            description:
              "Complete CLI reference for all dbt commands (build, run, test, compile, docs)",
          },
          {
            title: "Semantic Layer API Overview",
            url: "https://docs.getdbt.com/docs/dbt-cloud-apis/sl-api-overview",
            description:
              "JDBC, GraphQL, and Python SDK APIs for querying dbt Semantic Layer metrics",
          },
          {
            title: "dbt Cloud APIs",
            url: "https://docs.getdbt.com/docs/dbt-cloud-apis/overview",
            description:
              "REST and GraphQL APIs for dbt Cloud including admin, discovery, and semantic layer",
          },
        ],
      },
      {
        name: "Apache Flink",
        slug: "apache-flink",
        description:
          "Stream processing framework for real-time data pipelines and event-driven applications.",
        website: "https://flink.apache.org",
        github: "https://github.com/apache/flink",
        license: "Apache-2.0",
        docsUrl: "https://nightlies.apache.org/flink/flink-docs-lts/",
        mcpSupport: true,
        mcpServerUrl: "https://github.com/Cledar/flink-mcp",
        cliSupport: true,
        cliName: "bin/flink",
        cliDocsUrl:
          "https://nightlies.apache.org/flink/flink-docs-master/docs/deployment/cli/",
        cliInstall:
          "Download from https://flink.apache.org/downloads/ and extract",
        agentSkills: [],
        mainFeatures: [
          "Unified stream and batch processing engine with a single runtime",
          "Exactly-once processing semantics with distributed checkpoint-based fault tolerance",
          "Stateful stream processing with queryable, in-memory state management",
          "Event-time processing with watermarks for handling out-of-order data",
          "High throughput, low latency processing scalable to thousands of parallel tasks",
          "Rich APIs: DataStream API, Table API, and Flink SQL for diverse use cases",
          "Savepoint support for application versioning, migration, and A/B testing",
          "Native Kubernetes and YARN deployment support with PyFlink for Python users",
        ],
        externalLinks: [
          {
            title: "Flink SQL Gateway MCP Server",
            url: "https://github.com/Cledar/flink-mcp",
            description:
              "Community MCP server connecting AI agents to Flink SQL Gateway for conversational query management",
          },
          {
            title: "REST API",
            url: "https://nightlies.apache.org/flink/flink-docs-master/docs/ops/rest_api/",
            description:
              "Official REST API for monitoring and managing Flink jobs, clusters, and TaskManagers",
          },
          {
            title: "CLI Reference",
            url: "https://nightlies.apache.org/flink/flink-docs-master/docs/deployment/cli/",
            description:
              "Official CLI documentation for submitting jobs, managing savepoints, and cluster operations",
          },
          {
            title: "Apache Flink Agents",
            url: "https://nightlies.apache.org/flink/flink-agents-docs-latest/docs/get-started/overview/",
            description:
              "Official Flink sub-project for building event-driven AI agents on Flink's streaming runtime with MCP",
          },
          {
            title: "Confluent MCP Server (Kafka + Flink)",
            url: "https://github.com/confluentinc/mcp-confluent",
            description:
              "Official Confluent Cloud MCP server for managing Kafka topics, connectors, and Flink SQL",
          },
        ],
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
        docsUrl: "https://superset.apache.org/docs/",
        mcpSupport: true,
        mcpServerUrl: "https://github.com/aptro/superset-mcp",
        cliSupport: true,
        cliName: "superset",
        cliDocsUrl: "https://superset.apache.org/docs/api/",
        cliInstall: "pip install apache-superset",
        agentSkills: [],
        mainFeatures: [
          "40+ built-in visualization types (bar charts, geospatial maps, pivot tables)",
          "No-code drag-and-drop chart builder for business users",
          "Powerful web-based SQL Editor (SQL Lab) for advanced querying",
          "Lightweight semantic layer for defining custom dimensions and metrics",
          "Role-based access control with row-level security",
          "Configurable caching layer to reduce database load",
          "REST API (OpenAPI spec) for programmatic automation",
          "Connects to 60+ SQL databases including Snowflake, BigQuery, Redshift, Databricks",
        ],
        externalLinks: [
          {
            title: "Superset MCP Server",
            url: "https://github.com/aptro/superset-mcp",
            description:
              "Community MCP server connecting AI agents to 50+ data stores via Superset",
          },
          {
            title: "REST API Reference",
            url: "https://superset.apache.org/docs/api/",
            description:
              "Official OpenAPI/Swagger docs for all REST endpoints (dashboards, charts, SQL Lab)",
          },
          {
            title: "sup CLI for Superset & Agents",
            url: "https://github.com/preset-io/superset-sup",
            description:
              "Modern CLI by Preset with --porcelain output, SQL execution, chart/dashboard management",
          },
          {
            title: "SIP-187: MCP Service Proposal",
            url: "https://github.com/apache/superset/issues/35498",
            description:
              "Official Apache Superset proposal for native MCP service integration",
          },
          {
            title: "Superset MCP Server (Winding2020)",
            url: "https://github.com/Winding2020/superset-mcp",
            description:
              "Alternative MCP server focused on dataset management, metrics, and SQL query execution",
          },
        ],
      },
      {
        name: "Metabase",
        slug: "metabase",
        description:
          "Simple and powerful analytics tool that lets anyone ask questions and learn from data.",
        website: "https://www.metabase.com",
        github: "https://github.com/metabase/metabase",
        license: "AGPL-3.0",
        docsUrl: "https://www.metabase.com/docs/latest/",
        mcpSupport: true,
        mcpServerUrl:
          "https://github.com/CognitionAI/metabase-mcp-server",
        cliSupport: true,
        cliName: "java -jar metabase.jar",
        cliDocsUrl:
          "https://www.metabase.com/docs/latest/installation-and-operation/commands",
        cliInstall:
          "Download JAR from https://www.metabase.com/start/oss/",
        agentSkills: [],
        mainFeatures: [
          "Visual query builder with joins, custom expressions, filters, and grouping (no SQL required)",
          "Full SQL editor escape hatch for advanced queries",
          "Interactive dashboards with tabs, filters, Markdown cards, and iframe cards",
          "Models (curated datasets) that combine and clean data from multiple tables",
          "Alerts and scheduled notifications via email, Slack, or webhooks",
          "Embeddable analytics (modular embedding via SDK, or full-app iframe embedding)",
          "Granular permissions with SSO integration (SAML, LDAP, JWT, Google)",
          "REST API at /api/v1 with interactive docs at /api/docs",
        ],
        externalLinks: [
          {
            title: "Metabase MCP Server (CognitionAI)",
            url: "https://github.com/CognitionAI/metabase-mcp-server",
            description:
              "Comprehensive MCP server by Cognition with 80+ tools for dashboards, cards, databases",
          },
          {
            title: "REST API Documentation",
            url: "https://www.metabase.com/docs/latest/api",
            description:
              "Official API reference for all Metabase endpoints with session token auth",
          },
          {
            title: "Metabot AI (Native AI Assistant)",
            url: "https://www.metabase.com/docs/latest/ai/metabot",
            description:
              "Built-in AI assistant for natural language querying, SQL generation, and result summarization",
          },
          {
            title: "Metabase MCP Server (EaseCloud)",
            url: "https://github.com/easecloudio/mcp-metabase-server",
            description:
              "Full-featured MCP server with 70+ tools covering permissions, monitoring, and enterprise workflows",
          },
          {
            title: "Working with the Metabase API (Wiki)",
            url: "https://github.com/metabase/metabase/wiki/Using-the-REST-API",
            description:
              "Community wiki with practical examples for authentication, MBQL queries, and API usage",
          },
        ],
      },
      {
        name: "Redash",
        slug: "redash",
        description:
          "Query and visualize data with shareable dashboards and collaborative data exploration.",
        website: "https://redash.io",
        github: "https://github.com/getredash/redash",
        license: "BSD-2-Clause",
        docsUrl: "https://redash.io/help/",
        mcpSupport: true,
        mcpServerUrl: "https://github.com/suthio/redash-mcp",
        cliSupport: true,
        cliName: "manage.py (Docker)",
        cliDocsUrl:
          "https://redash.io/help/user-guide/integrations-and-api/api/",
        cliInstall:
          "docker compose run --rm server manage ...",
        agentSkills: [],
        mainFeatures: [
          "SQL and NoSQL query editor with schema browser and autocomplete",
          "Connects to 35+ data sources (SQL databases, cloud warehouses, APIs, CSV/Excel)",
          "Drag-and-drop visualization builder (charts, pivot tables, maps, cohort tables)",
          "Interactive dashboards combining multiple visualizations",
          "Scheduled query execution and automatic dashboard refresh",
          "Alerts triggered by query result thresholds (email, Slack, webhooks)",
          "REST API for programmatic access to queries, results, dashboards, and metadata",
          "Sharing via public links, embedded widgets, or organizational permissions",
        ],
        externalLinks: [
          {
            title: "Redash MCP Server",
            url: "https://github.com/suthio/redash-mcp",
            description:
              "Node.js MCP server: list/execute queries, manage dashboards, create/update/archive queries",
          },
          {
            title: "REST API Documentation",
            url: "https://redash.io/help/user-guide/integrations-and-api/api/",
            description:
              "Official API docs covering query execution, dashboard management, alerts, and API key auth",
          },
          {
            title: "Redash Python API Client",
            url: "https://pypi.org/project/redash-api-client/",
            description:
              "Python SDK for programmatic access: create data sources, queries, visualizations, dashboards",
          },
          {
            title: "Redash CLI (koooge)",
            url: "https://github.com/koooge/redash-cli",
            description:
              "Unofficial CLI tool for Redash API operations from the command line",
          },
          {
            title: "Redash GitHub",
            url: "https://github.com/getredash/redash",
            description:
              "Official source code with API handler definitions for all REST endpoints",
          },
        ],
      },
      {
        name: "Lightdash",
        slug: "lightdash",
        description:
          "Open-source BI tool built for dbt users, enabling self-serve analytics from dbt models.",
        website: "https://www.lightdash.com",
        github: "https://github.com/lightdash/lightdash",
        license: "MIT",
        docsUrl: "https://docs.lightdash.com/",
        mcpSupport: true,
        mcpServerUrl:
          "https://github.com/syucream/lightdash-mcp-server",
        cliSupport: true,
        cliName: "lightdash",
        cliDocsUrl:
          "https://docs.lightdash.com/references/lightdash-cli",
        cliInstall: "npm install -g @lightdash/cli",
        agentSkills: [],
        mainFeatures: [
          "Native dbt integration (reads dbt YAML definitions and compiled manifests as Explores)",
          "Semantic layer built on dbt metrics — define metrics once, use everywhere",
          "Self-serve data exploration with drill-down for non-technical users",
          "AI-powered natural language queries with automatic visualizations",
          "Developer-first CLI workflow for compile, validate, preview, and deploy",
          "Dashboard and chart embedding with expirable URLs and tokens",
          "Role-based access control with user groups and personal tokens",
          "SQL runner for ad-hoc data cleansing and preparation",
        ],
        externalLinks: [
          {
            title: "Lightdash MCP Server",
            url: "https://github.com/syucream/lightdash-mcp-server",
            description:
              "MCP server with tools for projects, spaces, charts, dashboards, metrics catalog",
          },
          {
            title: "REST API Reference",
            url: "https://docs.lightdash.com/api-reference/v1/introduction",
            description:
              "Official OpenAPI docs for all Lightdash API endpoints with Personal Access Token auth",
          },
          {
            title: "Lightdash AI Agents",
            url: "https://www.lightdash.com/ai-agents",
            description:
              "Official page on Lightdash's AI agent capabilities built on the dbt semantic layer",
          },
          {
            title: "CLI Reference",
            url: "https://docs.lightdash.com/references/lightdash-cli",
            description:
              "Official CLI docs for compile, generate, deploy, preview, validate commands",
          },
          {
            title: "API Examples",
            url: "https://github.com/lightdash/lightdash-api-examples",
            description:
              "Official repository with Python and JavaScript examples for using the Lightdash API",
          },
        ],
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
        github: "https://github.com/Datus-ai/Datus-agent",
        license: "Open Source",
        docsUrl: "https://docs.datus.ai/",
        mcpSupport: true,
        cliSupport: true,
        cliName: "datus-agent",
        cliDocsUrl: "https://docs.datus.ai/cli/introduction/",
        cliInstall: "pip install datus-agent && datus-agent init",
        agentSkills: [],
        mainFeatures: [
          "AI-native SQL client ('Claude Code for data engineers') with natural language to SQL generation",
          "Evolvable context engine capturing metadata, semantic models, metrics, and reference SQL",
          "Two execution modes: Agentic Mode for exploratory workflows, Workflow Mode for production stability",
          "Subagent system to convert data domains into domain-aware chatbots with scoped context",
          "Continuous learning from user feedback and success stories to improve accuracy",
          "MCP extensions for integrating external tools and servers",
          "Database adapter support for PostgreSQL, MySQL, Snowflake, DuckDB, StarRocks, ClickZetta",
          "Three entry points: Datus-CLI (engineers), Datus-Chat (web UI), Datus-API (programmatic access)",
        ],
        externalLinks: [
          {
            title: "Datus-agent GitHub Repository",
            url: "https://github.com/Datus-ai/Datus-agent",
            description:
              "Main open-source repo: CLI SQL client with AI-native context engineering for data",
          },
          {
            title: "Datus Official Documentation",
            url: "https://docs.datus.ai/",
            description:
              "Full docs covering CLI, Chat, API components and agent workflow configuration",
          },
          {
            title: "Datus-ai GitHub Organization",
            url: "https://github.com/Datus-ai",
            description:
              "Organization page listing all DatusAI repositories and releases",
          },
          {
            title: "Datus Blog",
            url: "https://datus.ai/blog/",
            description:
              "Technical blog with posts on AI-native data engineering patterns and case studies",
          },
          {
            title: "Datus-agent Releases",
            url: "https://github.com/Datus-ai/Datus-agent/releases",
            description:
              "Release notes showing MCP integration and feature history",
          },
        ],
      },
      {
        name: "WrenAI",
        slug: "wrenai",
        description:
          "Open-source text-to-SQL AI agent that understands your data semantics and generates accurate queries.",
        website: "https://www.getwren.ai",
        github: "https://github.com/Canner/WrenAI",
        license: "AGPL-3.0",
        docsUrl:
          "https://docs.getwren.ai/oss/engine/get_started/quickstart",
        mcpSupport: true,
        mcpServerUrl: "https://github.com/Canner/wren-engine",
        cliSupport: true,
        cliName: "wren-launcher",
        cliDocsUrl: "https://docs.getwren.ai/oss/installation",
        cliInstall:
          "Download platform binary from GitHub releases, run ./wren-launcher",
        agentSkills: [],
        mainFeatures: [
          "GenBI platform: natural language queries producing accurate SQL (Text-to-SQL) and charts (Text-to-Chart)",
          "Semantic modeling layer using MDL to encode schema, metrics, joins, and business logic",
          "Support for 12+ databases: BigQuery, DuckDB, PostgreSQL, MySQL, Snowflake, Databricks, Trino",
          "AI-generated summaries, charts, and reports for decision-ready business intelligence",
          "Embeddable API for generating queries and charts inside your own applications",
          "Multiple LLM provider support: OpenAI, Anthropic, Google Vertex AI, and local LLMs via Ollama",
          "MCP integration for connecting to external tools",
          "Docker-based deployment with a user-friendly launcher for easy local installation",
        ],
        externalLinks: [
          {
            title: "WrenAI GitHub",
            url: "https://github.com/Canner/WrenAI",
            description:
              "Core GenBI platform: text-to-SQL, text-to-chart, semantic modeling (6k+ stars)",
          },
          {
            title: "Wren Engine MCP Server",
            url: "https://github.com/Canner/wren-engine",
            description:
              "Dedicated MCP server providing semantic layer for AI agents and MCP clients",
          },
          {
            title: "API Reference",
            url: "https://wrenai.readme.io/reference/welcome",
            description:
              "Official REST API docs for text-to-SQL and chart generation endpoints",
          },
          {
            title: "OSS Documentation",
            url: "https://docs.getwren.ai/oss/engine/get_started/quickstart",
            description:
              "Quickstart guide for self-hosted WrenAI including MCP integration",
          },
          {
            title: "Wren Engine API Documentation",
            url: "https://docs.getwren.ai/oss/wren_engine_api",
            description:
              "Semantic engine API reference for direct engine integration",
          },
        ],
      },
      {
        name: "LangChain",
        slug: "langchain",
        description:
          "Framework for building applications with LLMs through composable tools and chains.",
        website: "https://www.langchain.com",
        github: "https://github.com/langchain-ai/langchain",
        license: "MIT",
        docsUrl: "https://docs.langchain.com/",
        mcpSupport: true,
        mcpServerUrl:
          "https://github.com/langchain-ai/langchain-mcp-adapters",
        cliSupport: true,
        cliName: "langchain",
        cliDocsUrl:
          "https://github.com/langchain-ai/langchain/blob/master/libs/cli/DOCS.md",
        cliInstall: "pip install langchain-cli",
        agentSkills: [],
        mainFeatures: [
          "Open-source agent engineering platform with pre-built agent architecture and 1000+ integrations",
          "Modular building blocks: chains, agents, memory, tools, and indexes for complex AI workflows",
          "Retrieval-Augmented Generation (RAG) with vector database integrations for grounding LLM responses",
          "Dynamic agent reasoning: analyze context, decide actions, invoke tools, and iterate",
          "LangServe for exposing chains and agents as REST APIs with a single command",
          "LangSmith integration for observability, evaluation, tracing, and deployment",
          "LangGraph for building stateful, multi-actor applications with cycles and branching",
          "Vendor-agnostic: swap models, tools, and databases without rewriting application code",
        ],
        externalLinks: [
          {
            title: "LangChain MCP Adapters",
            url: "https://github.com/langchain-ai/langchain-mcp-adapters",
            description:
              "Official library converting MCP tools into LangChain/LangGraph-compatible tools, supports stdio and HTTP",
          },
          {
            title: "MCP Documentation",
            url: "https://docs.langchain.com/oss/python/langchain/mcp",
            description:
              "Official MCP integration guide in LangChain docs",
          },
          {
            title: "LangGraph Agent Framework",
            url: "https://github.com/langchain-ai/langgraph",
            description:
              "Graph-based agent orchestration framework recommended for production agents with MCP",
          },
          {
            title: "Python API Reference",
            url: "https://reference.langchain.com/python",
            description:
              "Comprehensive API reference for all langchain-* packages",
          },
          {
            title: "LangChain Deep Agents",
            url: "https://github.com/langchain-ai/deepagents",
            description:
              "Agent harness with planning, filesystem backend, and subagent spawning for complex tasks",
          },
        ],
      },
      {
        name: "CrewAI",
        slug: "crewai",
        description:
          "Framework for orchestrating autonomous AI agents that work together on complex tasks.",
        website: "https://www.crewai.com",
        github: "https://github.com/crewAIInc/crewAI",
        license: "MIT",
        docsUrl: "https://docs.crewai.com/",
        mcpSupport: true,
        mcpServerUrl:
          "https://github.com/crewAIInc/enterprise-mcp-server",
        cliSupport: true,
        cliName: "crewai",
        cliDocsUrl: "https://docs.crewai.com/en/concepts/cli",
        cliInstall: "pip install crewai",
        agentSkills: [],
        mainFeatures: [
          "Multi-agent orchestration framework: role-based agent design with roles, goals, and backstories",
          "Autonomous task delegation and inter-agent collaboration without human mediation",
          "Flexible execution models: sequential, parallel, and conditional task processing",
          "Sophisticated memory management: shared short-term, long-term, entity, and contextual memory",
          "100+ built-in tools for web search, website interaction, vector database queries",
          "Flows for precise workflow control alongside autonomous Crews for collaborative intelligence",
          "Enterprise features: tracing, observability, real-time monitoring, and unified control plane",
          "Fully independent framework (no LangChain dependency) with faster execution",
        ],
        externalLinks: [
          {
            title: "CrewAI Enterprise MCP Server",
            url: "https://github.com/crewAIInc/enterprise-mcp-server",
            description:
              "Official MCP server for kicking off and monitoring deployed crew workflows",
          },
          {
            title: "MCP Integration Docs",
            url: "https://docs.crewai.com/en/mcp/overview",
            description:
              "Official guide for using MCP servers as tools within CrewAI agents",
          },
          {
            title: "CrewAI Tools Repository",
            url: "https://github.com/crewAIInc/crewAI-tools",
            description:
              "Pre-built tool collection for CrewAI agents, supports MCP tool loading via ToolCollection",
          },
          {
            title: "CrewAI PyPI Package",
            url: "https://pypi.org/project/crewai/",
            description:
              "Python package with installation instructions and version history",
          },
          {
            title: "Community MCP-CrewAI Server",
            url: "https://github.com/adam-paterson/mcp-crew-ai",
            description:
              "Community MCP server for running and managing CrewAI workflows from Claude Desktop or Cursor",
          },
        ],
      },
    ],
  },
  {
    title: "Scheduler",
    slug: "scheduler",
    description:
      "Workflow orchestration and scheduling platforms that coordinate data pipelines and task execution at scale.",
    icon: "scheduler",
    tools: [
      {
        name: "Apache Airflow",
        slug: "apache-airflow",
        description:
          "The industry-standard platform for programmatically authoring, scheduling, and monitoring workflows.",
        website: "https://airflow.apache.org",
        github: "https://github.com/apache/airflow",
        license: "Apache-2.0",
        docsUrl: "https://airflow.apache.org/docs/",
        mcpSupport: true,
        mcpServerUrl:
          "https://github.com/astronomer/astro-airflow-mcp",
        cliSupport: true,
        cliName: "airflow",
        cliDocsUrl:
          "https://airflow.apache.org/docs/apache-airflow/stable/cli-and-env-variables-ref.html",
        cliInstall: "pip install apache-airflow",
        agentSkills: [
          { name: "airflow", url: "https://github.com/astronomer/agents/tree/main/skills/airflow" },
          { name: "authoring-dags", url: "https://github.com/astronomer/agents/tree/main/skills/authoring-dags" },
          { name: "debugging-dags", url: "https://github.com/astronomer/agents/tree/main/skills/debugging-dags" },
          { name: "testing-dags", url: "https://github.com/astronomer/agents/tree/main/skills/testing-dags" },
          { name: "deploying-airflow", url: "https://github.com/astronomer/agents/tree/main/skills/deploying-airflow" },
          { name: "migrating-airflow-2-to-3", url: "https://github.com/astronomer/agents/tree/main/skills/migrating-airflow-2-to-3" },
          { name: "analyzing-data", url: "https://github.com/astronomer/agents/tree/main/skills/analyzing-data" },
          { name: "checking-freshness", url: "https://github.com/astronomer/agents/tree/main/skills/checking-freshness" },
          { name: "annotating-task-lineage", url: "https://github.com/astronomer/agents/tree/main/skills/annotating-task-lineage" },
          { name: "airflow-plugins", url: "https://github.com/astronomer/agents/tree/main/skills/airflow-plugins" },
        ],
        mainFeatures: [
          "Python-native DAG authoring with dynamic pipeline generation and Jinja templating",
          "Extensive operator library: BashOperator, PythonOperator, KubernetesPodOperator, and 1000+ providers",
          "Rich web UI for monitoring DAG runs, task logs, Gantt charts, and dependency graphs",
          "Flexible scheduling with cron expressions, timetables, data-aware scheduling, and event triggers",
          "Built-in retry logic, SLA monitoring, alerting, and failure callbacks",
          "Provider ecosystem with 80+ packages for AWS, GCP, Azure, Databricks, Snowflake, dbt, and more",
          "TaskFlow API for writing DAGs as decorated Python functions with automatic XCom passing",
          "Horizontal scalability with Celery, Kubernetes, or local executors",
        ],
        externalLinks: [
          {
            title: "Astronomer Airflow MCP Server",
            url: "https://github.com/astronomer/astro-airflow-mcp",
            description:
              "Official MCP server for Airflow — DAG management, task monitoring, log access via AI assistants",
          },
          {
            title: "Astronomer Agent Skills",
            url: "https://github.com/astronomer/agents/tree/main/skills",
            description:
              "22 agentskills.io-spec skills for Airflow workflows: DAG authoring, debugging, testing, deployment, and more",
          },
          {
            title: "Airflow Provider Packages",
            url: "https://airflow.apache.org/docs/apache-airflow-providers/",
            description:
              "80+ official provider packages for cloud services, databases, and data tools",
          },
          {
            title: "Astro CLI",
            url: "https://www.astronomer.io/docs/astro/cli/overview",
            description:
              "Astronomer CLI for local Airflow development, testing, and deployment to Astro Cloud",
          },
          {
            title: "Airflow REST API",
            url: "https://airflow.apache.org/docs/apache-airflow/stable/stable-rest-api-ref.html",
            description:
              "Stable REST API for programmatic DAG triggering, monitoring, and management",
          },
        ],
      },
      {
        name: "Dagster",
        slug: "dagster",
        description:
          "Cloud-native data orchestrator with software-defined assets and built-in observability.",
        website: "https://dagster.io",
        github: "https://github.com/dagster-io/dagster",
        license: "Apache-2.0",
        docsUrl: "https://docs.dagster.io",
        mcpSupport: true,
        mcpServerUrl: "https://github.com/dagster-io/dagster",
        cliSupport: true,
        cliName: "dagster / dg",
        cliDocsUrl: "https://docs.dagster.io/api/clis/cli",
        cliInstall: "pip install dagster dagster-webserver",
        agentSkills: [],
        mainFeatures: [
          "Asset-centric orchestration — define pipelines as a graph of data assets rather than tasks",
          "Integrated data catalog with auto-generated documentation and lineage tracking",
          "Built-in scheduling, sensors, and event-driven triggering for pipeline automation",
          "First-class dbt, Spark, and Databricks integrations for transformation orchestration",
          "Type-checked, testable pipelines with local development and unit testing support",
          "Monitoring and alerting with Slack integration and AI-powered debugging",
          "Partitioned assets and backfill support for incremental and historical data processing",
          "Dagster+ (Cloud) with SSO, RBAC, SOC 2 Type II compliance, and serverless deployment",
        ],
        externalLinks: [
          {
            title: "Dagster MCP Server Blog Post",
            url: "https://dagster.io/blog/dagsters-mcp-server",
            description:
              "Official announcement and deep-dive on Dagster MCP server capabilities and setup",
          },
          {
            title: "API Reference",
            url: "https://docs.dagster.io/api",
            description:
              "Complete API reference covering CLIs, core SDK, REST APIs, and GraphQL API",
          },
          {
            title: "GraphQL API",
            url: "https://docs.dagster.io/api/graphql",
            description:
              "GraphQL API for programmatic interaction: trigger runs, query assets, manage schedules",
          },
          {
            title: "dg CLI Reference",
            url: "https://docs.dagster.io/api/clis/dg-cli/dg-cli-reference",
            description:
              "Official CLI reference for the dg command including MCP server configuration",
          },
          {
            title: "AI & ML Solutions",
            url: "https://dagster.io/solutions/ai",
            description:
              "Dagster's AI/ML pipeline orchestration covering agent-friendly patterns and automation",
          },
        ],
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
