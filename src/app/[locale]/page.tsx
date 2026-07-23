import AboutSection from '@/features/home/components/about-section';
import Gallery from '@/features/home/components/gallery-section';
import TestimonialsSection from '@/features/home/components/testimonials-section';
import TrustedCompanies from '@/features/home/components/trusted-companies-section';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <AboutSection />
      <Gallery />
      <TestimonialsSection />
      <TrustedCompanies />
    </>
  );
}
