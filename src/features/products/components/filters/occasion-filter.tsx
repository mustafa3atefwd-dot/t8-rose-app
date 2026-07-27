import Image from 'next/image';
import { cn } from '@/shared/lib/utils';
import { IOccasion } from '../../lib/types/occasion';

interface OccasionFilterProps {
  occasions: IOccasion[];
  activeId?: string;
  onSelect: (id?: string) => void;
}

const OccasionFilter = ({ occasions, activeId, onSelect }: OccasionFilterProps) => {
  return (
    <div className="grid max-h-62 scrollbar-none grid-cols-2 gap-2.5 overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden">
      {occasions.map((occasion) => {
        const isActive = occasion.id === activeId;

        return (
          <button
            key={occasion.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(isActive ? undefined : occasion.id)}
            className="bg-ds-bg-muted group relative flex h-19 items-center justify-center overflow-hidden rounded-lg transition-all"
          >
            {occasion.image && <Image src={occasion.image} alt="photo" fill unoptimized className="object-cover" />}
            <span className="bg-ds-bg-overlay absolute inset-0 z-10" />
            <span
              className={cn(
                'absolute inset-x-0 bottom-0 z-20 h-1/2 transition-opacity duration-200',
                isActive
                  ? 'bg-ds-bg-occasion-overlay opacity-100'
                  : 'bg-ds-bg-occasion-hover-overlay opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
              )}
            />
            <span className="text-ds-text-inverse relative z-30 p-2 text-center text-base font-medium drop-shadow-sm dark:text-zinc-50">
              {occasion.title}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default OccasionFilter;
