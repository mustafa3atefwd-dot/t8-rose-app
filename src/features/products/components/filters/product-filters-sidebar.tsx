'use client';

import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';
import { Separator } from '@/shared/components/ui/separator';
import { useProductFilters } from '../../hooks/use-product-filters';
import { ICategory } from '../../lib/types/category';
import { IOccasion } from '../../lib/types/occasion';
import CategoryFilter from './category-filter';
import FilterSection from './filter-section';
import OccasionFilter from './occasion-filter';
import PriceRangeFilter from './price-range-filter';
import RatingFilter from './rating-filter';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';

interface ProductFiltersSidebarProps {
  categories: ICategory[];
  occasions: IOccasion[];
}

const ProductFiltersContent = ({ categories, occasions }: ProductFiltersSidebarProps) => {
  // Translation
  const t = useTranslations('products.filters');

  // Custom hooks
  const { categoryIds, occasionId, minRating, minPrice, maxPrice, setFilter, setFilters, resetFilter, resetAll } =
    useProductFilters();

  // Variables
  const hasAnyFilter = Boolean(categoryIds.length || occasionId || minRating || minPrice != null || maxPrice != null);

  // Functions
  const handleSelectedCategoryIdsChange = (selectedCategoryIds: string[]) => {
    setFilter('categoryId', selectedCategoryIds.length ? selectedCategoryIds.join(',') : undefined);
  };

  return (
    <div className="flex w-full flex-col overflow-hidden">
      {categories.length > 0 && (
        <>
          <FilterSection
            title={t('category')}
            resetLabel={t('reset')}
            active={categoryIds.length > 0}
            onReset={() => resetFilter('categoryId')}
          >
            <CategoryFilter
              categories={categories}
              selectedCategoryIds={categoryIds}
              onSelectedCategoryIdsChange={handleSelectedCategoryIdsChange}
            />
          </FilterSection>
          <Separator className="bg-ds-border-soft" />
        </>
      )}

      {occasions.length > 0 && (
        <>
          <FilterSection
            title={t('occasion')}
            resetLabel={t('reset')}
            active={Boolean(occasionId)}
            onReset={() => resetFilter('occasionId')}
          >
            <OccasionFilter
              occasions={occasions}
              activeId={occasionId}
              onSelect={(id) => setFilter('occasionId', id)}
            />
          </FilterSection>
          <Separator className="bg-ds-border-soft" />
        </>
      )}

      <FilterSection
        title={t('rating')}
        resetLabel={t('reset')}
        active={Boolean(minRating)}
        onReset={() => resetFilter('minRating')}
      >
        <RatingFilter
          value={minRating}
          onChange={(rating) => setFilter('minRating', rating)}
          label={(rating) => t('ratingLabel', { rating })}
        />
      </FilterSection>
      <Separator className="bg-ds-border-soft" />

      <FilterSection
        title={t('price')}
        resetLabel={t('reset')}
        active={minPrice != null || maxPrice != null}
        onReset={() => setFilters({ minPrice: undefined, maxPrice: undefined })}
      >
        <PriceRangeFilter
          key={`${minPrice ?? ''}-${maxPrice ?? ''}`}
          minPrice={minPrice}
          maxPrice={maxPrice}
          fromLabel={t('from')}
          toLabel={t('to')}
          onCommit={(min, max) => setFilters({ minPrice: min, maxPrice: max })}
        />
      </FilterSection>

      <div className="border-ds-border-soft mt-4 border-t pt-4">
        <Button
          variant="outline"
          disabled={!hasAnyFilter}
          className="bg-ds-bg-danger-faint text-ds-text-primary hover:bg-ds-bg-danger-faint/80 h-10 w-full border-none disabled:cursor-not-allowed disabled:opacity-50"
          onClick={resetAll}
        >
          <RotateCcw className="size-4" />
          {t('resetAll')}
        </Button>
      </div>
    </div>
  );
};

const ProductFiltersSidebar = ({ categories, occasions }: ProductFiltersSidebarProps) => {
  const t = useTranslations('products.filters');
  const { categoryIds, occasionId, minRating, minPrice, maxPrice } = useProductFilters();
  const activeFilterCount =
    categoryIds.length +
    Number(Boolean(occasionId)) +
    Number(Boolean(minRating)) +
    Number(minPrice != null || maxPrice != null);

  return (
    <>
      <aside className="hidden w-75 shrink-0 md:block">
        <ProductFiltersContent categories={categories} occasions={occasions} />
      </aside>

      <div className="w-full md:hidden">
        <Sheet>
          <SheetTrigger render={<Button variant="outline" className="h-11 w-full justify-between rounded-xl px-4" />}>
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="size-4.5" />
              {t('title')}
            </span>
            {activeFilterCount > 0 && (
              <span className="bg-ds-bg-primary-saturated text-ds-text-inverse flex size-6 items-center justify-center rounded-full text-xs font-semibold">
                {activeFilterCount}
              </span>
            )}
          </SheetTrigger>

          <SheetContent
            side="bottom"
            className="border-ds-border-soft bg-ds-bg-plain max-h-[88dvh] gap-0 overflow-y-auto rounded-t-3xl px-4 pb-6"
          >
            <SheetHeader className="bg-ds-bg-plain sticky top-0 z-10 px-0 py-4">
              <SheetTitle className="text-ds-text-plain flex items-center gap-2 text-lg font-semibold">
                <SlidersHorizontal className="text-ds-text-primary size-5" />
                {t('title')}
              </SheetTitle>
              <SheetDescription>{t('description')}</SheetDescription>
            </SheetHeader>
            <ProductFiltersContent categories={categories} occasions={occasions} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default ProductFiltersSidebar;
