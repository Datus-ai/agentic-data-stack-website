import { Home } from "@/components/community/Pages";
import { pageMetadata, communityIntro } from "@/lib/community";
export const metadata = pageMetadata(
  { en: "Data systems for the agentic era", zh: "共探 Agent 时代的数据技术栈" },
  communityIntro,
  "/",
  "en",
);
export default function Page() {
  return <Home locale="en" />;
}
