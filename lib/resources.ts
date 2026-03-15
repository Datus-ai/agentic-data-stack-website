import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/resources");

export interface ResourceFrontmatter {
  title: string;
  slug: string;
  description: string;
  type: "overview" | "component" | "case-study" | "article";
  category: string;
  tags: string[];
  author: { name: string; url?: string };
  date: string;
  component?: {
    website?: string;
    github?: string;
    license?: string;
    mcpSupport?: boolean;
    cliSupport?: boolean;
    agentSkills?: { name: string; url: string }[];
  };
  externalUrl?: string;
  image?: string;
  featured?: boolean;
  draft?: boolean;
}

export interface Resource {
  frontmatter: ResourceFrontmatter;
  content: string;
}

export function getResourceBySlug(
  category: string,
  slug: string
): Resource | null {
  const filePath = path.join(CONTENT_DIR, category, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    frontmatter: {
      ...data,
      slug,
      category,
    } as ResourceFrontmatter,
    content,
  };
}

export function getCategoryOverview(category: string): Resource | null {
  const filePath = path.join(CONTENT_DIR, category, "_index.mdx");
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    frontmatter: {
      ...data,
      slug: "_index",
      category,
    } as ResourceFrontmatter,
    content,
  };
}

export function getResourcesByCategory(category: string): Resource[] {
  const dir = path.join(CONTENT_DIR, category);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") && f !== "_index.mdx")
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "");
      return getResourceBySlug(category, slug)!;
    })
    .filter((r) => r && !r.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getAllResources(): Resource[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const categoryDirs = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  return categoryDirs.flatMap((cat) => getResourcesByCategory(cat));
}

export function getRelatedResources(
  resource: Resource,
  limit = 3
): Resource[] {
  const all = getAllResources();
  return all
    .filter((r) => r.frontmatter.slug !== resource.frontmatter.slug)
    .filter(
      (r) =>
        r.frontmatter.category === resource.frontmatter.category ||
        r.frontmatter.tags?.some((t) =>
          resource.frontmatter.tags?.includes(t)
        )
    )
    .slice(0, limit);
}
