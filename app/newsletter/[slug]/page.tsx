import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubscribeForm from "@/components/newsletter/SubscribeForm";
import TagBadge from "@/components/TagBadge";
import {
  getNewsletterBySlug,
  getNewsletterSlugs,
  getAllNewsletterIssues,
} from "@/lib/newsletter";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getNewsletterSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const issue = getNewsletterBySlug(slug);
  if (!issue) return {};

  return {
    title: `${issue.frontmatter.title} — Agentic Data Stack`,
    description: issue.frontmatter.description,
    openGraph: {
      title: issue.frontmatter.title,
      description: issue.frontmatter.description,
      type: "article",
      publishedTime: issue.frontmatter.date,
    },
  };
}

export default async function NewsletterIssuePage({ params }: Props) {
  const { slug } = await params;
  const issue = getNewsletterBySlug(slug);
  if (!issue) notFound();

  const allIssues = getAllNewsletterIssues();
  const currentIdx = allIssues.findIndex((i) => i.slug === slug);
  const prevIssue = currentIdx < allIssues.length - 1 ? allIssues[currentIdx + 1] : null;
  const nextIssue = currentIdx > 0 ? allIssues[currentIdx - 1] : null;

  const formattedDate = new Date(issue.frontmatter.date).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <article className="mx-auto max-w-3xl px-6">
          {/* Header */}
          <header className="pb-8 border-b border-card-border">
            <div className="mb-4 flex items-center gap-3 text-sm text-muted">
              <Link
                href="/newsletter"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Newsletter
              </Link>
              <span className="text-card-border">/</span>
              <span>Issue #{issue.frontmatter.issue}</span>
              <span className="h-1 w-1 rounded-full bg-card-border" />
              <time dateTime={issue.frontmatter.date}>{formattedDate}</time>
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {issue.frontmatter.title}
            </h1>

            <p className="mt-3 text-lg text-muted">
              {issue.frontmatter.description}
            </p>

            {issue.frontmatter.tags && issue.frontmatter.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {issue.frontmatter.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <div className="mt-10 prose-invert prose prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-card-border prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-muted prose-p:leading-relaxed prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 prose-strong:text-foreground prose-li:text-muted prose-ul:text-muted prose-blockquote:border-blue-500/50 prose-blockquote:text-muted prose-hr:border-card-border">
            <MDXRemote
              source={issue.content}
              options={{
                mdxOptions: {
                  format: issue.format,
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </div>

          {/* Subscribe CTA */}
          <div className="mt-12">
            <SubscribeForm />
          </div>

          {/* Prev / Next */}
          <nav className="mt-10 grid gap-4 sm:grid-cols-2">
            {prevIssue ? (
              <Link
                href={`/newsletter/${prevIssue.slug}`}
                className="group flex flex-col rounded-xl border border-card-border bg-card-bg p-4 transition-colors hover:border-blue-500/40"
              >
                <span className="text-xs text-muted">Previous Issue</span>
                <span className="mt-1 text-sm font-medium text-foreground group-hover:text-blue-300 transition-colors">
                  #{prevIssue.frontmatter.issue} — {prevIssue.frontmatter.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextIssue ? (
              <Link
                href={`/newsletter/${nextIssue.slug}`}
                className="group flex flex-col rounded-xl border border-card-border bg-card-bg p-4 text-right transition-colors hover:border-blue-500/40"
              >
                <span className="text-xs text-muted">Next Issue</span>
                <span className="mt-1 text-sm font-medium text-foreground group-hover:text-blue-300 transition-colors">
                  #{nextIssue.frontmatter.issue} — {nextIssue.frontmatter.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
