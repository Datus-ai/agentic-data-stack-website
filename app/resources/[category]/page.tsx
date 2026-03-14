import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResourceBreadcrumb from "@/components/resources/ResourceBreadcrumb";
import ToolCard from "@/components/resources/ToolCard";
import { categories, getCategoryBySlug, getAllCategorySlugs } from "@/lib/categories";
import { getResourcesByCategory, getCategoryOverview } from "@/lib/resources";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getAllCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.title} — Agentic Data Stack Resources`,
    description: category.description,
    openGraph: {
      title: `${category.title} — Agentic Data Stack Resources`,
      description: category.description,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const overview = getCategoryOverview(slug);
  const resources = getResourcesByCategory(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.title} — Agentic Data Stack Resources`,
    description: category.description,
    url: `https://agenticdatastack.org/resources/${slug}`,
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="mx-auto max-w-6xl px-6">
          <ResourceBreadcrumb
            items={[
              { label: "Resources", href: "/resources" },
              { label: category.title },
            ]}
          />

          {/* Category Header */}
          <div className="mb-12 mt-6">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {category.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-muted">
              {category.description}
            </p>
            {overview && (
              <div className="mt-6 max-w-3xl text-muted leading-relaxed">
                {overview.content.split("\n").filter(Boolean).map((p, i) => (
                  <p key={i} className="mt-3">
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Tools Section */}
          <section>
            <h2 className="mb-6 text-xl font-semibold">
              Tools & Frameworks
              <span className="ml-2 text-sm font-normal text-muted">
                ({category.tools.length})
              </span>
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {category.tools.map((tool) => (
                <ToolCard
                  key={tool.slug}
                  name={tool.name}
                  slug={tool.slug}
                  description={tool.description}
                  website={tool.website}
                  github={tool.github}
                  license={tool.license}
                  mcpSupport={tool.mcpSupport}
                  cliSupport={tool.cliSupport}
                  agentSkills={tool.agentSkills}
                  categorySlug={slug}
                />
              ))}
            </div>
          </section>

          {/* Articles & Case Studies */}
          {resources.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-6 text-xl font-semibold">
                Articles & Case Studies
              </h2>
              <div className="grid gap-4">
                {resources.map((r) => (
                  <a
                    key={r.frontmatter.slug}
                    href={
                      r.frontmatter.externalUrl ||
                      `/resources/${slug}/${r.frontmatter.slug}`
                    }
                    target={r.frontmatter.externalUrl ? "_blank" : undefined}
                    rel={
                      r.frontmatter.externalUrl
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group rounded-xl border border-card-border bg-card-bg/50 p-5 transition-all hover:border-violet-500/30 hover:bg-card-bg"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium group-hover:text-violet-400 transition-colors">
                          {r.frontmatter.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted">
                          {r.frontmatter.description}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-card-bg px-2.5 py-0.5 text-xs text-muted border border-card-border">
                        {r.frontmatter.type}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Placeholder for future content */}
          {resources.length === 0 && (
            <section className="mt-16 rounded-xl border border-dashed border-card-border p-8 text-center">
              <p className="text-muted">
                Articles and case studies for {category.title} are coming soon.
              </p>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
