import Image from 'next/image';
import { cn } from '@/shared/lib/utils';
import { ICategory } from '../../lib/types/category';

interface CategoryFilterProps {
  categories: ICategory[];
  activeId?: string;
  onSelect: (id?: string) => void;
}

const CategoryFilter = ({ categories, activeId, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex max-h-52 [scrollbar-width:none] flex-col gap-1 overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => {
        const isActive = category.id === activeId;

        return (
          <button
            key={category.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(isActive ? undefined : category.id)}
            className={cn(
              'relative flex min-h-7.5 items-center overflow-hidden rounded-sm text-start text-sm font-medium transition-colors',
              isActive
                ? 'border-ds-border-primary bg-ds-bg-primary-fade text-ds-text-plain'
                : 'bg-ds-bg-muted text-ds-text-plain hover:bg-ds-bg-soft border-transparent'
            )}
          >
            <span
              className={cn(
                'bg-ds-bg-default relative me-2.5 h-full min-h-7.5 w-8 shrink-0 overflow-hidden',
                isActive ? 'bg-ds-bg-primary-saturated' : 'bg-ds-bg-default'
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
            <span className="line-clamp-1">{category.title}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
