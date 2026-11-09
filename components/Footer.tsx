"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  localPath,
  calendarUrl,
  linkedinUrl,
  type Locale,
} from "@/lib/community";
export default function Footer() {
  const path = usePathname();
  const locale: Locale =
    path === "/zh" || path.startsWith("/zh/") ? "zh" : "en";
  const zh = locale === "zh";
  return (
    <footer className="community-footer">
      <div className="site-width">
        <div className="footer-top">
          <div>
            <p className="eyebrow">STAY IN THE LOOP</p>
            <h2>
              {zh ? "保持交流，持续探索。" : "Keep the conversation going."}
            </h2>
            <p>
              {zh
                ? "关注社区活动、技术分享与实践总结。"
                : "Follow community meetups, technical talks, and lessons from practice."}
            </p>
          </div>
          <a
            className="button"
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {zh ? "关注 Luma 活动日历 ↗" : "Follow our Luma calendar ↗"}
          </a>
        </div>
        <div className="footer-bottom">
          <div>
            <Link className="brand" href={localPath("/", locale)}>
              Agentic Data Stack
            </Link>
            <p>
              {zh
                ? "开放 · 厂商中立 · 实践驱动"
                : "Open · Vendor-neutral · Practice-driven"}
            </p>
          </div>
          <div className="footer-links">
            {[
              ["/events", zh ? "活动" : "Events"],
              ["/cfp", zh ? "征集分享" : "CFP"],
              ["/blog", zh ? "博客" : "Blog"],
              ["/resources", zh ? "资源" : "Resources"],
              ["/about", zh ? "关于" : "About"],
              ["/newsletter", zh ? "订阅与往期" : "Newsletter"],
            ].map(([href, label]) => (
              <Link key={href} href={localPath(href, locale)}>
                {label}
              </Link>
            ))}
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
