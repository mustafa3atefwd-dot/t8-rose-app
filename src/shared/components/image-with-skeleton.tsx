'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface ImageWithSkeletonProps extends ImageProps {
  fallback?: string;
}

function ImageWithSkeleton({
  fallback = '/images/image-placeholder.png',
  className,
  alt,
  ...props
}: ImageWithSkeletonProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="relative h-full w-full">
      {loading && <div className="absolute inset-0 animate-pulse bg-zinc-200 dark:bg-zinc-700" />}

      <Image
        {...props}
        alt={alt}
        className={`${className} ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        src={error ? fallback : props.src}
      />
    </div>
  );
}

export default ImageWithSkeleton;
