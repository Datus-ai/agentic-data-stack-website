import fs from "fs";
import path from "path";
import matter from "gray-matter";

const NEWSLETTER_DIR = path.join(process.cwd(), "content/newsletter");

export interface NewsletterFrontmatter {
  title: string;
  description: string;
  date: string;
  issue: number;
  tags?: string[];
  draft?: boolean;
}

export interface NewsletterIssue {
  frontmatter: NewsletterFrontmatter;
  content: string;
  slug: string;
  format: "md" | "mdx";
}

export function getNewsletterBySlug(slug: string): NewsletterIssue | null {
  const mdPath = path.join(NEWSLETTER_DIR, `${slug}.md`);
  const mdxPath = path.join(NEWSLETTER_DIR, `${slug}.mdx`);
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
    frontmatter: data as NewsletterFrontmatter,
    content,
    slug,
    format: filePath.endsWith(".mdx") ? "mdx" : "md",
  };
}

export function getAllNewsletterIssues(): NewsletterIssue[] {
  if (!fs.existsSync(NEWSLETTER_DIR)) return [];

  return fs
    .readdirSync(NEWSLETTER_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(/\.mdx?$/, "");
      return getNewsletterBySlug(slug);
    })
    .filter((i): i is NewsletterIssue => i !== null)
    .sort((a, b) => b.frontmatter.issue - a.frontmatter.issue);
}

export function getNewsletterSlugs(): string[] {
  return getAllNewsletterIssues().map((i) => i.slug);
}

export function getLatestNewsletter(): NewsletterIssue | null {
  const all = getAllNewsletterIssues();
  return all.length > 0 ? all[0] : null;
}
