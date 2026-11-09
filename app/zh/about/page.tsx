import { About } from "@/components/community/Pages";
import { pageMetadata, communityIntro } from "@/lib/community";
export const metadata = pageMetadata(
  { en: "About the community", zh: "关于社区" },
  communityIntro,
  "/about",
  "zh",
);
export default function Page() {
  return <About locale="zh" />;
}
