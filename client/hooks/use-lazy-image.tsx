import { useState, useRef, useEffect } from "react";

interface UseLazyImageOptions {
  src: string;
  placeholder?: string;
  rootMargin?: string;
}

export function useLazyImage({
  src,
  placeholder = "",
  rootMargin = "50px",
}: UseLazyImageOptions) {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = new Image();
            img.onload = () => {
              setImageSrc(src);
              setIsLoaded(true);
              observer.disconnect();
            };
            img.onerror = () => {
              setIsError(true);
              observer.disconnect();
            };
            img.src = src;
          }
        });
      },
      { rootMargin },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, rootMargin]);

  return {
    imgRef,
    imageSrc,
    isLoaded,
    isError,
  };
}
