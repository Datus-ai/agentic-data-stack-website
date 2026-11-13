"use client";
import { useEffect } from "react";
import type { Locale } from "@/lib/community";
export default function EventUrlRedirect({ to, locale }: { to: string; locale: Locale }) {
  useEffect(() => {
    window.location.replace(`${to}${window.location.search}${window.location.hash}`);
  }, [to]);
  return <main className="site-width page-hero"><p>{locale === "zh" ? "活动地址已更新。" : "This event has a new address."}</p><a className="text-link" href={to}>{locale === "zh" ? "前往活动页面 →" : "Continue to the event →"}</a></main>;
}
