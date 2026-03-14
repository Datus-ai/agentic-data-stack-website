import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TableOfContents from "@/components/blog/TableOfContents";
import TagBadge from "@/components/TagBadge";
import { getBlogPostBySlug, getBlogPostSlugs } from "@/lib/blog";
import { compileMdx } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

export const dynamicParams = false;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getBlogPostSlugs();
  if (slugs.length === 0) {
    return [{ slug: "__placeholder" }];
  }
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.frontmatter.title} — Agentic Data Stack Blog`,
    description: post.frontmatter.description,
    keywords: post.frontmatter.keywords,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
      images: post.frontmatter.image
        ? [{ url: post.frontmatter.image, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const formattedDate = new Date(post.frontmatter.date).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    author: {
      "@type": "Organization",
      name: post.frontmatter.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Agentic Data Stack",
      url: "https://agenticdatastack.org",
    },
    image: post.frontmatter.image,
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <article className="mx-auto max-w-6xl px-6">
          <div className="relative lg:grid lg:grid-cols-[1fr_200px] lg:gap-12">
            {/* Main column: header + body at consistent width */}
            <div className="mx-auto w-full max-w-3xl lg:mx-0 lg:max-w-none">
              {/* Header */}
              <header className="pb-8 border-b border-card-border">
                <div className="mb-4 flex items-center gap-3 text-sm text-muted">
                  <a
                    href="/blog"
                    className="text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    Blog
                  </a>
                  <span className="text-card-border">/</span>
                  <time dateTime={post.frontmatter.date}>{formattedDate}</time>
                  <span className="h-1 w-1 rounded-full bg-card-border" />
                  <span>{post.readingTime} min read</span>
                </div>

                <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  {post.frontmatter.title}
                </h1>

                <p className="mt-4 text-lg leading-relaxed text-muted">
                  {post.frontmatter.description}
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-blue-500 text-sm font-bold text-white">
                    {post.frontmatter.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      {post.frontmatter.author}
                    </div>
                    <div className="text-xs text-muted">{formattedDate}</div>
                  </div>
                </div>
              </header>

              {/* Content */}
              <div className="mt-10 prose-invert prose prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-muted prose-p:leading-relaxed prose-a:text-violet-400 prose-a:no-underline hover:prose-a:text-violet-300 prose-strong:text-foreground prose-code:text-violet-300 prose-code:bg-violet-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-card-bg prose-pre:border prose-pre:border-card-border prose-img:rounded-xl prose-img:border prose-img:border-card-border prose-li:text-muted prose-blockquote:border-violet-500/50 prose-blockquote:text-muted">
                <MDXRemote
                  source={post.content}
                  options={{
                    mdxOptions: {
                      format: post.format,
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [
                        rehypeSlug,
                        [
                          rehypePrettyCode,
                          { theme: "github-dark-dimmed", keepBackground: true },
                        ],
                      ],
                    },
                  }}
                />
              </div>

              {/* Tags */}
              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <div className="mt-12 flex flex-wrap gap-2 border-t border-card-border pt-8">
                  {post.frontmatter.tags.map((tag) => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                </div>
              )}

              {/* Back link */}
              <div className="mt-8">
                <a
                  href="/blog"
                  className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                >
                  &larr; All articles
                </a>
              </div>
            </div>

            {/* TOC sidebar */}
            <aside className="hidden lg:block">
              <div className="pt-8">
                <TableOfContents content={post.content} />
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
