import { useEffect } from 'react';

export function SEORedirects() {
  useEffect(() => {
    // Force HTTPS redirect on client side
    if (typeof window !== 'undefined' && window.location.protocol === 'http:' && !window.location.hostname.includes('localhost')) {
      window.location.href = window.location.href.replace('http:', 'https:');
    }
  }, []);

  return null;
}