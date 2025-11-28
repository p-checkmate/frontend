import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  rounded?: string;
  aspectRatio?: string;
}

export default function Image({
  src,
  alt = '',
  className,
  aspectRatio = '',
  rounded = 'rounded-md',
  ...props
}: ImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    });

    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn('relative w-full overflow-hidden', aspectRatio, rounded, className)}
    >
      {/*에러: bg-gray1*/}
      {inView && error && <div className={cn('h-full w-full bg-gray1', rounded)} />}

      {/*로딩 중: blur*/}
      {inView && !error && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={cn(
            'h-full w-full object-cover transition-all duration-500',
            rounded,
            loaded ? 'blur-0 opacity-100' : 'opacity-70 blur-sm',
          )}
          {...props}
        />
      )}
    </div>
  );
}
