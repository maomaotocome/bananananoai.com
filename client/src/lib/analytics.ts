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

// Prevent duplicate initialization - Force refresh for environment changes
let isGAInitialized = false;
const GA_INIT_TIMESTAMP = Date.now();

// Initialize Google Analytics - DUAL ENVIRONMENT SUPPORT 
export const initGA = () => {
  // CRITICAL: Strong duplicate prevention - check for any GA4 initialization
  const existingScript = document.querySelector(`script[src*="gtag/js"]`) || 
                         document.querySelector(`script[src*="googletagmanager.com"]`);
  const hasDataLayer = window.dataLayer && window.dataLayer.length > 0;
  
  if (isGAInitialized || (existingScript && hasDataLayer)) {
    console.log('🔄 GA4 OVERRIDE: Taking control of existing GA4 - Environment:', window.location.hostname);
    // Don't return - we want to reconfigure even if something exists
  } else if (existingScript) {
    console.log('🚫 GA4 script exists but no dataLayer - Safe to proceed');
  }
  
  // Mark as initialized
  isGAInitialized = true;
  
  // STEP 1: FORCE Initialize dataLayer and gtag function (Override any existing)
  window.dataLayer = window.dataLayer || [];
  
  // CRITICAL: Always define our gtag to ensure we control the functionality
  window.gtag = function gtag(...args: any[]) {
    console.log('🏃 GA4 Custom gtag called:', args[0]);
    window.dataLayer.push(args);
  };
  
  // STEP 2: Call gtag with current timestamp
  window.gtag('js', new Date());
  
  // STEP 3: Create and append the Google Analytics script (Only if not exists)
  const existingGAScript = document.querySelector(`script[src*="gtag/js?id=${GA_MEASUREMENT_ID}"]`);
  if (!existingGAScript) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.setAttribute('data-source', 'custom-dual-env');
    document.head.appendChild(script);
    console.log('📡 GA4 Script Added - Custom Implementation');
  } else {
    console.log('📡 GA4 Script Already Exists - Using Existing');
  }
  
  // STEP 4: Configure GA4 after script setup (let Google's gtag handle the transport)
  // Wait briefly to ensure Google's script can override our shim
  setTimeout(() => {
    // Fix for development/replit environment
    const isDevelopment = window.location.hostname.includes('replit.dev') || 
                         window.location.hostname === 'localhost' || 
                         window.location.hostname.includes('127.0.0.1');
    
    // PRODUCTION vs DEVELOPMENT configuration - Use environment variables for Vite
    const isProduction = (import.meta.env.VITE_REPLIT_DEPLOYMENT === '1') || 
                        window.location.hostname === 'bananananoai.com' ||
                        window.location.hostname.endsWith('.replit.app');
    
    const debugConfig = {
      // Debug mode: ON in development, OFF in production
      debug_mode: isDevelopment && !isProduction,
      // CRITICAL: Disable automatic page view to prevent duplicates
      send_page_view: false,
      // Custom parameters for better tracking
      page_title: document.title,
      page_location: window.location.href,
      // Cookie domain: 'none' for dev, 'auto' for production
      cookie_domain: isDevelopment ? 'none' : 'auto',
      // Cross-domain tracking for production
      ...(isProduction ? { 
        cookie_flags: 'secure;samesite=none',
        allow_google_signals: true,
        allow_ad_personalization_signals: true 
      } : {}),
      // Development-specific settings
      ...(isDevelopment ? {
        anonymize_ip: false,  // Allow full IP in dev for testing
        allow_google_signals: false  // Disable in dev
      } : {})
    };

    window.gtag('config', GA_MEASUREMENT_ID, debugConfig);

    // Enhanced logging for both environments  
    console.log('🔥 DUAL-ENVIRONMENT GA4 SETUP - Production Ready! [' + GA_INIT_TIMESTAMP + ']');
    console.log('✅ Environment:', isProduction ? '🚀 PRODUCTION (bananananoai.com)' : '🧪 DEVELOPMENT (replit.dev)');
    console.log('✅ GA4 Successfully Initialized - Using Google\'s gtag transport');
    console.log('🔍 GA4 Measurement ID:', GA_MEASUREMENT_ID);
    console.log('🌐 Current URL:', window.location.href);
    console.log('🍪 Cookie Domain:', isDevelopment ? 'none' : 'auto');
    console.log('🚨 Debug Mode:', debugConfig.debug_mode ? 'ON (DebugView Active)' : 'OFF (Production Mode)');
    console.log('📡 Target Domain:', isProduction ? 'bananananoai.com' : 'replit.dev');
    
    if (isDevelopment && !isProduction) {
      console.log('⚠️  DEV ENVIRONMENT: Limited GA4 functionality due to domain mismatch');
      console.log('🚀 DEPLOY TO PRODUCTION: GA4 will work fully on bananananoai.com');
      console.log('📡 Test Network: Check DevTools → Network for "g/collect" requests');
      console.log('💡 SOLUTION: When you deploy, GA4 will activate automatically on bananananoai.com');
    } else if (isProduction) {
      console.log('🎉 PRODUCTION MODE: Full GA4 functionality active!');
      console.log('📊 Data Collection: Active on bananananoai.com');
      console.log('🔍 DebugView: Disabled in production for performance');
    }
    
    // Add URL parameter check for additional debug verification
    const hasDebugParam = window.location.search.includes('debug=1');
    console.log('🔗 URL Debug Parameter:', hasDebugParam ? 'Found' : 'Not found');
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