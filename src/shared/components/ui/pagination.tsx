import * as React from "react"

import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/components/ui/button"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

// Maroon fill for the current page, with the soft-pink dark-mode counterpart
// used elsewhere in the design system.
const activePageClasses =
  "border-transparent bg-maroon-600 text-white hover:bg-maroon-700 hover:text-white dark:bg-soft-pink-500 dark:text-maroon-950 dark:hover:bg-soft-pink-400 dark:hover:text-maroon-950"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      asChild
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(isActive && activePageClasses, className)}
    >
      <a
        aria-current={isActive ? "page" : undefined}
        data-slot="pagination-link"
        data-active={isActive}
        {...props}
      />
    </Button>
  )
}

function PaginationPrevious({
  className,
  text = "Previous",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("pl-1.5!", className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  text = "Next",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("pr-1.5!", className)}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon
      />
      <span className="sr-only">More pages</span>
    </span>
  )
}

/**
 * Builds the list of page numbers to render, inserting "ellipsis" markers when
 * there are gaps. Always shows the first and last page plus a window of
 * `siblingCount` pages around the current page.
 */
function getPaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount = 2,
): (number | "ellipsis")[] {
  // Pages we always render explicitly: first, last, and a window of
  // `siblingCount` pages on each side of the current page (e.g. with the
  // default of 2: 1 ... 3 4 5 6 7 ... 10 when on page 5 of 10).
  const totalToShow = siblingCount * 2 + 5
  if (totalPages <= totalToShow) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1)
  const rightSibling = Math.min(currentPage + siblingCount, totalPages)

  // An ellipsis stands in for the gap between page 1 / `totalPages` and the
  // sibling window; when the window already touches the boundary the adjacent
  // page is rendered by the loop below instead.
  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < totalPages - 1

  const range: (number | "ellipsis")[] = [1]

  if (showLeftEllipsis) range.push("ellipsis")

  for (let i = leftSibling; i <= rightSibling; i++) {
    if (i !== 1 && i !== totalPages) range.push(i)
  }

  if (showRightEllipsis) range.push("ellipsis")

  range.push(totalPages)
  return range
}

type PaginationControlLabels = {
  first?: string
  previous?: string
  next?: string
  last?: string
  /** Receives the page number, e.g. `(p) => `Go to page ${p}``. */
  page?: (page: number) => string
}

type PaginationControlProps = {
  /** Current page (1-based). */
  page: number
  /** Total number of pages. */
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
  /** Show the first/last jump buttons (default: true). */
  showFirstLast?: boolean
  labels?: PaginationControlLabels
  className?: string
}

/**
 * Controlled pagination widget. The current page is highlighted; First/Previous
 * are disabled on the first page and Next/Last on the last page (so with a
 * single page every control is disabled). Chevrons flip automatically in RTL.
 */
function PaginationControl({
  page,
  totalPages,
  onPageChange,
  siblingCount = 2,
  showFirstLast = true,
  labels,
  className,
}: PaginationControlProps) {
  const pages = getPaginationRange(page, totalPages, siblingCount)
  const isFirst = page <= 1
  const isLast = page >= totalPages

  const go = (target: number) => {
    const next = Math.min(Math.max(target, 1), totalPages)
    if (next !== page) onPageChange(next)
  }

  return (
    <Pagination className={className}>
      <PaginationContent>
        {showFirstLast && (
          <PaginationItem>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={labels?.first ?? "First page"}
              disabled={isFirst}
              onClick={() => go(1)}
            >
              <ChevronsLeftIcon className="rtl:rotate-180" />
            </Button>
          </PaginationItem>
        )}
        <PaginationItem>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={labels?.previous ?? "Previous page"}
            disabled={isFirst}
            onClick={() => go(page - 1)}
          >
            <ChevronLeftIcon className="rtl:rotate-180" />
          </Button>
        </PaginationItem>

        {pages.map((item, index) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <Button
                type="button"
                variant={item === page ? "outline" : "ghost"}
                size="icon"
                aria-label={labels?.page?.(item) ?? `Go to page ${item}`}
                aria-current={item === page ? "page" : undefined}
                data-active={item === page}
                className={cn(item === page && activePageClasses)}
                onClick={() => go(item)}
              >
                {item}
              </Button>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={labels?.next ?? "Next page"}
            disabled={isLast}
            onClick={() => go(page + 1)}
          >
            <ChevronRightIcon className="rtl:rotate-180" />
          </Button>
        </PaginationItem>
        {showFirstLast && (
          <PaginationItem>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={labels?.last ?? "Last page"}
              disabled={isLast}
              onClick={() => go(totalPages)}
            >
              <ChevronsRightIcon className="rtl:rotate-180" />
            </Button>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationControl,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  getPaginationRange,
}
