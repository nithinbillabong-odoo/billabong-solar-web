'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface AuthorAvatarProps {
  name: string;
  avatarUrl?: string;
  size?: number;
  className?: string;
}

export default function AuthorAvatar({
  name = 'Nithin',
  avatarUrl = '/images/authors/nithin.svg',
  size = 32,
  className = '',
}: AuthorAvatarProps) {
  const [imageError, setImageError] = useState(false);

  // If error or no avatar, show a luxury styled initials badge
  if (imageError || !avatarUrl) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-full bg-gradient-to-br from-[#171D4D] to-[#FF5E00] text-white font-bold flex items-center justify-center text-xs shadow-sm ring-1 ring-white/30 flex-shrink-0 ${className}`}
        title={name}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-full overflow-hidden shadow-sm ring-1 ring-black/5 bg-slate-100 flex-shrink-0 ${className}`}
    >
      <Image
        src={avatarUrl}
        alt={name}
        fill
        className="object-cover"
        sizes={`${size}px`}
        onError={() => setImageError(true)}
        unoptimized={avatarUrl.endsWith('.svg')}
      />
    </div>
  );
}
