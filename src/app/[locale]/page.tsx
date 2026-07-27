import BestSelling from '@/features/home/components/best-selling';
import MostPopular from '@/features/home/components/most-popular';

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <BestSelling />
      <MostPopular />
    </>
  );
}
