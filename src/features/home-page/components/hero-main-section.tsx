import React from 'react';
import { HeroBanner } from './hero-baner';
import { HeroCarousel } from './hero-carousel';
import { CategoryTrio } from './category-trio';
import { FeaturesBar } from './features-bar';

export default function HomepageHero() {
  return (
    <div className="container mx-auto w-full max-w-7xl space-y-6 px-4 py-8 transition-colors duration-300 select-none">
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-4">
        <HeroBanner />
        <HeroCarousel />
      </div>
      <CategoryTrio />
      <FeaturesBar />
    </div>
  );
}