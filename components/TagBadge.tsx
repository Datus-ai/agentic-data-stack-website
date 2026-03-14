import Link from "next/link";

interface TagBadgeProps {
  tag: string;
  href?: string;
}

export default function TagBadge({ tag, href }: TagBadgeProps) {
  const classes =
    "inline-flex items-center rounded-md bg-violet-500/8 px-2 py-0.5 text-xs font-medium text-violet-300 ring-1 ring-inset ring-violet-500/20 transition-colors hover:bg-violet-500/15 hover:text-violet-200";

  if (href) {
    return (
      <Link href={href} className={classes}>
        {tag}
      </Link>
    );
  }

  return <span className={classes}>{tag}</span>;
}
