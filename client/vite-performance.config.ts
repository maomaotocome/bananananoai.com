// Performance optimization configuration for Banana Nano Ai
// Implements ChatGPT's recommended technical SEO improvements

export const performanceConfig = {
  // Image optimization settings
  images: {
    lazy: true, // Enable lazy loading for all images
    webp: true, // Convert images to WebP format when possible
    quality: 85, // Optimal quality for web (85% compression)
    formats: ['webp', 'avif', 'jpg'], // Preferred formats for browser compatibility
    sizes: { // Responsive image sizes for different viewports
      small: 400,
      medium: 800,
      large: 1200,
      xlarge: 1600
    }
  },
  
  // Code splitting and bundle optimization
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    reportCompressedSize: false, // Skip gzip analysis for faster builds
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries for better caching
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['lucide-react', '@radix-ui/react-slot'],
          'router-vendor': ['wouter'],
          'animation-vendor': ['framer-motion'],
          'query-vendor': ['@tanstack/react-query']
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Allow larger chunks for better performance
  },
  
  // CSS optimization
  css: {
    devSourcemap: false, // Disable CSS source maps in production
    postcss: {
      plugins: [
        // CSS optimization plugins would go here
      ]
    }
  },
  
  // Server configuration for optimal loading
  server: {
    // Enable HTTP/2 for better performance (production)
    https: process.env.NODE_ENV === 'production',
    // Compression settings
    compress: true,
    // Cache settings
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable' // 1 year cache for assets
    }
  },
  
  // Resource hints and preloading
  head: {
    // DNS prefetch for external resources
    dnsPrefetch: [
      'https://fonts.googleapis.com',
      'https://images.unsplash.com',
      'https://www.googletagmanager.com'
    ],
    // Preconnect to critical resources
    preconnect: [
      'https://fonts.gstatic.com'
    ],
    // Resource hints for critical assets
    prefetch: [
      '/favicon.ico',
      '/sitemap.xml'
    ]
  },
  
  // Core Web Vitals optimization targets
  vitals: {
    LCP: 2.5, // Largest Contentful Paint target (seconds)
    FID: 100, // First Input Delay target (milliseconds)
    CLS: 0.1, // Cumulative Layout Shift target
    FCP: 1.8, // First Contentful Paint target (seconds)
    TTFB: 0.8 // Time to First Byte target (seconds)
  },
  
  // Mobile optimization settings
  mobile: {
    viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
    themeColor: '#6366f1', // Primary brand color
    touchIcon: '/apple-touch-icon.png',
    manifest: '/manifest.json'
  },
  
  // SEO performance features
  seo: {
    sitemap: '/sitemap.xml',
    robots: '/robots.txt',
    structured_data: true, // Enable JSON-LD structured data
    canonical: true, // Enable canonical URLs
    og_images: true // Enable Open Graph images
  }
};

export default performanceConfig;