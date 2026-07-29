import { useTranslations } from 'next-intl';
import { galleryColumns } from '@/features/home/lib/constants';
import { ImageWithSkeleton, SectionLabel, SectionTitle } from '@/shared/components';

function GallerySection() {
  const t = useTranslations('home.gallery');

  return (
    <section className="py-8 sm:py-12 md:py-14 lg:py-17.5">
      <div className="container">
        {/* ===== Section Header - Label & Title ===== */}
        <div className="mb-10 text-center">
          <SectionLabel>{t('label')}</SectionLabel>
          <SectionTitle>{t('title')}</SectionTitle>
        </div>

        {/* ===== Gallery Images ===== */}
        <div className="flex flex-col gap-3 lg:flex-row">
          {galleryColumns.map((column, columnIndex) => (
            <div key={`gallery-column-${columnIndex}`} className="flex flex-1 flex-col gap-3">
              {column.map((item) => (
                <div key={item.src} className={`relative overflow-hidden rounded-xl ${item.className}`}>
                  <ImageWithSkeleton
                    src={item.src}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GallerySection;
