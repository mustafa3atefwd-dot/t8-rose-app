import ProductCardSkeleton from '@/features/products/skeletons/product-card-skeleton';

const BestSellingSkeleton = () => (
  <div className="flex w-full gap-6 overflow-hidden">
    <div className="w-75 shrink-0">
      <ProductCardSkeleton />
    </div>
    <div className="hidden w-75 shrink-0 sm:block">
      <ProductCardSkeleton />
    </div>
    <div className="hidden w-75 shrink-0 lg:block">
      <ProductCardSkeleton />
    </div>
  </div>
);

export default BestSellingSkeleton;
