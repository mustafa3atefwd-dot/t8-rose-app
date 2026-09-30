import BestSelling from '@/features/home/components/best-selling';
import MostPopular from '@/features/home/components/most-popular';
import { AboutSection, GallerySection, TestimonialsSection, TrustedCompaniesSection } from '@/features/home/components';
import HomepageHero from '@/features/home/components/hero-section/hero-main-section';

/** Best Selling and Most Popular fetch server-side; revalidate periodically so rankings don't go stale between deploys. */
export const revalidate = 60;

const HomePage = () => {
  return (
    <>
      <HomepageHero/>
      <BestSelling />
      <MostPopular />
      <AboutSection />
      <GallerySection />
      <TestimonialsSection />
      <TrustedCompaniesSection />
    </>
  );
};

export default HomePage;
