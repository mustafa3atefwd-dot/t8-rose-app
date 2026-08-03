// import * as React from "react"

// import { cn } from "@/shared/lib/utils"
// import { Button } from "@/shared/components/ui/button"
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   ChevronsLeftIcon,
//   ChevronsRightIcon,
//   MoreHorizontalIcon,
// } from "lucide-react"

// function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
//   return (
//     <nav
//       role="navigation"
//       aria-label="pagination"
//       data-slot="pagination"
//       className={cn("mx-auto flex w-full justify-center", className)}
//       {...props}
//     />
//   )
// }

// function PaginationContent({
//   className,
//   ...props
// }: React.ComponentProps<"ul">) {
//   return (
//     <ul
//       data-slot="pagination-content"
//       className={cn("flex items-center gap-0.5", className)}
//       {...props}
//     />
//   )
// }

// function PaginationItem({ ...props }: React.ComponentProps<"li">) {
//   return <li data-slot="pagination-item" {...props} />
// }

// // Solid primary fill for the current page. The `primary` / `primary-hover`
// // tokens already flip to the soft-pink dark-mode counterpart automatically, so
// // no explicit `dark:` overrides are needed.
// const activePageClasses =
//   "border-transparent bg-ds-bg-primary text-ds-text-inverse hover:bg-ds-bg-primary-saturated hover:text-ds-text-inverse"

// function PaginationEllipsis({
//   className,
//   ...props
// }: React.ComponentProps<"span">) {
//   return (
//     <span
//       aria-hidden
//       data-slot="pagination-ellipsis"
//       className={cn(
//         "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
//         className
//       )}
//       {...props}
//     >
//       <MoreHorizontalIcon
//       />
//       <span className="sr-only">More pages</span>
//     </span>
//   )
// }

// /**
//  * Builds the list of page numbers to render, inserting "ellipsis" markers when
//  * there are gaps. Always shows the first and last page plus a window of
//  * `siblingCount` pages around the current page.
//  */
// function getPaginationRange(
//   currentPage: number,
//   totalPages: number,
//   siblingCount = 2,
// ): (number | "ellipsis")[] {
//   // Pages we always render explicitly: first, last, and a window of
//   // `siblingCount` pages on each side of the current page (e.g. with the
//   // default of 2: 1 ... 3 4 5 6 7 ... 10 when on page 5 of 10).
//   const totalToShow = siblingCount * 2 + 5
//   if (totalPages <= totalToShow) {
//     return Array.from({ length: totalPages }, (_, i) => i + 1)
//   }

//   const leftSibling = Math.max(currentPage - siblingCount, 1)
//   const rightSibling = Math.min(currentPage + siblingCount, totalPages)

//   // An ellipsis stands in for the gap between page 1 / `totalPages` and the
//   // sibling window; when the window already touches the boundary the adjacent
//   // page is rendered by the loop below instead.
//   const showLeftEllipsis = leftSibling > 2
//   const showRightEllipsis = rightSibling < totalPages - 1

//   const range: (number | "ellipsis")[] = [1]

//   if (showLeftEllipsis) range.push("ellipsis")

//   for (let i = leftSibling; i <= rightSibling; i++) {
//     if (i !== 1 && i !== totalPages) range.push(i)
//   }

//   if (showRightEllipsis) range.push("ellipsis")

//   range.push(totalPages)
//   return range
// }

// type PaginationControlLabels = {
//   first?: string
//   previous?: string
//   next?: string
//   last?: string
//   /** Receives the page number, e.g. `(p) => `Go to page ${p}``. */
//   page?: (page: number) => string
// }

// type PaginationControlProps = {
//   /** Current page (1-based). */
//   page: number
//   /** Total number of pages. */
//   totalPages: number
//   onPageChange: (page: number) => void
//   siblingCount?: number
//   /** Show the first/last jump buttons (default: true). */
//   showFirstLast?: boolean
//   labels?: PaginationControlLabels
//   className?: string
// }

// /**
//  * Controlled pagination widget. The current page is highlighted; First/Previous
//  * are disabled on the first page and Next/Last on the last page (so with a
//  * single page every control is disabled). Chevrons flip automatically in RTL.
//  */
// function PaginationControl({
//   page,
//   totalPages,
//   onPageChange,
//   siblingCount = 2,
//   showFirstLast = true,
//   labels,
//   className,
// }: PaginationControlProps) {
//   const pages = getPaginationRange(page, totalPages, siblingCount)
//   const isFirst = page <= 1
//   const isLast = page >= totalPages

//   const go = (target: number) => {
//     const next = Math.min(Math.max(target, 1), totalPages)
//     if (next !== page) onPageChange(next)
//   }

//   return (
//     <Pagination className={className}>
//       <PaginationContent>
//         {showFirstLast && (
//           <PaginationItem>
//             <Button
//               type="button"
//               variant="ghost"
//               size="icon"
//               aria-label={labels?.first ?? "First page"}
//               disabled={isFirst}
//               onClick={() => go(1)}
//             >
//               <ChevronsLeftIcon className="rtl:rotate-180" />
//             </Button>
//           </PaginationItem>
//         )}
//         <PaginationItem>
//           <Button
//             type="button"
//             variant="ghost"
//             size="icon"
//             aria-label={labels?.previous ?? "Previous page"}
//             disabled={isFirst}
//             onClick={() => go(page - 1)}
//           >
//             <ChevronLeftIcon className="rtl:rotate-180" />
//           </Button>
//         </PaginationItem>

//         {pages.map((item, index) =>
//           item === "ellipsis" ? (
//             <PaginationItem key={`ellipsis-${index}`}>
//               <PaginationEllipsis />
//             </PaginationItem>
//           ) : (
//             <PaginationItem key={item}>
//               <Button
//                 type="button"
//                 variant={item === page ? "outline" : "ghost"}
//                 size="icon"
//                 aria-label={labels?.page?.(item) ?? `Go to page ${item}`}
//                 aria-current={item === page ? "page" : undefined}
//                 data-active={item === page}
//                 className={cn(item === page && activePageClasses)}
//                 onClick={() => go(item)}
//               >
//                 {item}
//               </Button>
//             </PaginationItem>
//           ),
//         )}

//         <PaginationItem>
//           <Button
//             type="button"
//             variant="ghost"
//             size="icon"
//             aria-label={labels?.next ?? "Next page"}
//             disabled={isLast}
//             onClick={() => go(page + 1)}
//           >
//             <ChevronRightIcon className="rtl:rotate-180" />
//           </Button>
//         </PaginationItem>
//         {showFirstLast && (
//           <PaginationItem>
//             <Button
//               type="button"
//               variant="ghost"
//               size="icon"
//               aria-label={labels?.last ?? "Last page"}
//               disabled={isLast}
//               onClick={() => go(totalPages)}
//             >
//               <ChevronsRightIcon className="rtl:rotate-180" />
//             </Button>
//           </PaginationItem>
//         )}
//       </PaginationContent>
//     </Pagination>
//   )
// }

// export { PaginationControl }
// export type { PaginationControlLabels, PaginationControlProps }


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

// Solid primary fill for the current page. The `primary` / `primary-hover`
// tokens already flip to the soft-pink dark-mode counterpart automatically, so
// no explicit `dark:` overrides are needed.
const activePageClasses =
  // "border-transparent bg-ds-bg-primary text-ds-text-inverse hover:bg-ds-bg-primary-saturated hover:text-ds-text-inverse"
  "w-8 h-8 rounded-lg p-2.5 gap-2.5 bg-maroon-600 dark:bg-soft-pink-300 text-white dark:text-zinc-700"

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
              className="border rounded-lg p-2.5 gap-2.5 border-ds-border-muted bg-ds-bg-plain"
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
            className="border rounded-lg p-2.5 gap-2.5 border-ds-border-muted bg-ds-bg-plain"
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
            className="border rounded-lg p-2.5 gap-2.5 border-ds-border-muted bg-ds-bg-plain"
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
              className="border rounded-lg p-2.5 gap-2.5 border-ds-border-muted bg-ds-bg-plain"
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

export { PaginationControl }
export type { PaginationControlLabels, PaginationControlProps }
