import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterCard from "@/components/newsletter/NewsletterCard";
import SubscribeForm from "@/components/newsletter/SubscribeForm";
import { getAllNewsletterIssues } from "@/lib/newsletter";

export const metadata: Metadata = {
  title: "Newsletter — Agentic Data Stack Weekly",
  description:
    "A curated weekly digest of the most important developments in agentic data infrastructure, AI agent tooling, and the evolving data stack. Built for data engineers and data team leaders.",
  openGraph: {
    title: "Agentic Data Stack Weekly Newsletter",
    description:
      "Curated weekly news on data infrastructure, agent tooling, and the evolving data stack.",
    type: "website",
  },
};

export default function NewsletterPage() {
  const issues = getAllNewsletterIssues();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        {/* Hero + Subscribe */}
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              Weekly Digest
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Agentic Data Stack Weekly
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              Curated news and insights on data infrastructure, agent tooling,
              and the evolution of the modern data stack. Built for data
              engineers and data team leaders who need to stay ahead.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-xl">
            <SubscribeForm />
          </div>
        </section>

        {/* Archive */}
        <section className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted">
            Past Issues
          </h2>

          {issues.length === 0 ? (
            <div className="rounded-2xl border border-card-border bg-card-bg/50 p-12 text-center">
              <p className="text-muted">
                The first issue is coming soon. Subscribe above to get notified.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {issues.map((issue) => (
                <NewsletterCard
                  key={issue.slug}
                  slug={issue.slug}
                  title={issue.frontmatter.title}
                  description={issue.frontmatter.description}
                  date={issue.frontmatter.date}
                  issue={issue.frontmatter.issue}
                  tags={issue.frontmatter.tags}
                />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
