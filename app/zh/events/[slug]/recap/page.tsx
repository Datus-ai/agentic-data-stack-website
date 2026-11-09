import { notFound } from "next/navigation";
import { Recap } from "@/components/community/Pages";
import { getEvents, getEvent } from "@/lib/events";
import { pageMetadata } from "@/lib/community";
export const dynamicParams = false;
export function generateStaticParams() {
  const events = getEvents().filter((e) => e.recap);
  return events.length
    ? events.map((e) => ({ slug: e.slug }))
    : [{ slug: "__unpublished" }];
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const e = getEvent(slug);
  return e?.recap
    ? pageMetadata(
        e.recap.title,
        e.recap.summary,
        `/events/${slug}/recap`,
        "zh",
      )
    : {};
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event?.recap) notFound();
  return <Recap event={event} locale="zh" />;
}
