'use client';

import { ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { ImageWithSkeleton } from '@/shared/components';
import { cn } from '@/shared/lib/utils';

interface ProductGalleryProps {
  images: string[];
  productTitle: string;
  galleryLabel: string;
  imageLabel: string;
}

export function ProductGallery({ images, productTitle, galleryLabel, imageLabel }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  return (
    <section aria-label={galleryLabel} className="min-w-0">
      <div className="bg-ds-bg-muted relative aspect-[3/2] overflow-hidden rounded-xl">
        {selectedImage ? (
          <ImageWithSkeleton
            src={selectedImage}
            alt={`${productTitle} ${imageLabel} ${selectedIndex + 1}`}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="text-ds-text-muted flex h-full items-center justify-center">
            <ImageIcon aria-hidden="true" className="size-12" />
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => {
            const isSelected = index === selectedIndex;

            return (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`${imageLabel} ${index + 1}`}
                aria-pressed={isSelected}
                className={cn(
                  'bg-ds-bg-muted relative aspect-[4/5] w-[90px] shrink-0 overflow-hidden rounded-lg border-2 transition',
                  'hover:border-ds-border-primary-faint hover:opacity-90',
                  'focus-visible:ring-ds-ring focus-visible:ring-3 focus-visible:outline-none',
                  isSelected ? 'border-ds-border-primary' : 'border-transparent'
                )}
              >
                <ImageWithSkeleton
                  src={image}
                  alt={`${productTitle} ${imageLabel} ${index + 1}`}
                  fill
                  sizes="90px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
