import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Agentic Data Stack",
  description:
    "Deep-dive articles on agentic data architecture, autonomous data engineering, and the evolution of modern data stacks for AI agents.",
  openGraph: {
    title: "Blog — Agentic Data Stack",
    description:
      "Deep-dive articles on agentic data architecture and autonomous data engineering.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <section className="mx-auto max-w-4xl px-6 pb-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              Deep dives into agentic data architecture, autonomous pipelines,
              and the components reshaping how data teams operate.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-card-border bg-card-bg/50 p-12 text-center">
              <p className="text-muted">No posts yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {posts.map((post, i) => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.frontmatter.title}
                  description={post.frontmatter.description}
                  date={post.frontmatter.date}
                  author={post.frontmatter.author}
                  readingTime={post.readingTime}
                  tags={post.frontmatter.tags}
                  featured={i === 0}
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
