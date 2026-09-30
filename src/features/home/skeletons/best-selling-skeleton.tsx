import ProductCardSkeleton from '@/features/products/skeletons/product-card-skeleton';

const BestSellingSkeleton = () => (
  <div className="flex w-full gap-4 overflow-hidden sm:gap-6">
    <div className="w-[88%] shrink-0 min-[440px]:w-[70%] sm:w-75">
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
