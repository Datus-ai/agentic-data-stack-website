import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
export function getTranslation(kind: "blog" | "newsletter", slug: string) {
  const file = path.join(process.cwd(), "content/zh", kind, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return {
    title: String(data.title),
    description: String(data.description),
    content,
  };
}
