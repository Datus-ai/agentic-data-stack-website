import { notFound } from "next/navigation";
import { EventDetail } from "@/components/community/Pages";
import { getEventRouteParams, getEvent } from "@/lib/events";
import EventUrlRedirect from "@/components/community/EventUrlRedirect";
import { localPath } from "@/lib/community";
import { pageMetadata } from "@/lib/community";
export const dynamicParams = false;
export function generateStaticParams() {
  return getEventRouteParams();
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) return {};
  const metadata = pageMetadata(e.title, e.description, `/events/${e.slug}`, "en");
  return slug === e.slug ? metadata : { ...metadata, robots: { index: false, follow: true } };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();
  if (slug !== event.slug) return <EventUrlRedirect to={localPath(`/events/${event.slug}`, "en")} locale="en" />;
  return <EventDetail event={event} locale="en" />;
}
