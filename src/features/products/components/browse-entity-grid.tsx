import { BrowseEntityCard } from './browse-entity-card';

export interface BrowseEntityGridItem {
  id: string;
  title: string;
  image: string | null;
  countLabel?: string;
}

interface BrowseEntityGridProps {
  items: BrowseEntityGridItem[];
  getHref: (item: BrowseEntityGridItem) => string;
  emptyLabel: string;
}

export function BrowseEntityGrid({ items, getHref, emptyLabel }: BrowseEntityGridProps) {
  if (items.length === 0) {
    return <p className="text-ds-text-muted py-20 text-center text-sm">{emptyLabel}</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
      {items.map((item) => (
        <BrowseEntityCard
          key={item.id}
          href={getHref(item)}
          title={item.title}
          image={item.image}
          countLabel={item.countLabel}
        />
      ))}
    </div>
  );
}
