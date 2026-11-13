import settings from "@/content/newsletter-settings.json";

export default function SubscribeForm({ compact, locale = "en" }: { compact?: boolean; locale?: "en" | "zh" }) {
  const zh = locale === "zh";
  const username = settings.buttondownUsername;
  const form = <form action={`https://buttondown.com/api/emails/embed-subscribe/${encodeURIComponent(username)}`} method="post" className="compact-subscribe">
    <label className="subscribe-email-label">
      <span className="sr-only">{zh ? "邮箱地址" : "Email address"}</span>
      <input type="email" name="email" aria-label={zh ? "邮箱地址" : "Email address"} autoComplete="email" placeholder="your@email.com" required className="subscribe-input"/>
    </label>
    <button type="submit" className="button">{zh ? "订阅" : "Subscribe"}</button>
    <p className="subscribe-credit"><a href={`https://buttondown.com/refer/${encodeURIComponent(username)}`} target="_blank" rel="noopener noreferrer">Powered by Buttondown.</a></p>
  </form>;
  if (compact) return form;
  return <div className="subscribe-card rounded-2xl">
    <div className="subscribe-card-head"><div>
      <h3>{zh ? "Agentic Data Stack 周刊" : "Agentic Data Stack Weekly"}</h3>
      <p>{zh ? "为数据工程师与团队负责人整理数据基础设施、Agent 工具与社区动态。" : "Curated news on data infrastructure, agent tooling, and the evolving data stack. For data engineers and team leaders."}</p>
    </div></div>
    {form}
  </div>;
}
