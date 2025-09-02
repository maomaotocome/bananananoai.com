// Performance monitoring and optimization utilities for Banana Nano Ai
// Implements technical SEO improvements recommended by ChatGPT analysis

// Core Web Vitals measurement
export function measureWebVitals() {
  if (typeof window === 'undefined') return;
  
  // Largest Contentful Paint (LCP)
  const measureLCP = () => {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        console.log('LCP:', entry.startTime);
        // Track LCP for analytics
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            name: 'LCP',
            value: Math.round(entry.startTime),
            event_category: 'Web Vitals'
          });
        }
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  };
  
  // First Input Delay (FID)
  const measureFID = () => {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const fidEntry = entry as PerformanceEventTiming;
        const fidValue = fidEntry.processingStart - fidEntry.startTime;
        console.log('FID:', fidValue);
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            name: 'FID', 
            value: Math.round(fidValue),
            event_category: 'Web Vitals'
          });
        }
      }
    }).observe({ type: 'first-input', buffered: true });
  };
  
  // Cumulative Layout Shift (CLS) - Throttle frequent output
  const measureCLS = () => {
    let clsValue = 0;
    let lastLogTime = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const clsEntry = entry as any;
        if (!clsEntry.hadRecentInput) {
          clsValue += clsEntry.value;
        }
      }
      
      // Only log once every 2 seconds to avoid excessive output
      const now = Date.now();
      if (now - lastLogTime > 2000) {
        console.log('CLS:', clsValue);
        lastLogTime = now;
        
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            name: 'CLS',
            value: Math.round(clsValue * 1000),
            event_category: 'Web Vitals'
          });
        }
      }
    }).observe({ type: 'layout-shift', buffered: true });
  };
  
  // Initialize measurements
  measureLCP();
  measureFID(); 
  measureCLS();
}

// Image lazy loading optimization
export function optimizeImageLoading() {
  if (!('IntersectionObserver' in window)) return;
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy-loading');
          imageObserver.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px 0px', // Load images 50px before they come into view
    threshold: 0.01
  });
  
  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Font loading optimization
export function optimizeFontLoading() {
  if (!('fonts' in document)) return;
  
  // Preload critical fonts
  const criticalFonts = [
    'Inter-Regular',
    'Inter-SemiBold', 
    'Inter-Bold'
  ];
  
  criticalFonts.forEach(font => {
    document.fonts.load(`400 1rem ${font}`).catch(() => {
      console.warn(`Failed to load font: ${font}`);
    });
  });
}

// Resource prefetching for better performance
export function prefetchCriticalResources() {
  if (typeof window === 'undefined') return;
  
  const prefetchResources = [
    '/how-to-use',
    '/examples', 
    '/faq'
  ];
  
  // Prefetch critical pages on idle
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      prefetchResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        document.head.appendChild(link);
      });
    });
  }
}

// Service worker registration for caching
export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
  
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Performance monitoring initialization
export function initializePerformanceMonitoring() {
  if (typeof window === 'undefined') return;
  
  // Wait for page load
  window.addEventListener('load', () => {
    measureWebVitals();
    optimizeImageLoading();
    optimizeFontLoading();
    prefetchCriticalResources();
    
    // Track page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('Page load time:', loadTime + 'ms');
    
    if (window.gtag) {
      window.gtag('event', 'page_load_time', {
        value: Math.round(loadTime),
        event_category: 'Performance'
      });
    }
  });
}

// Mobile performance optimization
export function optimizeMobilePerformance() {
  if (typeof window === 'undefined') return;
  
  // Reduce animations on low-end devices
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mediaQuery.matches) {
    document.documentElement.style.setProperty('--animation-duration', '0s');
  }
  
  // Optimize for slow connections
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection && connection.effectiveType === 'slow-2g') {
      // Disable non-critical animations
      document.body.classList.add('low-bandwidth');
    }
  }
}

// Initialize all performance optimizations
export function initializePerformance() {
  initializePerformanceMonitoring();
  optimizeMobilePerformance();
  registerServiceWorker();
}

export default {
  measureWebVitals,
  optimizeImageLoading,
  optimizeFontLoading,
  prefetchCriticalResources,
  registerServiceWorker,
  initializePerformance
};