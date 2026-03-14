import Link from "next/link";
import TagBadge from "@/components/TagBadge";

interface NewsletterCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  issue: number;
  tags?: string[];
}

export default function NewsletterCard({
  slug,
  title,
  description,
  date,
  issue,
  tags,
}: NewsletterCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/newsletter/${slug}`}
      className="group relative flex items-start gap-5 rounded-2xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5"
    >
      {/* Issue number badge */}
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-violet-600/20 ring-1 ring-blue-500/20">
        <span className="text-xs font-medium text-blue-300">
          #{issue}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="mb-1.5 flex items-center gap-3 text-xs text-muted">
          <time dateTime={date}>{formattedDate}</time>
        </div>

        <h3 className="font-semibold leading-snug text-foreground transition-colors group-hover:text-blue-300 text-lg">
          {title}
        </h3>

        <p className="mt-1.5 text-sm leading-relaxed text-muted line-clamp-2">
          {description}
        </p>

        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.slice(0, 5).map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </div>

      <svg
        className="mt-1 h-5 w-5 shrink-0 text-muted transition-all group-hover:text-blue-400 group-hover:translate-x-0.5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </Link>
  );
}
