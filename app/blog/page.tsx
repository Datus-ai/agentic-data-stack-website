import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Agentic Data Stack Blog: Architecture & Best Practices",
  description:
    "Learn how to build data systems for AI agents. Deep-dive articles on agentic architecture, evaluation frameworks, implementation patterns, and real-world case studies.",
  openGraph: {
    title: "Agentic Data Stack Blog: Architecture & Best Practices",
    description:
      "Learn how to build data systems for AI agents. Deep-dive on agentic architecture, evaluation frameworks, and real-world implementation patterns.",
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
                  isDraft={post.isDraft}
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
