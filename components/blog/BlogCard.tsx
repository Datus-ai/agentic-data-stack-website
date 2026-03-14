import Link from "next/link";
import TagBadge from "@/components/TagBadge";

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readingTime: number;
  tags?: string[];
  featured?: boolean;
}

export default function BlogCard({
  slug,
  title,
  description,
  date,
  author,
  readingTime,
  tags,
  featured,
}: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/blog/${slug}`}
      className={`group relative flex flex-col rounded-2xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/5 ${
        featured
          ? "sm:col-span-2 sm:flex-row sm:gap-8"
          : ""
      }`}
    >
      {featured && (
        <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
      )}

      <div className="flex flex-1 flex-col">
        <div className="mb-3 flex items-center gap-3 text-xs text-muted">
          <time dateTime={date}>{formattedDate}</time>
          <span className="h-1 w-1 rounded-full bg-card-border" />
          <span>{readingTime} min read</span>
          <span className="h-1 w-1 rounded-full bg-card-border" />
          <span>{author}</span>
        </div>

        <h3
          className={`font-semibold leading-snug text-foreground transition-colors group-hover:text-violet-300 ${
            featured ? "text-2xl sm:text-3xl" : "text-lg"
          }`}
        >
          {title}
        </h3>

        <p
          className={`mt-2 leading-relaxed text-muted ${
            featured ? "text-base line-clamp-3" : "text-sm line-clamp-2"
          }`}
        >
          {description}
        </p>

        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.slice(0, 4).map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center pt-2 text-sm font-medium text-violet-400 transition-colors group-hover:text-violet-300">
          Read article
          <svg
            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
