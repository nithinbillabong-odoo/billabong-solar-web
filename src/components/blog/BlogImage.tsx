'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface BlogImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = '/images/blog/post-1-best-installers.jpg';

export default function BlogImage({
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  alt,
  className = '',
  ...props
}: BlogImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);

  return (
    <Image
      {...props}
      src={hasError ? fallbackSrc : imgSrc}
      alt={alt || 'Billabong Solar Victoria'}
      className={className}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}
