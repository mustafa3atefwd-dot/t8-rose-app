const ProductCardSkeleton = () => {
  return (
    <div className="rounded-ds-lg border-ds-border-soft bg-ds-bg-plain mx-auto flex w-full max-w-75 flex-col overflow-hidden">
      <div className="bg-ds-bg-muted aspect-square w-full animate-pulse rounded-xl" />

      <div className="flex flex-col gap-2 py-3">
        <div className="bg-ds-bg-muted h-5 w-3/4 animate-pulse rounded-ds-sm" />

        <div className="bg-ds-bg-muted h-4 w-24 animate-pulse rounded-ds-sm" />

        <div className="flex items-center justify-between gap-2">
          <div className="bg-ds-bg-muted h-6 w-16 animate-pulse rounded-ds-sm" />
          <div className="bg-ds-bg-muted size-12 animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
