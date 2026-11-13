import { notFound } from "next/navigation";
import { EventDetail } from "@/components/community/Pages";
import { getCanonicalEventParams, getEvent } from "@/lib/events";
import { pageMetadata } from "@/lib/community";
export const dynamicParams = false;
export function generateStaticParams() { return getCanonicalEventParams(); }
type Props = { params: Promise<{ slug: string; year: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug, year } = await params;
  const event = getEvent(`${slug}/${year}`);
  return event ? pageMetadata(event.title,event.description,`/events/${event.slug}`,"zh") : {};
}
export default async function Page({ params }: Props) {
  const { slug, year } = await params;
  const event = getEvent(`${slug}/${year}`);
  if (!event) notFound();
  return <EventDetail event={event} locale="zh" />;
}
