import fs from "node:fs";
import path from "node:path";
import type { Localized, Locale } from "./community";
export interface CommunityEvent {
  slug: string;
  previousSlugs?: string[];
  title: Localized;
  description: Localized;
  startAt: string;
  endAt: string;
  timezone: string;
  city: Localized;
  venue: Localized;
  language: Localized;
  registrationStatus: "open" | "closed";
  registrationUrl: string;
  registrationEmbed: string;
  lumaId: string;
  registrationNote: Localized;
  hosts: { name: string; url: string }[];
  organizerIds: string[];
  cfp: {
    status: "coming-soon" | "open" | "closed";
    formUrl: string | null;
    deadline: string | null;
    notificationDate: string | null;
    formats: Localized;
  };
  agenda: { time: string; title: Localized; speaker: Localized }[];
  agendaConfirmed: boolean;
  recap: {
    title: Localized;
    summary: Localized;
    takeaways: Localized[];
    photos: { src: string; alt: Localized }[];
    sessions: {
      title: Localized;
      speaker: string;
      summary: Localized;
      recordingUrl?: string;
      slidesUrl?: string;
      codeUrl?: string;
    }[];
  } | null;
  testimonials: {
    quote: Localized;
    name: string;
    role: Localized;
    consent: boolean;
  }[];
}
const dir = path.join(process.cwd(), "content/events");
export function getEvents(): CommunityEvent[] {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map(
      (f) =>
        JSON.parse(
          fs.readFileSync(path.join(dir, f), "utf8"),
        ) as CommunityEvent,
    )
    .sort((a, b) => a.startAt.localeCompare(b.startAt));
}
export function getEvent(slug: string) {
  return getEvents().find((e) => e.slug === slug || e.previousSlugs?.includes(slug));
}
export function isPast(event: CommunityEvent, now = Date.now()) {
  return Date.parse(event.endAt) <= now;
}
export function registrationOpen(event: CommunityEvent, now = Date.now()) {
  return !isPast(event, now) && event.registrationStatus === "open";
}
export function cfpOpen(event: CommunityEvent, now = Date.now()) {
  return (
    !isPast(event, now) &&
    event.cfp.status === "open" &&
    !!event.cfp.formUrl &&
    (!event.cfp.deadline || Date.parse(event.cfp.deadline) > now)
  );
}
export function eventDate(event: CommunityEvent, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: event.timezone,
  }).format(new Date(event.startAt));
}
export function eventTime(event: CommunityEvent) {
  const f = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: event.timezone,
  });
  const offset = new Intl.DateTimeFormat("en-US", { timeZone: event.timezone, timeZoneName: "shortOffset" }).formatToParts(new Date(event.startAt)).find(p => p.type === "timeZoneName")?.value.replace("GMT", "UTC") || event.timezone;
  return `${f.format(new Date(event.startAt))}–${f.format(new Date(event.endAt))} (${offset})`;
}

export function cfpState(event: CommunityEvent, now = Date.now()): "open" | "closed" | "coming-soon" {
  if (isPast(event, now) || event.cfp.status === "closed" || (event.cfp.deadline && Date.parse(event.cfp.deadline) <= now)) return "closed";
  return cfpOpen(event, now) ? "open" : "coming-soon";
}

export function getEventRouteParams() {
  return getEvents().flatMap(event => (event.previousSlugs || []).map(slug => ({ slug })));
}

export function getCanonicalEventParams() {
  return getEvents().map(event => {
    const [slug, year] = event.slug.split("/");
    return { slug, year };
  });
}
