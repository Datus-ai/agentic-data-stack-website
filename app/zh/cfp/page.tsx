import { Cfp } from "@/components/community/Pages";
import { pageMetadata, communityIntro } from "@/lib/community";
export const metadata = pageMetadata(
  { en: "Call for Proposals", zh: "征集分享" },
  communityIntro,
  "/cfp",
  "zh",
);
export default function Page() {
  return <Cfp locale="zh" />;
}
