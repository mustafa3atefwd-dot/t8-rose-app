import ProductCarousel from '@/features/home/components/product-carousel';
import { Button } from '@/shared/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getProductsAction } from '@/features/products/lib/actions';

const BEST_SELLING_LIMIT = 10;

const BestSelling = async () => {
  const result = await getProductsAction({ limit: BEST_SELLING_LIMIT, sortBy: 'bestSelling', sortOrder: 'desc' }).catch(
    () => null
  );
  const products = result?.status ? (result.payload?.data ?? []) : null;

  return (
    <div className="container mx-auto flex flex-col items-start gap-8 px-4 py-12 text-start md:flex-row">
      <div className="flex max-w-1/5 flex-col items-start gap-3">
        <h4 className="text-body text-ds-text-secondary align-middle font-bold tracking-[0.25em] uppercase">
          Best Selling
        </h4>
        <p className="text-maroon-700 align-middle text-3xl leading-none font-bold">
          <span className="text-ds-bg-secondary">Check Out</span> What Everyone’s{' '}
          <span className="text-ds-bg-secondary">Buying</span> Right Now
        </p>
        <p className="align-middle text-lg leading-[1.2] font-normal pb-12 text-zinc-500">
          Not sure what to choose? Start with our best sellers, these are the gifts our customers keep coming back for.
          Whether you &apos;re celebrating a birthday, anniversary or wedding, our top picks are guaranteed to leave a
          lasting impression.
        </p>
        {/* button */}
        <Button className="capitalize ">
          explore gift <ArrowRight />
        </Button>
      </div>

      {/* carousel of products */}
      <ProductCarousel products={products} />
    </div>
  );
};

export default BestSelling;
