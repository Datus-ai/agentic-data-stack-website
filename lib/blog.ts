import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { calculateReadingTime } from "./reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  keywords?: string[];
  image?: string;
  tags?: string[];
  draft?: boolean;
}

export interface BlogPost {
  frontmatter: BlogFrontmatter;
  content: string;
  slug: string;
  readingTime: number;
  format: "md" | "mdx";
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const filePath = fs.existsSync(mdPath)
    ? mdPath
    : fs.existsSync(mdxPath)
      ? mdxPath
      : null;

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  if (data.draft) return null;

  return {
    frontmatter: data as BlogFrontmatter,
    content,
    slug,
    readingTime: calculateReadingTime(content),
    format: filePath.endsWith(".mdx") ? "mdx" : "md",
  };
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(/\.mdx?$/, "");
      return getBlogPostBySlug(slug);
    })
    .filter((p): p is BlogPost => p !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getBlogPostSlugs(): string[] {
  return getAllBlogPosts().map((p) => p.slug);
}

export function getRecentBlogPosts(limit: number): BlogPost[] {
  return getAllBlogPosts().slice(0, limit);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter((p) =>
    p.frontmatter.tags?.includes(tag)
  );
}
