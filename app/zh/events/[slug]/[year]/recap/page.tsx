import { notFound } from "next/navigation";
import { Recap } from "@/components/community/Pages";
import { getEvents, getEvent } from "@/lib/events";
import { pageMetadata } from "@/lib/community";
export const dynamicParams = false;
export function generateStaticParams() {
  const events = getEvents().filter(e => e.recap);
  return events.length ? events.map(e => { const [slug, year] = e.slug.split("/"); return {slug, year}; }) : [{slug:"__unpublished", year:"__unpublished"}];
}
type Props = {params:Promise<{slug:string;year:string}>};
export async function generateMetadata({params}:Props) {const {slug,year}=await params;const e=getEvent(`${slug}/${year}`);return e?.recap ? pageMetadata(e.recap.title,e.recap.summary,`/events/${e.slug}/recap`,"zh") : {};}
export default async function Page({params}:Props) {const {slug,year}=await params;const event=getEvent(`${slug}/${year}`);if(!event?.recap)notFound();return <Recap event={event} locale="zh"/>;}
