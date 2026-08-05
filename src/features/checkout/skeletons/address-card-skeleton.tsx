export function AddressSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-24 w-full animate-pulse rounded-2xl bg-zinc-100 p-4" />
      ))}
    </div>
  );
}