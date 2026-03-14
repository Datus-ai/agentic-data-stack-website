import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export async function compileMdx(
  source: string
): Promise<MDXRemoteSerializeResult> {
  return serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypePrettyCode,
          {
            theme: "github-dark-dimmed",
            keepBackground: true,
          },
        ],
      ],
    },
  });
}
