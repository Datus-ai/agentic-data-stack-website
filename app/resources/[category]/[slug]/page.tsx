import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResourceBreadcrumb from "@/components/resources/ResourceBreadcrumb";
import ToolInfoPanel from "@/components/resources/ToolInfoPanel";
import AgentBadges from "@/components/resources/AgentBadges";
import {
  categories,
  getCategoryBySlug,
  getAllCategorySlugs,
} from "@/lib/categories";
import { getResourceBySlug } from "@/lib/resources";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { category: string; slug: string }[] = [];
  for (const cat of categories) {
    for (const tool of cat.tools) {
      params.push({ category: cat.slug, slug: tool.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: catSlug, slug } = await params;
  const category = getCategoryBySlug(catSlug);
  if (!category) return {};

  const tool = category.tools.find((t) => t.slug === slug);
  const resource = getResourceBySlug(catSlug, slug);

  const title = resource?.frontmatter.title || tool?.name || slug;
  const description =
    resource?.frontmatter.description ||
    tool?.description ||
    `${title} — ${category.title} tool in the agentic data stack ecosystem.`;

  return {
    title: `${title} — ${category.title} — Agentic Data Stack`,
    description,
    openGraph: {
      title: `${title} — Agentic Data Stack`,
      description,
      type: "article",
    },
  };
}

export default async function ResourcePage({ params }: Props) {
  const { category: catSlug, slug } = await params;
  const category = getCategoryBySlug(catSlug);
  if (!category) notFound();

  const tool = category.tools.find((t) => t.slug === slug);
  const resource = getResourceBySlug(catSlug, slug);

  if (!tool && !resource) notFound();

  const title = resource?.frontmatter.title || tool?.name || slug;
  const description =
    resource?.frontmatter.description || tool?.description || "";

  const jsonLd = tool
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: tool.name,
        description: tool.description,
        url: tool.website,
        applicationCategory: "DeveloperApplication",
        license: tool.license,
        offers: { "@type": "Offer", price: "0" },
      }
    : {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        author: {
          "@type": "Organization",
          name:
            resource?.frontmatter.author?.name || "Agentic Data Stack",
        },
        datePublished: resource?.frontmatter.date,
      };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Resources",
        item: "https://agenticdatastack.org/resources",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category.title,
        item: `https://agenticdatastack.org/resources/${catSlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <div className="mx-auto max-w-6xl px-6">
          <ResourceBreadcrumb
            items={[
              { label: "Resources", href: "/resources" },
              { label: category.title, href: `/resources/${catSlug}` },
              { label: title },
            ]}
          />

          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_300px]">
            {/* Main Content */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {title}
              </h1>
              <p className="mt-4 text-lg text-muted">{description}</p>

              {tool && (
                <div className="mt-4">
                  <AgentBadges
                    mcpSupport={tool.mcpSupport}
                    cliSupport={tool.cliSupport}
                    agentSkills={tool.agentSkills}
                  />
                </div>
              )}

              {/* MDX content if available */}
              {resource && (
                <div className="prose-invert mt-8 max-w-none">
                  {resource.content.split("\n").filter(Boolean).map((p, i) => (
                    <p key={i} className="mt-4 text-muted leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              )}

              {/* Default content for tool pages without MDX */}
              {!resource && tool && (
                <div className="mt-8 space-y-6">
                  <div className="rounded-xl border border-card-border bg-card-bg/50 p-6">
                    <h2 className="text-lg font-semibold mb-3">
                      About {tool.name}
                    </h2>
                    <p className="text-muted leading-relaxed">
                      {tool.description} Explore how {tool.name} integrates with
                      the agentic data stack ecosystem and supports autonomous
                      data operations.
                    </p>
                  </div>

                  {/* Key Features */}
                  {tool.mainFeatures && tool.mainFeatures.length > 0 && (
                    <div className="rounded-xl border border-card-border bg-card-bg/50 p-6">
                      <h2 className="text-lg font-semibold mb-3">
                        Key Features
                      </h2>
                      <ul className="space-y-2">
                        {tool.mainFeatures.map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-muted">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-violet-400">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                            </svg>
                            <span className="leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Agent Integration — visible on mobile (sidebar is hidden lg:block) */}
                  {(tool.mcpSupport || tool.cliSupport || (tool.agentSkills && tool.agentSkills.length > 0)) && (
                    <div className="rounded-xl border border-card-border bg-card-bg/50 p-6">
                      <h2 className="text-lg font-semibold mb-4">
                        Agent Integration
                      </h2>
                      <div className="space-y-4">
                        {/* MCP */}
                        {tool.mcpSupport && (
                          <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-emerald-400">
                                <path d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-emerald-400">MCP Server</p>
                              {tool.mcpServerUrl ? (
                                <a
                                  href={tool.mcpServerUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-1 inline-flex items-center gap-1.5 text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
                                >
                                  {tool.mcpServerUrl.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3 w-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                  </svg>
                                </a>
                              ) : (
                                <p className="mt-1 text-sm text-muted">MCP integration available</p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* CLI */}
                        {tool.cliSupport && (tool.cliName || tool.cliDocsUrl) && (
                          <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-blue-400">
                                <path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 0 1 4.25 2h7.5A2.25 2.25 0 0 1 14 4.25v7.5A2.25 2.25 0 0 1 11.75 14h-7.5A2.25 2.25 0 0 1 2 11.75v-7.5ZM4.75 5a.75.75 0 0 0-.53 1.28L5.94 8l-1.72 1.72a.75.75 0 1 0 1.06 1.06l2.25-2.25a.75.75 0 0 0 0-1.06L5.28 5.22A.75.75 0 0 0 4.75 5ZM8.5 10.25a.75.75 0 0 0 0 1.5h2.75a.75.75 0 0 0 0-1.5H8.5Z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-blue-400">
                                CLI{tool.cliName && <> &mdash; <code className="font-mono text-blue-300">{tool.cliName}</code></>}
                              </p>
                              {tool.cliInstall && (
                                <div className="mt-1 rounded-md bg-black/30 px-2.5 py-1.5">
                                  <code className="text-xs text-muted font-mono">$ {tool.cliInstall}</code>
                                </div>
                              )}
                              {tool.cliDocsUrl && (
                                <a
                                  href={tool.cliDocsUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-blue-200 transition-colors"
                                >
                                  CLI Documentation
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3 w-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                  </svg>
                                </a>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Agent Skills */}
                        {tool.agentSkills && tool.agentSkills.length > 0 && (
                          <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-violet-400">
                                <path d="M8 .5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 .5Zm0 10a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 10.5Zm5.5-3a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 .75-.75ZM3.25 6.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5Z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-violet-400 mb-2">Agent Skills</p>
                              <div className="flex flex-wrap gap-1.5">
                                {tool.agentSkills.map((skill) => (
                                  <a
                                    key={skill.name}
                                    href={skill.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 rounded-md bg-violet-500/10 px-2 py-1 text-xs font-medium text-violet-300 ring-1 ring-violet-500/20 transition-all hover:bg-violet-500/20 hover:text-violet-200 hover:ring-violet-500/40"
                                  >
                                    {skill.name}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-2.5 w-2.5 shrink-0">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                    </svg>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* External Links */}
                  {tool.externalLinks && tool.externalLinks.length > 0 && (
                    <div className="rounded-xl border border-card-border bg-card-bg/50 p-6">
                      <h2 className="text-lg font-semibold mb-3">
                        External Links
                      </h2>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {tool.externalLinks.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group rounded-lg border border-card-border bg-card-bg p-4 transition-all hover:border-violet-500/30 hover:bg-violet-500/5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-foreground group-hover:text-violet-300 transition-colors">
                                {link.title}
                              </span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5 shrink-0 text-muted group-hover:text-violet-400 transition-colors">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                              </svg>
                            </div>
                            <p className="mt-1 text-xs text-muted line-clamp-2">
                              {link.description}
                            </p>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Back link */}
              <div className="mt-12">
                <a
                  href={`/resources/${catSlug}`}
                  className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                >
                  &larr; Back to {category.title}
                </a>
              </div>
            </div>

            {/* Sidebar */}
            {tool && (
              <aside className="hidden lg:block">
                <ToolInfoPanel
                  website={tool.website}
                  github={tool.github}
                  license={tool.license}
                  docsUrl={tool.docsUrl}
                  mcpSupport={tool.mcpSupport}
                  mcpServerUrl={tool.mcpServerUrl}
                  cliSupport={tool.cliSupport}
                  cliName={tool.cliName}
                  cliDocsUrl={tool.cliDocsUrl}
                  cliInstall={tool.cliInstall}
                  agentSkills={tool.agentSkills}
                />
              </aside>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
