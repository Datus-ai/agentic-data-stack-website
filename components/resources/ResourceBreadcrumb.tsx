import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ResourceBreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function ResourceBreadcrumb({ items }: ResourceBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <span className="text-muted/50" aria-hidden="true">
                  &gt;
                </span>
              )}
              {isLast || !item.href ? (
                <span className="text-foreground font-medium">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-muted transition-colors hover:text-accent-light"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
