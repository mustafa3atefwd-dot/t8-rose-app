import Image from 'next/image';
import { cn } from '@/shared/lib/utils';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { ICategory } from '../../lib/types/category';

interface CategoryFilterProps {
  categories: ICategory[];
  selectedCategoryIds: string[];
  onSelectedCategoryIdsChange: (categoryIds: string[]) => void;
}

const CategoryFilter = ({ categories, selectedCategoryIds, onSelectedCategoryIdsChange }: CategoryFilterProps) => {
  // Variables
  const selectedCategoryIdsSet = new Set(selectedCategoryIds);

  // Functions
  const handleCategoryToggle = (categoryId: string, isChecked: boolean) => {
    const nextCategoryIds = isChecked
      ? [...selectedCategoryIds, categoryId]
      : selectedCategoryIds.filter((selectedCategoryId) => selectedCategoryId !== categoryId);

    onSelectedCategoryIdsChange(nextCategoryIds);
  };

  return (
    <div className="flex max-h-52 scrollbar-none flex-col gap-1 overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => {
        const isSelected = selectedCategoryIdsSet.has(category.id);
        const checkboxId = `category-${category.id}`;

        return (
          <label
            key={category.id}
            htmlFor={checkboxId}
            className={cn(
              'relative flex min-h-7.5 cursor-pointer items-center overflow-hidden rounded-sm pe-2 text-start text-sm font-medium transition-colors',
              isSelected
                ? 'border-ds-border-primary bg-ds-bg-primary-fade text-ds-text-plain'
                : 'bg-ds-bg-muted text-ds-text-plain hover:bg-ds-bg-soft border-transparent'
            )}
          >
            <span
              className={cn(
                'bg-ds-bg-default relative me-2.5 h-full min-h-7.5 w-8 shrink-0 overflow-hidden',
                isSelected ? 'bg-ds-bg-primary-saturated' : 'bg-ds-bg-default'
              )}
            >
              {category.image && (
                <Image
                  src={category.image}
                  alt=""
                  fill
                  unoptimized
                  className="object-contain p-0.5 brightness-0 invert"
                />
              )}
            </span>
            <span className="line-clamp-1 flex-1">{category.title}</span>
            <Checkbox
              id={checkboxId}
              checked={isSelected}
              className="hidden"
              onCheckedChange={(checked) => handleCategoryToggle(category.id, checked === true)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
