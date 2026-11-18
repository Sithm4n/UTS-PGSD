import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  accentClass?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'Ilustrasi Pembelajaran',
  accentClass = 'from-slate-100 to-slate-200 text-slate-600',
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br p-6 text-center ${accentClass} ${className}`}
      >
        <BookOpen className="h-8 w-8 mb-2 opacity-75" aria-hidden="true" />
        <span className="text-sm font-medium">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
