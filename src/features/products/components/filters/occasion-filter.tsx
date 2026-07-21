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
            className={cn(
              'bg-ds-bg-muted group relative flex h-19 items-center justify-center overflow-hidden rounded-lg transition-all',
              isActive && 'ring-ds-border-primary ring-2 ring-offset-1'
            )}
          >
            {occasion.image && <Image src={occasion.image} alt="photo" fill unoptimized className="object-cover" />}
            <span className="bg-ds-bg-overlay absolute inset-0" />
            <span className="bg-ds-bg-occasion-overlay absolute inset-x-0 bottom-0 h-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100" />
            <span className="text-ds-text-inverse relative z-10 p-2 text-center text-base font-medium drop-shadow-sm">
              {occasion.title}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default OccasionFilter;
