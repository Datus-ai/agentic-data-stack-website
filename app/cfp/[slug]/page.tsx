import { notFound } from "next/navigation";
import { Cfp } from "@/components/community/Pages";
import { getEvents, getEvent } from "@/lib/events";
import { pageMetadata } from "@/lib/community";
export const dynamicParams = false;
export function generateStaticParams() {
  return getEvents().map((e) => ({ slug: e.slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const e = getEvent(slug);
  return e ? pageMetadata(e.title, e.description, `/cfp/${slug}`, "en") : {};
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();
  return <Cfp event={event} locale="en" />;
}
