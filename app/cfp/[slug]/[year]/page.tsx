import EventUrlRedirect from "@/components/community/EventUrlRedirect";
import { getCanonicalEventParams } from "@/lib/events";
import { pageMetadata, localPath, communityIntro } from "@/lib/community";
export const dynamicParams = false;
export function generateStaticParams() { return getCanonicalEventParams(); }
export const metadata = { ...pageMetadata({ en: "Call for Proposals", zh: "征集分享" },communityIntro,"/cfp","en"), robots: { index: false, follow: true } };
export default function Page() { return <EventUrlRedirect to={localPath("/cfp","en")} locale="en"/>; }
