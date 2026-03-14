import Link from "next/link";

interface ResourceCardProps {
  title: string;
  description: string;
  type: string;
  date: string;
  href: string;
  externalUrl?: string;
}

const typeBadgeColors: Record<string, string> = {
  article: "bg-blue-500/10 text-blue-400 ring-blue-500/20",
  "case-study": "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
  guide: "bg-amber-500/10 text-amber-400 ring-amber-500/20",
  tutorial: "bg-violet-500/10 text-violet-400 ring-violet-500/20",
};

export default function ResourceCard({
  title,
  description,
  type,
  date,
  href,
  externalUrl,
}: ResourceCardProps) {
  const badgeColor = typeBadgeColors[type] ?? "bg-white/5 text-muted ring-white/10";
  const target = externalUrl ? "_blank" : undefined;
  const rel = externalUrl ? "noopener noreferrer" : undefined;
  const linkHref = externalUrl ?? href;

  const CardWrapper = externalUrl ? "a" : Link;

  return (
    <CardWrapper
      href={linkHref}
      target={target}
      rel={rel}
      className="group relative flex flex-col rounded-2xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/5"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${badgeColor}`}>
          {type}
        </span>
        <span className="text-xs text-muted">{date}</span>
        {externalUrl && (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-auto h-4 w-4 text-muted">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        )}
      </div>

      <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-accent-light">
        {title}
      </h3>

      <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
        {description}
      </p>
    </CardWrapper>
  );
}
