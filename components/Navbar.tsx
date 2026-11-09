"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { localPath, type Locale } from "@/lib/community";
export default function Navbar() {
  const pathname = usePathname();
  const locale: Locale =
    pathname === "/zh" || pathname.startsWith("/zh/") ? "zh" : "en";
  const base = pathname.replace(/^\/zh(?=\/|$)/, "") || "/";
  const [open, setOpen] = useState(false);
  const links = [
    ["/events", "Events", "活动"],
    ["/blog", "Blog", "博客"],
    ["/resources", "Resources", "资源"],
    ["/about", "About", "关于社区"],
  ];
  return (
    <header className="site-header">
      <nav
        className="site-nav"
        aria-label={locale === "zh" ? "主导航" : "Main navigation"}
      >
        <Link href={localPath("/", locale)} className="brand">
          <img src="/images/logo.png" alt="" width="32" height="32" />
          <span>Agentic Data Stack</span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen(!open)}
        >
          {open
            ? locale === "zh"
              ? "关闭"
              : "Close"
            : locale === "zh"
              ? "菜单"
              : "Menu"}
        </button>
        <div id="main-menu" className={`nav-items ${open ? "is-open" : ""}`}>
          {links.map(([href, en, zh]) => (
            <Link
              key={href}
              href={localPath(href, locale)}
              aria-current={base.startsWith(href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {locale === "zh" ? zh : en}
            </Link>
          ))}
          <Link
            href={localPath(base, locale === "zh" ? "en" : "zh")}
            hrefLang={locale === "zh" ? "en" : "zh-CN"}
            lang={locale === "zh" ? "en" : "zh-CN"}
            onClick={() => setOpen(false)}
            className="language-link"
          >
            {locale === "zh" ? "EN" : "中文"}
          </Link>
          <Link
            href={localPath("/cfp", locale)}
            onClick={() => setOpen(false)}
            className="button button-small"
          >
            {locale === "zh" ? "征集分享" : "Call for Proposals"}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
