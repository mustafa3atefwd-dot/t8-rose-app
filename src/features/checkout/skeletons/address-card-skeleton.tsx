import React from 'react';

export function AddressSkeleton() {
  return (
    <div className="space-y-4">
      {/* checkout skeleton */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex animate-pulse items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4"
        >
          {/* skeleton Placeholders UI */}
          <div className="space-y-2.5">
            <div className="h-5 w-24 rounded-md bg-zinc-200" />
            <div className="h-6 w-52 rounded-full bg-zinc-200 sm:w-64" />
          </div>

          <div className="dir-ltr flex items-center gap-2">
            <div className="h-8 w-8 shrink-0 rounded-full bg-zinc-200" />

            <div className="h-4 w-28 rounded-md bg-zinc-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
