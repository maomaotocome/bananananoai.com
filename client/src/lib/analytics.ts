// Modern Google Analytics 4 Integration
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    clarity: (...args: any[]) => void;
  }
}

// Google Analytics 4 Configuration
const GA_MEASUREMENT_ID = 'G-S63C99GVPN';
const CLARITY_PROJECT_ID = 't414yz89wj';

// Prevent duplicate initialization
let isGAInitialized = false;

// Initialize Google Analytics - CANONICAL IMPLEMENTATION
export const initGA = () => {
  // CRITICAL: Prevent duplicate initialization 
  if (isGAInitialized || document.querySelector(`script[src*="gtag/js?id=${GA_MEASUREMENT_ID}"]`)) {
    console.log('🚫 GA4 already initialized - skipping duplicate initialization');
    return;
  }
  
  // Mark as initialized
  isGAInitialized = true;
  
  // STEP 1: Initialize dataLayer and gtag function BEFORE script loads (Google's canonical approach)
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer.push(args);
  };
  
  // STEP 2: Call gtag with current timestamp
  window.gtag('js', new Date());
  
  // STEP 3: Create and append the Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  
  // STEP 4: Configure GA4 after script setup (let Google's gtag handle the transport)
  // Wait briefly to ensure Google's script can override our shim
  setTimeout(() => {
    // Fix for development/replit environment
    const isDevelopment = window.location.hostname.includes('replit.dev') || 
                         window.location.hostname === 'localhost' || 
                         window.location.hostname.includes('127.0.0.1');
    
    // CRITICAL: Standard GA4 config - don't override gtag function
    const debugConfig = {
      // Debug mode for development - ALWAYS true for replit.dev/localhost
      debug_mode: true,
      // CRITICAL: Disable automatic page view to prevent duplicates
      send_page_view: false,
      // Custom parameters for better tracking
      page_title: document.title,
      page_location: window.location.href,
      // CRITICAL: Set cookie_domain to 'none' for development environments
      cookie_domain: isDevelopment ? 'none' : 'auto',
      // Remove problematic cookie flags for development
      ...(isDevelopment ? {} : { cookie_flags: 'secure;samesite=none' }),
    };

    window.gtag('config', GA_MEASUREMENT_ID, debugConfig);

    // Log initialization for debugging
    if (isDevelopment) {
      console.log('🔥 CANONICAL GA4 IMPLEMENTATION - Transport Enabled!');
      console.log('✅ GA4 Successfully Initialized - Using Google\'s gtag transport');
      console.log('🔍 GA4 Debug Mode Enabled - Tracking ID:', GA_MEASUREMENT_ID);
      console.log('🌐 Current URL:', window.location.href);
      console.log('🍪 Cookie Domain:', isDevelopment ? 'none' : 'auto');
      console.log('⚡ Development Environment Detected');
      console.log('🚨 FORCED Debug Mode: TRUE (DebugView should work now)');
      console.log('📡 Network Requests: Check DevTools → Network for "g/collect" with "_dbg=1"');
      
      // Add URL parameter check for additional debug verification
      const hasDebugParam = window.location.search.includes('debug=1');
      console.log('🔗 URL Debug Parameter:', hasDebugParam ? 'Found' : 'Not found');
    }
  }, 100); // Small delay to let Google's script load and define the real gtag
};

// Initialize Microsoft Clarity
export const initClarity = () => {
  (function(c: any, l: any, a: any, r: any, i: any, t: any, y: any) {
    c[a] = c[a] || function() {
      (c[a].q = c[a].q || []).push(arguments);
    };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_PROJECT_ID, {}, {});
};

// Page view tracking
export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Send page view event
    window.gtag('event', 'page_view', {
      page_title: title || document.title,
      page_location: window.location.href,
      page_path: path,
    });
    
    // Also send config for debugging
    const isDevelopment = window.location.hostname.includes('replit.dev') || 
                         window.location.hostname === 'localhost' || 
                         window.location.hostname.includes('127.0.0.1');
    if (isDevelopment) {
      console.log('📊 GA4 Page View:', {
        path: path,
        title: title || document.title,
        url: window.location.href
      });
    }
  }
};

// Event tracking - Enhanced with debug mode
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Enhanced event tracking with forced debug mode for DebugView
    const isDevelopment = window.location.hostname.includes('replit.dev') || 
                         window.location.hostname === 'localhost' || 
                         window.location.hostname.includes('127.0.0.1');
    
    const eventData = {
      event_category: category,
      event_label: label,
      value: value,
      // CRITICAL: Force debug mode for all events in development
      ...(isDevelopment ? { debug_mode: true } : {}),
    };
    
    window.gtag('event', action, eventData);
    
    // Debug logging for verification
    if (isDevelopment) {
      console.log(`🎯 GA4 Event Sent: ${action}`, eventData);
      console.log('🔍 Debug mode: TRUE (should appear in DebugView)');
    }
  }
};

// Conversion tracking
export const trackConversion = (conversionId: string, conversionLabel?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${GA_MEASUREMENT_ID}/${conversionId}`,
      event_label: conversionLabel,
    });
  }
};

// User properties setting
export const setUserProperty = (propertyName: string, value: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      custom_map: {
        [propertyName]: value
      }
    });
  }
};

// Clarity event tracking
export const trackClarityEvent = (eventName: string, data?: any) => {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('event', eventName, data);
  }
};