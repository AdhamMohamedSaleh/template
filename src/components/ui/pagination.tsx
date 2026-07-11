import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
  className?: string;
}

function getPageNumbers(page: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set([1, totalPages, page - 1, page, page + 1]);
  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];
  let prev: number | undefined;
  for (const p of sorted) {
    if (prev !== undefined && p - prev > 1) result.push("ellipsis");
    result.push(p);
    prev = p;
  }
  return result;
}

function Pagination({ page, totalPages, buildHref, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(page, totalPages);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav
      aria-label="Pagination"
      data-slot="pagination"
      className={cn("flex items-center justify-center gap-1.5", className)}
    >
      <Button
        asChild
        variant="ghost"
        size="icon"
        className={cn(!hasPrev && "pointer-events-none opacity-40")}
      >
        <Link
          href={buildHref(Math.max(1, page - 1))}
          aria-label="Previous page"
          aria-disabled={!hasPrev}
          tabIndex={hasPrev ? undefined : -1}
          scroll={false}
        >
          <ChevronLeft aria-hidden />
        </Link>
      </Button>

      {pages.map((p, index) =>
        p === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="flex size-9 items-center justify-center text-sm text-muted-foreground"
          >
            …
          </span>
        ) : (
          <Button key={p} asChild variant={p === page ? "ocean" : "ghost"} size="icon">
            <Link
              href={buildHref(p)}
              aria-current={p === page ? "page" : undefined}
              scroll={false}
            >
              {p}
            </Link>
          </Button>
        ),
      )}

      <Button
        asChild
        variant="ghost"
        size="icon"
        className={cn(!hasNext && "pointer-events-none opacity-40")}
      >
        <Link
          href={buildHref(Math.min(totalPages, page + 1))}
          aria-label="Next page"
          aria-disabled={!hasNext}
          tabIndex={hasNext ? undefined : -1}
          scroll={false}
        >
          <ChevronRight aria-hidden />
        </Link>
      </Button>
    </nav>
  );
}

export { Pagination };
