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

                  {tool.agentSkills && tool.agentSkills.length > 0 && (
                    <div className="rounded-xl border border-card-border bg-card-bg/50 p-6">
                      <h2 className="text-lg font-semibold mb-3">
                        Agent Capabilities
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {tool.agentSkills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-violet-500/10 border border-violet-500/20 px-3 py-1 text-sm text-violet-300"
                          >
                            {skill}
                          </span>
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
                  mcpSupport={tool.mcpSupport}
                  cliSupport={tool.cliSupport}
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
