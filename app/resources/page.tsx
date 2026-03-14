import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/resources/CategoryCard";
import { categories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Resources — Agentic Data Stack",
  description:
    "Explore the open-source tools and frameworks powering the agentic data stack. Browse by category: catalog services, lake formats, SQL engines, semantic layers, ETL tools, BI tools, and data agents.",
  openGraph: {
    title: "Resources — Agentic Data Stack",
    description:
      "Explore the open-source tools and frameworks powering the agentic data stack.",
    type: "website",
  },
};

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Resource Hub
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              Explore the open-source ecosystem powering the agentic data stack.
              Discover tools, their agent integrations, and real-world patterns.
            </p>
          </div>
        </section>

        {/* Category Grid */}
        <section className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.slug}
                title={cat.title}
                slug={cat.slug}
                description={cat.description}
                icon={cat.icon}
                toolCount={cat.tools.length}
              />
            ))}
          </div>
        </section>

        {/* Featured tools overview */}
        <section className="mx-auto max-w-6xl px-6 pt-20">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Agent Integration Landscape
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted">
            The modern data stack is evolving to support autonomous agents.
            Tools across every layer are adding MCP servers, CLI interfaces, and
            agent-specific skills.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-card-border bg-card-bg/50 p-6 text-center">
              <div className="mb-2 text-3xl font-bold text-green-400">
                {categories.reduce(
                  (acc, cat) =>
                    acc + cat.tools.filter((t) => t.mcpSupport).length,
                  0
                )}
              </div>
              <div className="text-sm text-muted">MCP-Enabled Tools</div>
            </div>
            <div className="rounded-xl border border-card-border bg-card-bg/50 p-6 text-center">
              <div className="mb-2 text-3xl font-bold text-blue-400">
                {categories.reduce(
                  (acc, cat) =>
                    acc + cat.tools.filter((t) => t.cliSupport).length,
                  0
                )}
              </div>
              <div className="text-sm text-muted">CLI-Enabled Tools</div>
            </div>
            <div className="rounded-xl border border-card-border bg-card-bg/50 p-6 text-center">
              <div className="mb-2 text-3xl font-bold text-violet-400">
                {categories.reduce((acc, cat) => acc + cat.tools.length, 0)}
              </div>
              <div className="text-sm text-muted">Total Tools Tracked</div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
