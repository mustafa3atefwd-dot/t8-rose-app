import { AboutSection, GallerySection, TestimonialsSection, TrustedCompaniesSection } from '@/features/home/components';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <AboutSection />
      <GallerySection />
      <TestimonialsSection />
      <TrustedCompaniesSection />
    </>
  );
}
