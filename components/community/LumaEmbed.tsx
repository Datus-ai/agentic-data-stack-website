"use client";
import { useEffect, useState } from "react";
export default function LumaEmbed({
  src,
  url,
  title,
  zh = false,
  calendar = false,
  provider = "Luma",
}: {
  src: string;
  url: string;
  title: string;
  zh?: boolean;
  calendar?: boolean;
  provider?: string;
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loaded) setFailed(true);
    }, 15000);
    return () => clearTimeout(timer);
  }, [loaded]);
  return (
    <div className="embed-shell">
      <div className="embed-caption">
        <span>{title}</span>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {zh ? `在 ${provider} 中打开 ↗` : `Open on ${provider} ↗`}
        </a>
      </div>
      {failed && (
        <p role="status" className="embed-notice">
          {zh
            ? "如果下方内容未能显示，请使用上方链接直接打开。"
            : "If the embed does not appear, use the link above to open it directly."}
        </p>
      )}
      <iframe
        src={src}
        title={title}
        width="600"
        height={calendar ? "550" : "700"}
        loading="lazy"
        allow="fullscreen; payment"
        allowFullScreen
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={calendar ? "luma-frame calendar-frame" : "luma-frame"}
      />
    </div>
  );
}
