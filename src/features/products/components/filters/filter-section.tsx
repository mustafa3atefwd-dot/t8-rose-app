import { X } from 'lucide-react';

interface FilterSectionProps {
  title: string;
  resetLabel: string;
  active: boolean;
  onReset: () => void;
  children: React.ReactNode;
}

const FilterSection = ({ title, resetLabel, active, onReset, children }: FilterSectionProps) => {
  return (
    <section className="flex flex-col gap-2.5 py-3.5">
      <div className="flex items-center justify-between">
        <h3 className="text-ds-text-plain text-base font-semibold">{title}</h3>
        {active && (
          <button
            type="button"
            onClick={onReset}
            className="text-ds-text-danger flex min-h-6 items-center gap-1 text-sm font-medium transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <X className="size-3.5" />
            {resetLabel}
          </button>
        )}
      </div>
      {children}
    </section>
  );
};

export default FilterSection;
