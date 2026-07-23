import { Rating } from '@/shared/components';
import React from 'react';

export default function ProductReview() {
  return (
    <article>
      <header className='bg-amber-300'>
        <div className='bg-lime-800 flex items-center gap-2.5'>
          {/* user avater */}
          <div className="size-11.25 rounded-full bg-maroon-600 flex items-center justify-center">
            A
          </div>
          <div>
            <h4>Adrian</h4>
            <span>Apr 7, 2025</span>
          </div>
        </div>
        {/* rating */}
        <div className='bg-red-700 flex items-center gap-1'>
          <Rating rating={4.5} />
          <span>(4.5)</span>
        </div>
      </header>
      {/* review content */}
      <div>
        <title>Awesome Bouquet!</title>
        <p>
          I ordered this bouquet for a special occasion, and it absolutely exceeded my expectations! The flowers were
          fresh, beautifully arranged, and exactly as pictured—if not better. The color combination was stunning and
          gave off such a luxurious vibe. Even the wrapping was elegant and thoughtful. Delivery was right on time, and
          the bouquet arrived in perfect condition. The recipient was genuinely touched and couldn't stop admiring it.
          Highly recommend for anyone looking to make a lasting impression. Will definitely order again!
        </p>
      </div>
    </article>
  );
}
