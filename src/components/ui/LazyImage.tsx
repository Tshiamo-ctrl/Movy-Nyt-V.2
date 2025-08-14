import React, { useState, useRef, useEffect } from 'react';
import { Box, styled, keyframes } from '@mui/material';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const PlaceholderContainer = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  background: 'linear-gradient(90deg, var(--color-surface) 25%, rgba(255, 255, 255, 0.1) 50%, var(--color-surface) 75%)',
  backgroundSize: '200% 100%',
  animation: `${shimmer} 1.5s infinite`,
  borderRadius: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40px',
    height: '40px',
    border: '3px solid var(--color-primary)',
    borderTop: '3px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  
  '@keyframes spin': {
    '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
    '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
  },
}));

const ImageContainer = styled(Box)<{ loaded: boolean }>(({ loaded }) => ({
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 'inherit',
  
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.3s ease-in-out',
    opacity: loaded ? 1 : 0,
    animation: loaded ? `${fadeIn} 0.5s ease-out` : 'none',
  },
}));

const ErrorContainer = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--color-surface)',
  color: 'var(--color-text-secondary)',
  borderRadius: 'inherit',
  border: '1px dashed var(--color-text-secondary)',
  opacity: 0.5,
  
  '& svg': {
    fontSize: '2rem',
    marginBottom: '8px',
  },
}));

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: React.ReactNode;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  onLoad,
  onError,
  placeholder,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(container);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, []);

  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    onError?.();
  };

  return (
    <Box ref={containerRef} className={className} sx={{ width: '100%', height: '100%' }}>
      {!inView && (placeholder || <PlaceholderContainer />)}
      
      {inView && !error && (
        <ImageContainer loaded={loaded}>
          {!loaded && (placeholder || <PlaceholderContainer />)}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
          />
        </ImageContainer>
      )}
      
      {error && (
        <ErrorContainer>
          <Box component="span" sx={{ fontSize: '2rem' }}>📷</Box>
          <Box component="span" sx={{ fontSize: '0.75rem' }}>Failed to load</Box>
        </ErrorContainer>
      )}
    </Box>
  );
};

export default LazyImage;
