import Link from "next/link";
import { getRecentBlogPosts } from "@/lib/blog";
import { getLatestNewsletter } from "@/lib/newsletter";
import { categories } from "@/lib/categories";

export default function LatestContent() {
  const recentPosts = getRecentBlogPosts(1);
  const latestNewsletter = getLatestNewsletter();
  const totalComponents = categories.reduce((acc, cat) => acc + cat.components.length, 0);

  const latestPost = recentPosts[0];

  return (
    <section className="relative py-20 px-6">
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
            Latest from the community
          </h2>
          <div className="h-px flex-1 ml-6 bg-gradient-to-r from-card-border to-transparent" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Latest Blog Post */}
          {latestPost ? (
            <Link
              href={`/blog/${latestPost.slug}`}
              className="group relative flex flex-col rounded-2xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/5"
            >
              <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-violet-400">Blog</span>
              </div>

              <h3 className="text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-violet-300 line-clamp-2">
                {latestPost.frontmatter.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-2">
                {latestPost.frontmatter.description}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-muted">
                <span>{latestPost.readingTime} min read</span>
                <span className="h-1 w-1 rounded-full bg-card-border" />
                <time dateTime={latestPost.frontmatter.date}>
                  {new Date(latestPost.frontmatter.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
            </Link>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-card-border p-6 text-center">
              <p className="text-sm text-muted">Blog coming soon</p>
            </div>
          )}

          {/* Latest Newsletter */}
          {latestNewsletter ? (
            <Link
              href={`/newsletter/${latestNewsletter.slug}`}
              className="group relative flex flex-col rounded-2xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-blue-400">
                  Newsletter #{latestNewsletter.frontmatter.issue}
                </span>
              </div>

              <h3 className="text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-blue-300 line-clamp-2">
                {latestNewsletter.frontmatter.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-2">
                {latestNewsletter.frontmatter.description}
              </p>
              <div className="mt-4 text-xs text-muted">
                <time dateTime={latestNewsletter.frontmatter.date}>
                  {new Date(latestNewsletter.frontmatter.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
            </Link>
          ) : (
            <Link
              href="/newsletter"
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-card-border p-6 text-center transition-colors hover:border-blue-500/30"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-3">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <p className="text-sm font-medium text-foreground">Subscribe to the newsletter</p>
              <p className="mt-1 text-xs text-muted">Weekly curated insights</p>
            </Link>
          )}

          {/* Resources stat */}
          <Link
            href="/resources"
            className="group relative flex flex-col rounded-2xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/5"
          >
            <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
                </svg>
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-green-400">Resources</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">{totalComponents}</span>
              <span className="text-sm text-muted">components tracked</span>
            </div>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              Across {categories.length} categories — from catalog services to data agents.
              The living wiki of the agentic data stack ecosystem.
            </p>
            <div className="mt-4 text-sm font-medium text-green-400 transition-colors group-hover:text-green-300">
              Explore resources &rarr;
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
