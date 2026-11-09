import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Shell } from "./Pages";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { getAllNewsletterIssues, getNewsletterBySlug } from "@/lib/newsletter";
import { categories } from "@/lib/categories";
import { categoryZh, componentZh } from "@/lib/zh-resources";
import { getTranslation } from "@/lib/translated-content";
import SubscribeForm from "@/components/newsletter/SubscribeForm";
export function chinesePaths(): string[][] {
  return [
    ["blog"],
    ["resources"],
    ["newsletter"],
    ...getAllBlogPosts()
      .filter((p) => getTranslation("blog", p.slug))
      .map((p) => ["blog", p.slug]),
    ...getAllNewsletterIssues()
      .filter((p) => getTranslation("newsletter", p.slug))
      .map((p) => ["newsletter", p.slug]),
    ...categories.flatMap((c) => [
      ["resources", c.slug],
      ...c.components.map((t) => ["resources", c.slug, t.slug]),
    ]),
  ];
}
export function chineseTitle(slug: string[]) {
  if (slug[0] === "blog" && slug[1]) return getTranslation("blog", slug[1]);
  if (slug[0] === "newsletter" && slug[1])
    return getTranslation("newsletter", slug[1]);
  if (slug[0] === "resources" && slug[1]) {
    const c = categories.find((c) => c.slug === slug[1]);
    const t = c?.components.find((t) => t.slug === slug[2]);
    return t
      ? { title: t.name, description: componentZh[t.slug] }
      : categoryZh[slug[1]];
  }
  return {
    title: (
      {
        blog: "社区博客",
        resources: "资源中心",
        newsletter: "订阅与往期",
      } as Record<string, string>
    )[slug[0]],
    description: "探索 Agentic Data Stack 的架构、技术组件与社区实践。",
  };
}
export default function ChineseContent({ slug }: { slug: string[] }) {
  const [section, key, tool] = slug;
  if ((section === "blog" || section === "newsletter") && key) {
    const original =
      section === "blog" ? getBlogPostBySlug(key) : getNewsletterBySlug(key);
    const translation = getTranslation(section, key);
    if (!original || !translation) notFound();
    return (
      <Shell locale="zh">
        <article className="site-width translated-article">
          <Link href={`/zh/${section}`} className="text-link">
            ← {section === "blog" ? "全部文章" : "全部期刊"}
          </Link>
          <p className="eyebrow spaced">
            {original.frontmatter.date} / AGENTIC DATA STACK
          </p>
          <h1>{translation.title}</h1>
          <p className="hero-copy">{translation.description}</p>
          <div className="prose prose-invert prose-lg max-w-none prose-headings:tracking-tight prose-p:text-muted prose-li:text-muted prose-a:text-violet-300 prose-pre:bg-card-bg prose-img:rounded-xl prose-table:text-sm">
            <MDXRemote
              source={translation.content}
              options={{
                mdxOptions: {
                  format: "md",
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </div>
          <Link className="text-link block-link" href={`/${section}/${key}`}>
            查看英文原文 →
          </Link>
        </article>
      </Shell>
    );
  }
  if (section === "blog")
    return (
      <Shell locale="zh">
        <section className="page-hero site-width">
          <p className="eyebrow">FIELD NOTES / BLOG</p>
          <h1>来自实践的思考。</h1>
          <p className="hero-copy">
            关于 Agentic 数据架构、评估框架与实际系统建设的深入讨论。
          </p>
        </section>
        <section className="site-section">
          <div className="site-width topic-grid">
            {getAllBlogPosts()
              .filter((p) => !p.isDraft)
              .map((p) => {
                const tr = getTranslation("blog", p.slug);
                return (
                  <Link
                    key={p.slug}
                    className="article-card"
                    href={tr ? `/zh/blog/${p.slug}` : `/blog/${p.slug}`}
                  >
                    <p className="eyebrow">{p.frontmatter.date}</p>
                    <h3>{tr?.title || p.frontmatter.title}</h3>
                    <p>{tr?.description || p.frontmatter.description}</p>
                    <span className="text-link">
                      {tr ? "阅读文章" : "阅读英文原文"} →
                    </span>
                  </Link>
                );
              })}
          </div>
        </section>
      </Shell>
    );
  if (section === "newsletter")
    return (
      <Shell locale="zh">
        <section className="page-hero site-width">
          <p className="eyebrow">NEWSLETTER</p>
          <h1>订阅与往期。</h1>
          <p className="hero-copy">关注数据基础设施、Agent 工具与社区动态。</p>
        </section>
        <section className="site-section">
          <div className="site-width reading-width">
            <SubscribeForm locale="zh" />
            {getAllNewsletterIssues().map((p) => {
              const tr = getTranslation("newsletter", p.slug);
              return (
                <Link
                  className="call-list-item"
                  key={p.slug}
                  href={
                    tr ? `/zh/newsletter/${p.slug}` : `/newsletter/${p.slug}`
                  }
                >
                  <span>
                    <strong>{tr?.title || p.frontmatter.title}</strong>
                    <small>{p.frontmatter.date}</small>
                  </span>
                  <span>阅读 →</span>
                </Link>
              );
            })}
          </div>
        </section>
      </Shell>
    );
  if (section !== "resources") notFound();
  const category = categories.find((c) => c.slug === key);
  if (key && !category) notFound();
  const component = category?.components.find((c) => c.slug === tool);
  if (tool && !component) notFound();
  if (component && category) {
    const links = [
      ["官网", component.website],
      ["文档", component.docsUrl],
      ["GitHub", component.github],
      ["API 文档", component.apiDocsUrl],
      ["MCP 服务", component.mcpServerUrl],
      ["CLI 文档", component.cliDocsUrl],
    ].filter((pair): pair is [string, string] => !!pair[1]);
    return (
      <Shell locale="zh">
        <section className="page-hero site-width">
          <Link className="text-link" href={`/zh/resources/${category.slug}`}>
            ← {categoryZh[category.slug].title}
          </Link>
          <p className="eyebrow spaced">COMPONENT / {category.title}</p>
          <h1>{component.name}</h1>
          <p className="hero-copy">{componentZh[component.slug]}</p>
          <div className="host-links">
            {links.map(([label, url]) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label} ↗
              </a>
            ))}
          </div>
        </section>
        <section className="site-section">
          <div className="site-width reading-width">
            <h2>Agent 集成能力</h2>
            <dl className="event-facts">
              <div>
                <dt>MCP</dt>
                <dd>{component.mcpSupport ? "支持" : "未收录支持信息"}</dd>
              </div>
              <div>
                <dt>CLI</dt>
                <dd>
                  {component.cliSupport
                    ? `支持${component.cliName ? ` · ${component.cliName}` : ""}`
                    : "未收录支持信息"}
                </dd>
              </div>
              <div>
                <dt>许可证</dt>
                <dd>{component.license || "请查阅官方说明"}</dd>
              </div>
            </dl>
            {component.cliInstall && (
              <>
                <h2 className="subheading">CLI 安装命令</h2>
                <pre className="code-block">
                  <code>{component.cliInstall}</code>
                </pre>
              </>
            )}
            {!!component.agentSkills?.length && (
              <>
                <h2 className="subheading">Agent Skills</h2>
                <p className="muted-copy">
                  Skills 与 MCP 是独立能力，以下为已收录的真实项目链接。
                </p>
                <div className="host-links">
                  {component.agentSkills.map((s) => (
                    <a
                      key={s.url}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.name} ↗
                    </a>
                  ))}
                </div>
              </>
            )}
            <p className="muted-copy">
              完整技术特性和第三方资料保留在英文资源页；最新能力请查阅官方文档。
            </p>
            <Link
              className="button button-outline"
              href={`/resources/${category.slug}/${component.slug}`}
            >
              查看完整英文技术资料 ↗
            </Link>
          </div>
        </section>
      </Shell>
    );
  }
  return (
    <Shell locale="zh">
      <section className="page-hero site-width">
        <p className="eyebrow">RESOURCE HUB</p>
        <h1>
          {category
            ? categoryZh[category.slug].title
            : "探索 Agent-ready\n数据技术栈。"}
        </h1>
        <p className="hero-copy">
          {category
            ? categoryZh[category.slug].description
            : "从目录、湖表、计算与语义层，到 Data Agent 与图数据库，了解数据组件及其 MCP、CLI 和 Skills 能力。"}
        </p>
      </section>
      <section className="site-section">
        <div className="site-width topic-grid">
          {category
            ? category.components.map((c) => (
                <Link
                  className="topic-card"
                  key={c.slug}
                  href={`/zh/resources/${category.slug}/${c.slug}`}
                >
                  <h3>{c.name}</h3>
                  <p>{componentZh[c.slug]}</p>
                  <span className="text-link">查看组件 →</span>
                </Link>
              ))
            : categories.map((c) => (
                <Link
                  className="topic-card"
                  key={c.slug}
                  href={`/zh/resources/${c.slug}`}
                >
                  <span className="topic-index">
                    {c.components.length} 个组件
                  </span>
                  <h3>{categoryZh[c.slug].title}</h3>
                  <p>{categoryZh[c.slug].description}</p>
                  <span className="text-link">探索组件 →</span>
                </Link>
              ))}
        </div>
      </section>
    </Shell>
  );
}
