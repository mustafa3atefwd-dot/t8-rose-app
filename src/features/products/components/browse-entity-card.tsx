import Image from 'next/image';
import { Link } from '@/i18n/navigation';

interface BrowseEntityCardProps {
  href: string;
  title: string;
  image: string | null;
  countLabel?: string;
}

export function BrowseEntityCard({ href, title, image, countLabel }: BrowseEntityCardProps) {
  return (
    <Link href={href} className="group flex w-full flex-col gap-3">
      <div className="bg-ds-bg-muted relative aspect-square w-full overflow-hidden rounded-2xl">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            unoptimized
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="text-ds-text-muted flex h-full w-full items-center justify-center text-sm">{title}</div>
        )}
      </div>

      <div className="flex items-center justify-between gap-2">
        <h3 className="text-ds-text-plain group-hover:text-ds-text-primary line-clamp-1 text-base font-semibold transition-colors">
          {title}
        </h3>
        {countLabel && <span className="text-ds-text-muted shrink-0 text-sm">{countLabel}</span>}
      </div>
    </Link>
  );
}
