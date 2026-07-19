import { Skeleton } from '@/shared/components/ui/skeleton';
import { Gift, Image as ImageIcon, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export function HeroSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8">
      {/* ================= 1. UPPER SECTION: HERO GRID SKELETON ================= */}
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-4">
        {/* Left Banner Skeleton */}
        <div className="bg-maroon-100 dark:bg-maroon-800 relative flex h-96 w-full flex-col justify-end gap-3 overflow-hidden rounded-2xl p-8 text-white">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Gift className="h-32 w-32 animate-pulse text-white" />
          </div>

          <div className="relative z-10 space-y-4">
            <Skeleton className="h-6 w-32 animate-pulse rounded-full border dark:bg-maroon-100 border-white/10 bg-white/20" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-11/12 animate-pulse rounded-lg bg-white/10" />
              <Skeleton className="h-8 w-3/4 animate-pulse rounded-lg bg-white/10" />
            </div>
          </div>

          <div className="relative z-10 mt-2">
            <Skeleton className="h-10 w-28 animate-pulse rounded-xl bg-white/20" />
          </div>
        </div>

        {/* Main Carousel Skeleton */}
        <div className="dark:bg-card dark:border-border/40 relative flex h-96 w-full flex-col justify-end gap-4 overflow-hidden rounded-2xl border border-zinc-200/50 bg-zinc-100 p-8 lg:col-span-3">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-400/50">
            <ImageIcon className="h-12 w-12 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-zinc-400/40 uppercase">Loading Slide...</span>
          </div>

          <div className="absolute top-6 right-8 flex gap-2">
            <Skeleton className="dark:bg-muted h-2 w-9 animate-pulse rounded-full dark:bg-zinc-600 bg-zinc-300" />
            <Skeleton className="dark:bg-muted/50 h-2 w-2 animate-pulse rounded-full dark:bg-zinc-600 bg-zinc-200" />
            <Skeleton className="dark:bg-muted/50 h-2 w-2 animate-pulse rounded-full dark:bg-zinc-600 bg-zinc-200" />
          </div>

          <div className="relative z-10 space-y-3">
            <Skeleton className="dark:bg-muted h-10 w-3/5 animate-pulse rounded-lg bg-zinc-300/80" />
            <Skeleton className="dark:bg-muted/70 h-6 w-2/5 animate-pulse rounded-lg bg-zinc-200/80" />
            <div className="pt-2">
              <Skeleton className="dark:bg-muted h-10 w-32 animate-pulse rounded-xl bg-zinc-300/80" />
            </div>
          </div>

          <div className="rounded-ds-xl bg-maroon-50 absolute right-6 bottom-6 flex items-center gap-1 border border-zinc-200/20 p-1">
            <div className="text-maroon-700/40 flex h-7.5 w-7.5 items-center justify-center rounded-lg">
              <ChevronLeft className="h-4 w-4" />
            </div>
            <div className="text-maroon-700/40 flex h-7.5 w-7.5 items-center justify-center rounded-lg">
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= 2. MIDDLE SECTION: CATEGORY TRIO SKELETON ================= */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="dark:bg-card dark:border-border/40 relative flex h-72 w-full flex-col justify-end gap-3 overflow-hidden rounded-2xl border border-zinc-200/50 bg-zinc-100 p-6"
          >
            {/* Subtle sparkling loading indicator in background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.015]">
              <Sparkles className="text-foreground h-24 w-24" />
            </div>

            {/* Simulated Tag (Matching 'rounded-ds-lg px-2 py-0.5') */}
            <div className="relative z-10">
              <Skeleton className="bg-maroon-100/70 dark:bg-muted rounded-ds-lg h-5 w-20 animate-pulse" />
            </div>

            {/* Simulated Category Title (2 lines) */}
            <div className="relative z-10 space-y-2">
              <Skeleton className="dark:bg-muted/80 h-6 w-11/12 animate-pulse rounded-md bg-zinc-200" />
              <Skeleton className="dark:bg-muted/80 h-6 w-3/4 animate-pulse rounded-md bg-zinc-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
