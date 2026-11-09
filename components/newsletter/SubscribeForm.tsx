"use client";

import { useState, FormEvent } from "react";

/**
 * Uses Buttondown's official form endpoint — no API key needed.
 * See: https://docs.buttondown.com/building-your-subscriber-base
 *
 * NEXT_PUBLIC_BUTTONDOWN_USERNAME must be set to your Buttondown username.
 */

export default function SubscribeForm({
  compact,
  locale = "en",
}: {
  compact?: boolean;
  locale?: "en" | "zh";
}) {
  const zh = locale === "zh";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const username = process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;

    if (!username) {
      setStatus("error");
      setMessage(
        zh
          ? "订阅暂未开放，请先关注社区 Luma 日历。"
          : "Subscription is not configured yet. Follow our Luma calendar for updates.",
      );
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch(
        `https://buttondown.com/api/emails/embed-subscribe/${username}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ email }),
        },
      );

      if (res.ok || res.status === 302) {
        setStatus("success");
        setMessage(
          zh
            ? "请查看邮箱确认订阅。"
            : "Check your inbox to confirm your subscription.",
        );
        setEmail("");
      } else {
        setStatus("error");
        setMessage(
          zh
            ? "暂时无法订阅，请稍后重试。"
            : "Something went wrong. Please try again.",
        );
      }
    } catch {
      setStatus("error");
      setMessage(
        zh
          ? "暂时无法确认订阅结果，请稍后重试或查看邮箱。"
          : "We could not confirm your subscription. Please check your inbox or try again later.",
      );
    }
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="compact-subscribe">
        <input
          type="email"
          aria-label={zh ? "邮箱地址" : "Email address"}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="your@email.com"
          required
          className="h-10 min-w-0 flex-1 rounded-lg border border-card-border bg-card-bg px-3 text-sm text-foreground placeholder:text-muted/60 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-10 shrink-0 rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "loading" ? "..." : zh ? "订阅" : "Subscribe"}
        </button>
        {(status === "success" || status === "error") && (
          <p role="status" className={`subscribe-message text-xs ${status === "error" ? "text-amber-300" : "text-green-400"}`}>{message}</p>
        )}
      </form>
    );
  }

  return (
    <div className="rounded-2xl border border-card-border bg-card-bg/60 p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-violet-600/20 text-blue-400">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {zh ? "Agentic Data Stack 周刊" : "Agentic Data Stack Weekly"}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {zh
              ? "为数据工程师与团队负责人整理数据基础设施、Agent 工具与社区动态。"
              : "Curated news on data infrastructure, agent tooling, and the evolving data stack. For data engineers and team leaders."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="flex gap-3">
          <input
            type="email"
            aria-label={zh ? "邮箱地址" : "Email address"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="you@company.com"
            required
            className="h-12 flex-1 rounded-xl border border-card-border bg-background px-4 text-foreground placeholder:text-muted/60 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="h-12 shrink-0 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-6 font-medium text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-xl hover:shadow-violet-500/30 hover:brightness-110 disabled:opacity-50"
          >
            {status === "loading"
              ? zh
                ? "正在订阅…"
                : "Subscribing..."
              : zh
                ? "订阅"
                : "Subscribe"}
          </button>
        </div>

        {status === "success" && (
          <p className="mt-3 text-sm text-green-400">{message}</p>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-red-400">{message}</p>
        )}

        <p className="mt-3 text-xs text-muted/60">
          Weekly digest. No spam. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}
