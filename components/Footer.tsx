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
        <section className="footer-participate" aria-labelledby="footer-participate-title">
          <p className="eyebrow">{zh ? "参与社区" : "TAKE PART"}</p>
          <h2 id="footer-participate-title">{zh ? "下一步，一起参与。" : "Find your way into the community."}</h2>
          <div className="footer-actions">
            <article className="footer-action-card">
              <p className="eyebrow">{zh ? "面向讲者 / FOR SPEAKERS" : "FOR SPEAKERS"}</p>
              <h3>{zh ? "分享你的实践与经验。" : "Share what you've learned."}</h3>
              <p>{zh ? "带来真实架构、落地经验与值得讨论的问题，成为下一场活动的分享者。" : "Bring your architecture, production lessons, and open questions to a future community event."}</p>
              <div className="button-row">
                <Link className="button" href={localPath("/cfp", locale)}>{zh ? "查看分享征集" : "Explore Call for Proposals"} ↗</Link>
              </div>
            </article>
            <article className="footer-action-card">
              <p className="eyebrow">{zh ? "面向专业人士 / FOR PROFESSIONALS" : "FOR PROFESSIONALS"}</p>
              <h3>{zh ? "持续学习，连接同行。" : "Keep learning. Meet your peers."}</h3>
              <p>{zh ? "订阅社区精选，或参加下一场活动，与 Data Agent 和数据基础设施领域的实践者交流。" : "Get community highlights in your inbox or join an upcoming event with Data Agent and data infrastructure practitioners."}</p>
              <div className="button-row">
                <Link className="button" href={localPath("/newsletter", locale)}>{zh ? "订阅 Newsletter" : "Subscribe to the newsletter"} →</Link>
                <Link className="button button-outline" href={`${localPath("/events", locale)}#upcoming`}>{zh ? "查看近期活动" : "View upcoming events"} ↗</Link>
              </div>
            </article>
          </div>
        </section>
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
            <a href={calendarUrl} target="_blank" rel="noopener noreferrer">Luma ↗</a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
