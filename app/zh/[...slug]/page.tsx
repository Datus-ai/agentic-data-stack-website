import { notFound } from "next/navigation";
import ChineseContent, {
  chinesePaths,
  chineseTitle,
} from "@/components/community/ChineseContent";
import { pageMetadata } from "@/lib/community";
export const dynamicParams = false;
export function generateStaticParams() {
  return chinesePaths().map((slug) => ({ slug }));
}
type Props = { params: Promise<{ slug: string[] }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const t = chineseTitle(slug);
  if (!t) return {};
  return pageMetadata(
    { en: t.title, zh: t.title },
    { en: t.description, zh: t.description },
    `/${slug.join("/")}`,
    "zh",
  );
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!chinesePaths().some((p) => p.join("/") === slug.join("/"))) notFound();
  return <ChineseContent slug={slug} />;
}
