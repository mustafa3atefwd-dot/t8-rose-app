import BestSelling from '@/features/home/components/best-selling';
import MostPopular from '@/features/home/components/most-popular';
import React from 'react';

/** Best Selling and Most Popular fetch server-side; revalidate periodically so rankings don't go stale between deploys. */
export const revalidate = 60;

const HomePage = () => {
  return (
    <>
      <BestSelling />
      <MostPopular />
    </>
  );
};

export default HomePage;
