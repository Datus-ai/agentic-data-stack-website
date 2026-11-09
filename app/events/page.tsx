import { Events } from "@/components/community/Pages";
import { pageMetadata, communityIntro } from "@/lib/community";
export const metadata = pageMetadata(
  { en: "Community events", zh: "社区活动" },
  communityIntro,
  "/events",
  "en",
);
export default function Page() {
  return <Events locale="en" />;
}
