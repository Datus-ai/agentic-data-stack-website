import Link from "next/link";
import Navbar from "@/components/Navbar";
import SubscribeForm from "@/components/newsletter/SubscribeForm";
import Footer from "@/components/Footer";
import LumaEmbed from "./LumaEmbed";
import {
  communityIntro,
  definition,
  topics,
  organizations,
  localPath,
  text,
  calendarUrl,
  calendarEmbed,
  type Locale,
} from "@/lib/community";
import {
  getEvents,
  isPast,
  registrationOpen,
  eventDate,
  eventTime,
  type CommunityEvent,
} from "@/lib/events";
import { getTranslation } from "@/lib/translated-content";
import { getCfpConfig, isCfpOpen } from "@/lib/cfp";
import { getRecentBlogPosts } from "@/lib/blog";
export function Shell({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <>
      <Navbar />
      <main
        lang={locale === "zh" ? "zh-CN" : "en"}
        id="main-content"
        className="community-main"
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
function SectionTitle({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {children && <p className="section-intro">{children}</p>}
    </div>
  );
}
export function Founders({
  locale,
  detail = false,
}: {
  locale: Locale;
  detail?: boolean;
}) {
  const zh = locale === "zh";
  return (
    <section className="site-section founder-section" id="founders">
      <div className="site-width">
        <SectionTitle
          eyebrow="CO-INITIATED BY"
          title={zh ? "共同发起，一起建设。" : "Co-initiated. Built together."}
        >
          {zh
            ? "DatusAI、NebulaGraph 与 StarRocks 共同发起。欢迎企业、开源项目和个人参与共建。"
            : "Co-initiated by DatusAI, NebulaGraph, and StarRocks. Open to contributions from companies, open-source projects, and individuals."}
        </SectionTitle>
        <div className="founder-grid">
          {organizations.map((o) => (
            <a
              className="founder"
              key={o.id}
              href={o.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={`founder-mark ${o.id === "datus" ? "founder-datus" : ""}`}>
                <img
                  src={o.logo}
                  alt=""
                  width={o.id !== "datus" ? "44" : "180"}
                  height="48"
                />
                {o.id !== "datus" && (
                  <strong className="organization-name" aria-hidden="true">{o.name}</strong>
                )}
                <span className="sr-only">{o.name}</span>
              </div>
              {detail && <p>{text(o.description, locale)}</p>}
              <span>{zh ? "访问官网" : "Visit website"} ↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
export function EventCard({
  event,
  locale,
}: {
  event: CommunityEvent;
  locale: Locale;
}) {
  const zh = locale === "zh";
  return (
    <article className="event-card">
      <div className="event-date">
        <span>
          {new Intl.DateTimeFormat(zh ? "zh-CN" : "en-US", {
            month: "short",
            timeZone: event.timezone,
          }).format(new Date(event.startAt))}
        </span>
        <strong>
          {new Intl.DateTimeFormat("en-US", {
            day: "2-digit",
            timeZone: event.timezone,
          }).format(new Date(event.startAt))}
        </strong>
        <span>{new Date(event.startAt).getUTCFullYear()}</span>
      </div>
      <div className="event-card-body">
        <div className="meta-line">
          <span>{text(event.city, locale)}</span>
          <span>{text(event.language, locale)}</span>
          <span className="status-pill">
            {isPast(event)
              ? zh
                ? "已结束"
                : "Past event"
              : registrationOpen(event)
                ? zh
                  ? "开放报名"
                  : "Registration open"
                : zh
                  ? "报名已关闭"
                  : "Registration closed"}
          </span>
        </div>
        <h3>
          <Link href={localPath(`/events/${event.slug}`, locale)}>
            {text(event.title, locale)}
          </Link>
        </h3>
        <p>{text(event.description, locale)}</p>
        <p className="event-hosts">
          {zh ? "主办方：" : "Hosted by: "}
          {event.hosts.map((host,index) => <span key={host.name}><a href={host.url} target="_blank" rel="noopener noreferrer">{host.name}</a>{index < event.hosts.length - 1 ? " · " : ""}</span>)}
        </p>
        <Link
          className="text-link"
          href={localPath(
            `/events/${event.slug}${event.recap ? "/recap" : ""}`,
            locale,
          )}
        >
          {event.recap
            ? zh
              ? "阅读活动回顾"
              : "Read recap"
            : zh
              ? "查看活动"
              : "Explore event"}{" "}
          →
        </Link>
      </div>
    </article>
  );
}
export function Voices({ locale }: { locale: Locale }) {
  const quotes = getEvents().flatMap((e) =>
    e.testimonials
      .filter((q) => q.consent)
      .map((q) => ({ ...q, slug: e.slug })),
  );
  if (!quotes.length) return null;
  return (
    <section className="site-section">
      <div className="site-width">
        <SectionTitle
          eyebrow="COMMUNITY VOICES"
          title={locale === "zh" ? "来自社区的声音" : "From the community"}
        />
        <div className="topic-grid">
          {quotes.slice(0, 3).map((q, i) => (
            <figure key={i} className="quote">
              <blockquote>“{text(q.quote, locale)}”</blockquote>
              <figcaption>
                {q.name} · {text(q.role, locale)}
                <br />
                <Link href={localPath(`/events/${q.slug}`, locale)}>
                  {locale === "zh" ? "查看相关活动 →" : "View event →"}
                </Link>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
function Upcoming({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const events = getEvents()
    .filter((e) => !isPast(e))
    .slice(0, 3);
  return (
    <section className={`site-section ${compact ? "home-upcoming" : ""}`} id="upcoming">
      <div className="site-width">
        <div className="section-heading-row">
          <SectionTitle
            eyebrow={compact ? undefined : "MEET IN PERSON"}
            title={
              compact
                ? (locale === "zh" ? "近期活动" : "Upcoming events")
                : locale === "zh"
                  ? "下一次，一起讨论。"
                  : "The next conversation starts here."
            }
          />
          <Link href={localPath("/events", locale)} className="text-link">
            {locale === "zh" ? "全部活动" : "All events"} →
          </Link>
        </div>
        {events.length ? (
          events.map((e) => (
            <EventCard key={e.slug} event={e} locale={locale} />
          ))
        ) : (
          <p className="empty-note">
            {locale === "zh"
              ? "下一场活动正在筹备，欢迎关注社区日历。"
              : "The next meetup is in the works. Follow our community calendar."}
          </p>
        )}
      </div>
    </section>
  );
}
function Recaps({ locale }: { locale: Locale }) {
  const events = getEvents()
    .filter((e) => e.recap)
    .reverse();
  if (!events.length) return null;
  return (
    <section className="site-section">
      <div className="site-width">
        <SectionTitle
          eyebrow="IN CASE YOU MISSED IT"
          title={
            locale === "zh" ? "从交流到实践沉淀" : "Ideas worth coming back to"
          }
        />
        {events.slice(0, 3).map((e) => (
          <EventCard key={e.slug} event={e} locale={locale} />
        ))}
      </div>
    </section>
  );
}
export function Home({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  return (
    <Shell locale={locale}>
      <section className="home-hero">
        <div className="hero-grid site-width">
          <div>
            <p className="eyebrow">
              <span className="live-dot" /> COMMUNITY / DATA × AGENTS
            </p>
            <h1>
              {zh ? (
                <>
                  共探 Agent 时代的
                  <br />
                  <em>数据技术栈。</em>
                </>
              ) : (
                <>
                  Data systems for
                  <br />
                  <em>the agentic era.</em>
                </>
              )}
            </h1>
            <p className="hero-copy">{zh
              ? "一个开放、厂商中立、实践驱动的社区，共探 Data Agent 与下一代数据基础设施。"
              : "An open, vendor-neutral community exploring Data Agents and next-generation data infrastructure through practice and shared experience."}</p>
            <div className="hero-newsletter">
              <h2>{zh ? "订阅社区 Newsletter" : "Stay in the loop"}</h2>
              <p>{zh ? "获取活动预告、技术分享与社区精选。" : "Get upcoming events, technical talks, and community highlights."}</p>
              <SubscribeForm compact locale={locale} />
            </div>
            <p className="hero-principles">
              {zh
                ? "开放 / 厂商中立 / 实践驱动"
                : "OPEN / VENDOR-NEUTRAL / PRACTICE-DRIVEN"}
            </p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="diagram-label">A NEW KIND OF DATA STACK</div>
            <div className="stack-node node-agent">
              DATA AGENT<span>REASON · PLAN · ACT</span>
            </div>
            <div className="stack-connector"><span className="flow-down">↓</span><span className="flow-up">↑</span></div>
            <div className="stack-node node-context">
              CONTEXT<span>SEMANTICS · KNOWLEDGE · METADATA</span>
            </div>
            <div className="stack-connector"><span className="flow-down">↓</span><span className="flow-up">↑</span></div>
            <div className="stack-node node-tools">
              INFRASTRUCTURE<span>CATALOG · LAKEHOUSE · ENGINE · PIPELINE</span>
            </div>
            <div className="diagram-footer">
              <span>GOVERNED</span>
              <span>VERIFIABLE</span>
              <span>HUMAN-IN-THE-LOOP</span>
            </div>
          </div>
        </div>
      </section>
      <Upcoming locale={locale} compact />
      <section className="site-section definition-section" id="architecture">
        <div className="site-width">
          <div className="definition-grid">
            <SectionTitle
              eyebrow="WHAT IS AGENTIC DATA STACK?"
              title={
                zh
                  ? "当 Agent 成为数据系统的使用者与建设者。"
                  : "When agents become users—and builders—of data systems."
              }
            />
            <div>
              <p className="large-copy">{text(definition, locale)}</p>
              <p className="muted-copy">
                {zh
                  ? "Modern Data Stack 围绕人的工作方式构建。Agent 时代既需要更强大的 Data Agent，也需要重新思考数据基础设施的架构与设计。"
                  : "The Modern Data Stack was built around how people work. The agentic era calls for both more capable Data Agents and a fresh look at the infrastructure beneath them."}
              </p>
              <Link className="text-link" href={localPath("/about", locale)}>
                {zh ? "深入理解 Agentic Data Stack" : "Explore the definition"}{" "}
                →
              </Link>
            </div>
          </div>
          <a
            className="architecture-image"
            href="/images/agentic-data-stack-architecture.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/agentic-data-stack-architecture.png"
              alt={
                zh
                  ? "Agentic Data Stack 参考架构：连接 Data Agent、上下文与数据基础设施（图内为英文）"
                  : "Agentic Data Stack reference architecture connecting agents, context, and data infrastructure"
              }
              width="1400"
              height="800"
            />
            <span>
              {zh
                ? "参考架构 · 点击查看原图（英文） ↗"
                : "Reference architecture · Open full-size diagram ↗"}
            </span>
          </a>
          <p className="muted-copy">
            {zh
              ? "从 Agent 的规划与执行，到元数据、语义和业务上下文，再到数据存储、查询与流水线；治理、验证和人的协作贯穿全栈。"
              : "From agent planning and execution, through metadata, semantics, and business context, to data storage, queries, and pipelines. Governance, verification, and human collaboration span the stack."}
          </p>
          <Link className="text-link" href={localPath("/resources", locale)}>
            {zh ? "探索架构中的组件" : "Explore the components"} →
          </Link>
        </div>
      </section>
      <section className="site-section community-section">
        <div className="site-width">
          <SectionTitle
            eyebrow="A COMMUNITY OF PRACTICE"
            title={
              zh
                ? "真实问题，开放交流。"
                : "Real questions. Open conversations."
            }
          >
            {zh
              ? "关注真实问题与生产实践，鼓励不同技术路线的交流。通过 Meetup、技术分享与实践总结，持续共同探索。"
              : "We focus on real problems and production practice, welcoming different technical approaches through meetups, technical talks, and shared lessons."}
          </SectionTitle>
          <div className="topic-grid">
            {topics.slice(0, 3).map((t, i) => (
              <Link
                href={localPath(`/resources/${t.category}`, locale)}
                key={t.category}
                className="topic-card"
              >
                <span className="topic-index">0{i + 1}</span>
                <h3>{text(t.title, locale)}</h3>
                <p>{text(t.description, locale)}</p>
                <span className="text-link">
                  {zh ? "探索相关资源" : "Explore resources"} ↗
                </span>
              </Link>
            ))}
          </div>
          <Link
            className="text-link block-link"
            href={localPath("/about", locale)}
          >
            {zh
              ? "了解全部社区议题与参与方式"
              : "Discover our focus and how to contribute"}{" "}
            →
          </Link>
        </div>
      </section>
      <Founders locale={locale} />
      <CfpBanner locale={locale} />
      <Voices locale={locale} />
      <Recaps locale={locale} />
      <section className="site-section">
        <div className="site-width">
          <div className="section-heading-row">
            <SectionTitle
              eyebrow="FIELD NOTES"
              title={
                zh
                  ? "来自实践的思考"
                  : "Thinking out loud, building in the open."
              }
            />
            <Link className="text-link" href={localPath("/blog", locale)}>
              {zh ? "全部文章" : "All articles"} →
            </Link>
          </div>
          <div className="topic-grid">
            {getRecentBlogPosts(4)
              .filter((p) => !p.isDraft)
              .slice(0, 3)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={localPath(`/blog/${p.slug}`, locale)}
                  className="article-card"
                >
                  <span className="eyebrow">BLOG / {p.frontmatter.date}</span>
                  <h3>
                    {zh
                      ? getTranslation("blog", p.slug)?.title ||
                        p.frontmatter.title
                      : p.frontmatter.title}
                  </h3>
                  <p>
                    {zh
                      ? getTranslation("blog", p.slug)?.description ||
                        p.frontmatter.description
                      : p.frontmatter.description}
                  </p>
                  <span className="text-link">
                    {zh ? "阅读文章" : "Read article"} →
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </Shell>
  );
}
export function CfpBanner({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const open = isCfpOpen(getCfpConfig());
  return (
    <section className="site-section">
      <div className="site-width">
        <div className="cfp-banner">
          <div>
            <p className="eyebrow">CALL FOR PROPOSALS</p>
            <h2>
              {zh
                ? "把你的实践带到现场。"
                : "Bring your experience to the room."}
            </h2>
            <p>
              {open
                ? zh
                  ? "分享你的架构、落地经验与挑战。可选择计划中的活动，也可留待后续排期。"
                  : "Share your architecture, implementation experience, and challenges. Choose a planned event or leave scheduling open."
                : zh
                  ? "社区统一议题征集即将开放。先了解主题、投稿指南与灵活排期方式。"
                  : "Our community call is coming soon. Explore the topics, proposal guidelines, and flexible scheduling."}
            </p>
          </div>
          <Link
            href={localPath("/cfp", locale)}
            className="button"
          >
            {zh ? "查看分享征集" : "View proposal guidelines"} ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
export function About({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  return (
    <Shell locale={locale}>
      <section className="page-hero site-width">
        <p className="eyebrow">ABOUT THE COMMUNITY</p>
        <h1>
          {zh
            ? "共探 Agent 时代的\n数据技术栈。"
            : "A shared space for\nthe next data stack."}
        </h1>
        <p className="hero-copy">{text(communityIntro, locale)}</p>
      </section>
      <section className="site-section">
        <div className="site-width reading-width">
          <SectionTitle
            title={zh ? "我们为什么发起这个社区" : "Why we started"}
          />
          <p className="large-copy">
            {zh
              ? "当 AI Agent 开始成为数据系统的使用者，甚至是建设者，今天的数据基础设施是否已经准备好了？"
              : "As AI agents become users—and even builders—of data systems, is today's infrastructure ready?"}
          </p>
          <p className="muted-copy">{text(definition, locale)}</p>
          <p className="muted-copy">
            {zh
              ? "这一变化不仅需要更强大的 Data Agent，也需要重新思考基础设施。我们连接开发者、数据工程师、架构师、AI 研究者、企业团队和开源社区，分享成功经验，也讨论失败的尝试。"
              : "This shift requires more capable Data Agents and a rethink of infrastructure. We bring developers, engineers, architects, researchers, enterprise teams, and open-source communities together to share successes and failed attempts alike."}
          </p>
          <blockquote className="principle-quote">
            {zh
              ? "关注真实问题，而不只是产品功能；关注生产实践，而不只是 Demo；鼓励不同技术路线的开放交流，而不是寻找唯一的标准答案。"
              : "Real problems beyond product features. Production practice beyond demos. Open discussion across technical approaches, with no single prescribed answer."}
          </blockquote>
        </div>
      </section>
      <section className="site-section">
        <div className="site-width">
          <SectionTitle
            eyebrow="WHAT WE EXPLORE"
            title={zh ? "社区关注的六个方向" : "Six areas of exploration"}
          />
          <div className="topic-grid">
            {topics.map((t, i) => (
              <div key={t.category} className="topic-card">
                <span className="topic-index">0{i + 1}</span>
                <h3>{text(t.title, locale)}</h3>
                <p>{text(t.description, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Founders locale={locale} detail />
      <section className="site-section">
        <div className="site-width">
          <SectionTitle
            eyebrow="MEET, SHARE, BUILD"
            title={zh ? "社区活动与组织方式" : "How we meet and organize"}
          >
            {zh
              ? "通过 Meetup 连接开发者、技术厂商和企业实践团队。每场活动的主办人及组织信息单独标注；经许可的演讲材料、文章和实践总结将持续沉淀在官网。"
              : "Meetups connect developers, technology builders, and enterprise practitioners. Hosts are identified per event; public talks, articles, and lessons are collected on this website with permission."}
          </SectionTitle>
          {getEvents()
            .filter((e) => !isPast(e))
            .slice(0, 1)
            .map((e) => (
              <EventCard key={e.slug} event={e} locale={locale} />
            ))}
        </div>
      </section>
      <section className="site-section">
        <div className="site-width">
          <SectionTitle
            eyebrow="CONTRIBUTE"
            title={zh ? "一起建设社区" : "Help shape the community"}
          >
            {zh
              ? "欢迎通过技术分享、实践案例、内容贡献与活动组织参与。"
              : "Contribute a technical talk, a case study, an article, or your experience organizing events."}
          </SectionTitle>
          <div className="button-row">
            <Link className="button" href={localPath("/cfp", locale)}>
              {zh ? "查看分享征集" : "Explore speaking opportunities"} →
            </Link>
            <a
              className="button button-outline"
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {zh ? "关注活动与联系主办人" : "Follow events & contact hosts"} ↗
            </a>
          </div>
        </div>
      </section>
    </Shell>
  );
}
export function Events({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const events = getEvents();
  const upcoming = events.filter((e) => !isPast(e));
  const past = events.filter((isPastEvent) => isPast(isPastEvent)).reverse();

  return (
    <Shell locale={locale}>
      <section className="page-hero site-width">
        <p className="eyebrow">COMMUNITY / EVENTS</p>
        <h1>
          {zh
            ? "在线上连接，\n在现场交流。"
            : "Meet the people.\nExplore the practice."}
        </h1>
        <p className="hero-copy">
          {zh
            ? "围绕 Data Agent 与下一代数据基础设施，分享架构设计、落地经验与真实挑战。"
            : "Architecture, implementation lessons, and real challenges at the intersection of Data Agents and next-generation infrastructure."}
        </p>
        <div className="button-row">
          <a className="button" href="#upcoming">
            {zh ? "查看近期活动" : "Upcoming events"} ↓
          </a>
          <Link
            className="button button-outline"
            href={localPath("/cfp", locale)}
          >
            {zh ? "分享征集" : "Call for Proposals"} →
          </Link>
        </div>
      </section>
      <section className="site-section" id="upcoming">
        <div className="site-width">
          <SectionTitle title={zh ? "即将举行" : "Coming up"} />
          {upcoming.length ? (
            upcoming.map((e) => (
              <EventCard key={e.slug} event={e} locale={locale} />
            ))
          ) : (
            <p className="empty-note">
              {zh
                ? "更多活动正在筹备，欢迎关注下方日历。"
                : "More events are in the works. Follow the calendar below."}
            </p>
          )}
        </div>
      </section>

      <section className="site-section">
        <div className="site-width">
          <SectionTitle
            eyebrow="COMMUNITY CALENDAR"
            title={
              zh ? "所有活动，一个日历。" : "One calendar. Every gathering."
            }
          >
            {zh
              ? "最新活动与报名安排由 Luma 实时提供。"
              : "The latest events and registration details, live from Luma."}
          </SectionTitle>
          <LumaEmbed
            src={calendarEmbed}
            url={calendarUrl}
            title={
              zh
                ? "Agentic Data Stack 活动日历"
                : "Agentic Data Stack event calendar"
            }
            zh={zh}
            calendar
          />
        </div>
      </section>
      {past.length > 0 && (
        <section className="site-section">
          <div className="site-width">
            <SectionTitle
              title={zh ? "过往活动与回顾" : "Past events & recaps"}
            />
            {past.map((e) => (
              <EventCard key={e.slug} event={e} locale={locale} />
            ))}
          </div>
        </section>
      )}
      <CfpBanner locale={locale} />
    </Shell>
  );
}
export function EventDetail({
  event,
  locale,
}: {
  event: CommunityEvent;
  locale: Locale;
}) {
  const zh = locale === "zh";
  return (
    <Shell locale={locale}>
      <section className="page-hero site-width">
        <Link className="text-link" href={localPath("/events", locale)}>
          ← {zh ? "全部活动" : "All events"}
        </Link>
        <p className="eyebrow spaced">MEETUP / {text(event.city, locale)}</p>
        <h1>{text(event.title, locale)}</h1>
        <p className="hero-copy">{text(event.description, locale)}</p>
        <div className="button-row">
          {registrationOpen(event) && (
            <a className="button" href="#register">
              {zh ? "报名参加活动" : "Register to attend"} ↓
            </a>
          )}
          <Link
            className="button button-outline"
            href={localPath("/cfp", locale)}
          >
            {zh ? "提交分享提案" : "Submit a proposal"} →
          </Link>
          {event.recap && (
            <Link
              className="button"
              href={localPath(`/events/${event.slug}/recap`, locale)}
            >
              {zh ? "阅读活动回顾" : "Read the recap"} →
            </Link>
          )}
        </div>
      </section>
      <section className="site-section">
        <div className="site-width event-layout">
          <div>
            <SectionTitle title={zh ? "活动信息" : "The details"} />
            <dl className="event-facts">
              {[
                [zh ? "日期" : "Date", eventDate(event, locale)],
                [zh ? "时间" : "Time", eventTime(event)],
                [zh ? "地点" : "Location", text(event.venue, locale)],
                [zh ? "语言" : "Language", text(event.language, locale)],
                [
                  zh ? "报名" : "Admission",
                  text(event.registrationNote, locale),
                ],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <h2 className="subheading">
              {zh ? "适合谁参加" : "Who should join"}
            </h2>
            <p className="muted-copy">
              {zh
                ? "Data Agent 开发者、数据工程师、架构师、AI 研究者，以及正在探索实际落地的企业团队和开源贡献者。"
                : "Data Agent developers, data engineers, architects, AI researchers, enterprise practitioners, and open-source contributors."}
            </p>
            <h2 className="subheading">
              {zh ? "活动主办信息" : "Event hosts"}
            </h2>
            <div className="host-links">
              {event.hosts.map((h) => (
                <a
                  key={h.name}
                  href={h.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {h.name} ↗
                </a>
              ))}
            </div>
            {event.organizerIds.length > 0 && (
              <p className="muted-copy">
                {zh ? "主办组织：" : "Organizing organizations: "}
                {event.organizerIds
                  .map((id) => organizations.find((o) => o.id === id)?.name)
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
            <p className="fine-print">
              {zh
                ? "社区由 DatusAI、NebulaGraph 与 StarRocks 共同发起。"
                : "The community is co-initiated by DatusAI, NebulaGraph, and StarRocks."}
            </p>
          </div>
          <aside className="agenda-panel">
            <p className="eyebrow">AGENDA</p>
            <h2>{zh ? "现场交流安排" : "In the room"}</h2>
            {!event.agendaConfirmed && (
              <p className="fine-print">
                {zh
                  ? "暂定议程，最终安排请以活动页更新为准。"
                  : "Tentative agenda. Final details will be updated on the event page."}
              </p>
            )}
            {event.agenda.map((a, i) => (
              <div className="agenda-item" key={i}>
                <time>{a.time}</time>
                <h3>{text(a.title, locale)}</h3>
                <p>{text(a.speaker, locale)}</p>
              </div>
            ))}
            {!event.agendaConfirmed && (
              <p className="muted-copy">
                {zh
                  ? "更多分享与交流安排即将公布。"
                  : "More sessions and networking details will be announced."}
              </p>
            )}
          </aside>
        </div>
      </section>
      <section className="site-section" id="register">
        <div className="site-width">
          <SectionTitle
            title={
              isPast(event)
                ? zh
                  ? "活动已结束"
                  : "This event has ended"
                : zh
                  ? "报名参加"
                  : "Join us"
            }
          />
          {registrationOpen(event) ? (
            <LumaEmbed
              src={event.registrationEmbed}
              url={event.registrationUrl}
              title={zh ? "杭州 Meetup 报名" : "Hangzhou Meetup registration"}
              zh={zh}
            />
          ) : (
            <p className="empty-note">
              {zh
                ? "本场报名已结束。"
                : "Registration for this event is closed."}{" "}
              <a
                className="text-link"
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {zh ? "查看 Luma 活动页 ↗" : "View on Luma ↗"}
              </a>
            </p>
          )}
        </div>
      </section>
    </Shell>
  );
}
export function Cfp({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const config = getCfpConfig();
  const open = isCfpOpen(config);
  return <Shell locale={locale}>
    <section className="page-hero site-width">
      <p className="eyebrow">CALL FOR PROPOSALS</p>
      <h1>{zh ? "分享你的经验，\n也分享你的问题。" : "Share what worked.\nAnd what didn't."}</h1>
      <p className="hero-copy">{zh ? "欢迎分享 Data Agent 与数据基础设施的架构、技术实践、生产经验，以及失败的尝试和未解决的问题。所有分享提案都通过这个统一入口提交。" : "Share architectures, technical practice, production lessons, failed attempts, and open questions about Data Agents and data infrastructure. Submit every proposal through this single community call."}</p>
      <div className="button-row"><a className="button" href="#proposal-form">{open ? (zh ? "提交分享提案" : "Submit a proposal") : (zh ? "查看投稿安排" : "View submission details")} ↓</a></div>
    </section>
    <section className="site-section">
      <div className="site-width reading-width">
        <SectionTitle title={zh ? "先提交想法，灵活安排活动。" : "Propose your talk. Keep the schedule flexible."}/>
        <p className="large-copy">{zh ? "在投稿表单中，你可以选择希望参与的计划活动，也可以不选，交由社区后续沟通和排期。暂时没有适合的活动，也欢迎先提交。" : "In the proposal form, you can select a planned event or leave that choice blank. If no event fits yet, submit your idea and we will discuss a suitable future slot."}</p>
        <p className="muted-copy">{zh ? "活动选择为可选项，不影响提案提交。具体活动、时间和分享形式将在评审后与你沟通确认。" : "Event preference is optional and does not prevent submission. The event, timing, and session format will be agreed with you after review."}</p>
        <Link className="text-link" href={localPath("/events",locale)}>{zh ? "查看计划中的活动" : "Explore planned events"} →</Link>
      </div>
    </section>
    <section className="site-section"><div className="site-width">
      <SectionTitle eyebrow="TOPICS" title={zh ? "我们希望听到什么" : "What we'd love to hear"}/>
      <div className="topic-grid">{topics.map(t=><div className="topic-card" key={t.category}><h3>{text(t.title,locale)}</h3><p>{text(t.description,locale)}</p></div>)}</div>
    </div></section>
    <section className="site-section"><div className="site-width reading-width">
      <SectionTitle title={zh ? "投稿指南" : "Proposal guidelines"}/>
      <ol className="guidelines">
        <li>{zh ? "说清楚要解决的真实问题、采用的方法，以及听众能带走的 2–3 个收获。" : "Describe the real problem, your approach, and 2–3 concrete takeaways for attendees."}</li>
        <li>{zh ? "说明内容处于研究、原型、试点还是生产阶段。欢迎分享限制、失败与权衡。" : "Tell us whether the work is research, a prototype, a pilot, or in production. Limitations, failures, and trade-offs are welcome."}</li>
        <li>{zh ? "避免纯产品推销，不提交未经允许公开的客户数据或内部资料。" : "Avoid sales pitches. Do not submit customer data or internal material without permission to share it."}</li>
        <li>{zh ? "准备标题、摘要与简短讲者介绍即可，无需在投稿时提交完整 Slides。活动偏好可留空。" : "Prepare a title, abstract, and short speaker bio. Finished slides are not required, and event preference can be left blank."}</li>
      </ol>
      <h2 className="subheading">{zh ? "如何评选与排期" : "Review and scheduling"}</h2>
      <p className="muted-copy">{zh ? "重点关注主题相关性、真实实践、技术深度与听众价值。社区将根据提案内容、活动计划及讲者时间沟通安排；录制与材料公开意愿另行确认。" : "We consider topic relevance, practical experience, technical depth, and value to attendees. Scheduling takes your proposal, planned events, and availability into account. Recording and publication preferences are confirmed separately."}</p>
    </div></section>
    <section className="site-section" id="proposal-form"><div className="site-width">
      <SectionTitle title={zh ? "提交分享提案" : "Submit your proposal"}/>
      {open && config.formUrl ? <LumaEmbed src={config.formUrl} url={config.formUrl} title={zh ? "社区分享提案（飞书）" : "Community proposal form (Feishu)"} provider={zh ? "飞书" : "Feishu"} zh={zh}/> : <div className="empty-note">
        <span className="status-pill">{config.status === "closed" ? (zh ? "投稿暂时关闭" : "Submissions paused") : (zh ? "投稿表单即将开放" : "Proposal form coming soon")}</span>
        <p>{zh ? "表单开放后会在这里提供填写入口。你可以选择计划中的活动，也可以不选，由社区后续安排。" : "The form will appear here when submissions open. Select a planned event or leave the choice blank for future scheduling."}</p>
        <a className="text-link" href={calendarUrl} target="_blank" rel="noopener noreferrer">{zh ? "关注社区日历" : "Follow the community calendar"} ↗</a>
      </div>}
    </div></section>
  </Shell>;
}
export function Recap({
  event,
  locale,
}: {
  event: CommunityEvent;
  locale: Locale;
}) {
  if (!event.recap) return null;
  const zh = locale === "zh";
  const recap = event.recap;
  return (
    <Shell locale={locale}>
      <article className="site-width recap-article">
        <Link
          className="text-link"
          href={localPath(`/events/${event.slug}`, locale)}
        >
          ← {zh ? "活动详情" : "Event details"}
        </Link>
        <p className="eyebrow spaced">
          EVENT RECAP / {eventDate(event, locale)}
        </p>
        <h1>{text(recap.title, locale)}</h1>
        <p className="large-copy">{text(recap.summary, locale)}</p>
        <h2>{zh ? "主要收获" : "Key takeaways"}</h2>
        <ul className="guidelines">
          {recap.takeaways.map((t, i) => (
            <li key={i}>{text(t, locale)}</li>
          ))}
        </ul>
        {recap.photos.map((p, i) => (
          <img
            key={i}
            src={p.src}
            alt={text(p.alt, locale)}
            className="recap-photo"
          />
        ))}
        {recap.sessions.map((s, i) => (
          <section className="recap-session" key={i}>
            <h2>{text(s.title, locale)}</h2>
            <p>{s.speaker}</p>
            <p className="muted-copy">{text(s.summary, locale)}</p>
            <div className="host-links">
              {[
                [s.recordingUrl, zh ? "观看回放" : "Watch recording"],
                [s.slidesUrl, "Slides"],
                [s.codeUrl, zh ? "查看代码" : "View code"],
              ]
                .filter(([u]) => u)
                .map(([u, l]) => (
                  <a key={u} href={u} target="_blank" rel="noopener noreferrer">
                    {l} ↗
                  </a>
                ))}
            </div>
          </section>
        ))}
        <h2>
          {zh
            ? "感谢主办人与参与者"
            : "Thank you to our hosts and participants"}
        </h2>
        <p>{event.hosts.map((h) => h.name).join(" · ")}</p>
      </article>
      <Voices locale={locale} />
      <Upcoming locale={locale} />
    </Shell>
  );
}
