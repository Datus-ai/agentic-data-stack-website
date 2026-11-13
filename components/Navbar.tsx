"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { localPath, type Locale } from "@/lib/community";
export default function Navbar() {
  const pathname = usePathname();
  const locale: Locale = pathname === "/zh" || pathname.startsWith("/zh/") ? "zh" : "en";
  const zh = locale === "zh";
  const base = pathname.replace(/^\/zh(?=\/|$)/, "") || "/";
  const [open, setOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const learnRef = useRef<HTMLDivElement>(null);
  const learningActive = base.startsWith("/blog") || base.startsWith("/resources");
  const close = () => { setOpen(false); setLearnOpen(false); };
  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (learnRef.current && !learnRef.current.contains(event.target as Node)) setLearnOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, []);
  return <header className="site-header"><nav className="site-nav" aria-label={zh ? "主导航" : "Main navigation"}>
    <Link href={localPath("/",locale)} className="brand" onClick={close}><img src="/images/logo.png" alt="" width="32" height="32"/><span>Agentic Data Stack</span></Link>
    <button className="menu-toggle" aria-expanded={open} aria-controls="main-menu" onClick={() => { setOpen(!open); setLearnOpen(false); }}>{open ? (zh ? "关闭" : "Close") : (zh ? "菜单" : "Menu")}</button>
    <div id="main-menu" className={`nav-items ${open ? "is-open" : ""}`}>
      <Link href={localPath("/events",locale)} aria-current={base.startsWith("/events") ? "page" : undefined} onClick={close}>{zh ? "活动" : "Events"}</Link>
      <div className="nav-learn" ref={learnRef} onKeyDown={event => { if(event.key === "Escape") {setLearnOpen(false); learnRef.current?.querySelector("button")?.focus();} }} onBlur={event => { if(!event.currentTarget.contains(event.relatedTarget))setLearnOpen(false); }}>
        <button className={`nav-learn-toggle ${learningActive ? "is-active" : ""}`} aria-expanded={learnOpen} aria-controls="learn-menu" onClick={() => setLearnOpen(!learnOpen)}>{zh ? "学习资源" : "Learn"}<span aria-hidden="true">⌄</span></button>
        {learnOpen && <div id="learn-menu" className="nav-learn-menu">
          <Link href={localPath("/blog",locale)} aria-current={base.startsWith("/blog") ? "page" : undefined} onClick={close}><strong>{zh ? "博客" : "Blog"}</strong><small>{zh ? "架构、观点与实践文章" : "Architecture, ideas, and practice"}</small></Link>
          <Link href={localPath("/resources",locale)} aria-current={base.startsWith("/resources") ? "page" : undefined} onClick={close}><strong>{zh ? "资源中心" : "Resources"}</strong><small>{zh ? "数据组件与 Agent 集成" : "Data components and agent integrations"}</small></Link>
        </div>}
      </div>
      <Link href={localPath("/about",locale)} aria-current={base.startsWith("/about") ? "page" : undefined} onClick={close}>{zh ? "关于社区" : "About"}</Link>
      <Link href={localPath(base,zh ? "en" : "zh")} hrefLang={zh ? "en" : "zh-CN"} lang={zh ? "en" : "zh-CN"} onClick={close} className="language-link">{zh ? "EN" : "中文"}</Link>
      <Link href={localPath("/cfp",locale)} onClick={close} className="button button-small">{zh ? "征集分享" : "Call for Proposals"}<span aria-hidden="true">↗</span></Link>
    </div>
  </nav></header>;
}
