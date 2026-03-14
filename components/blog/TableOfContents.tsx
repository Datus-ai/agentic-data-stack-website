"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState<string>("");
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const parsed = content
      .split("\n")
      .filter((line) => /^#{2,3}\s/.test(line))
      .map((line) => {
        const match = line.match(/^(#{2,3})\s+(.+)/);
        if (!match) return null;
        const text = match[2].replace(/\*\*/g, "");
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-");
        return { id, text, level: match[1].length };
      })
      .filter((h): h is Heading => h !== null);
    setHeadings(parsed);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav className="sticky top-28">
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
        On this page
      </h4>
      <ul className="space-y-1 border-l border-card-border">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block border-l-2 py-1 text-sm transition-all ${
                h.level === 3 ? "pl-6" : "pl-4"
              } ${
                activeId === h.id
                  ? "border-violet-500 text-violet-300 font-medium"
                  : "border-transparent text-muted hover:text-foreground hover:border-card-border"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
