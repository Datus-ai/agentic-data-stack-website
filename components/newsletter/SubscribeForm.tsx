"use client";

import { useState, FormEvent } from "react";

export default function SubscribeForm({ compact }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    const apiKey = process.env.NEXT_PUBLIC_BUTTONDOWN_API_KEY;

    if (!apiKey) {
      setStatus("error");
      setMessage("Subscription is not configured yet. Please try again later.");
      return;
    }

    try {
      const res = await fetch(
        "https://api.buttondown.com/v1/subscribers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${apiKey}`,
          },
          body: JSON.stringify({ email_address: email }),
        }
      );

      if (res.ok) {
        setStatus("success");
        setMessage("You're in! Check your inbox for confirmation.");
        setEmail("");
      } else {
        const data = await res.json();
        setStatus("error");
        setMessage(data.detail || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="your@email.com"
          required
          className="h-10 flex-1 rounded-lg border border-card-border bg-card-bg px-3 text-sm text-foreground placeholder:text-muted/60 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-10 shrink-0 rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
        {status === "success" && (
          <span className="self-center text-xs text-green-400">{message}</span>
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
            Agentic Data Stack Weekly
          </h3>
          <p className="mt-1 text-sm text-muted">
            Curated news on data infrastructure, agent tooling, and the
            evolving data stack. For data engineers and team leaders.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="flex gap-3">
          <input
            type="email"
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
            {status === "loading" ? "Subscribing..." : "Subscribe"}
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
