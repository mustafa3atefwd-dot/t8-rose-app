'use client';

import React, { useSyncExternalStore } from 'react';
import { HeroCarousel } from './hero-carousel';
import { CategoryTrio } from './category-trio';
import { FeaturesBar } from './features-bar';
import { HeroSkeleton } from '../../skeletons/hero-skeleton';
import HeroBanner from './hero-baner';



// Never emits, so the snapshot is read once per environment: `false` while
// server-rendering / hydrating, `true` on the client afterwards.
const subscribeToNothing = () => () => {};

export default function HomepageHero() {
  const mounted = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  );

  if (!mounted) {
    return <HeroSkeleton />;
  }

  return (
    <div className="bg-background text-foreground container mx-auto  max-w-7xl space-y-6 px-4 py-8 transition-colors duration-300 select-none">
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-4">
        <HeroBanner />
        <HeroCarousel />
      </div>
      <CategoryTrio />
      <FeaturesBar />
    </div>
  );
}