import Marquee from 'react-fast-marquee';
import { useTranslations } from 'next-intl';
import { ImageWithSkeleton, SectionTitle } from '@/shared/components';
import { companies } from '@/features/home/lib/constants';

function TrustedCompaniesSection() {
  const t = useTranslations('home.trustedCompanies');

  return (
    <section className="py-8 sm:py-12 md:py-14 lg:py-17.5">
      <div className="container">
        <div className="bg-maroon-50 rounded-[20px] px-6 py-10 md:px-12 dark:bg-zinc-700">
          {/* ===== Section Header - Title ===== */}
          <SectionTitle className="after:opacity-0">
            {t.rich('title', {
              count: (chunks) => <span className="text-ds-text-secondary">{chunks}</span>,
            })}
          </SectionTitle>

          {/* ===== Marquee Companies ===== */}
          <div dir="ltr">
            <Marquee pauseOnHover speed={40} gradient={false} direction="left">
              {companies.map((company) => (
                <div key={company.id} className="mx-10 mt-10">
                  <ImageWithSkeleton
                    src={company.logo}
                    alt={company.name}
                    width={180}
                    height={60}
                    className="object-contain"
                  />{' '}
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustedCompaniesSection;
