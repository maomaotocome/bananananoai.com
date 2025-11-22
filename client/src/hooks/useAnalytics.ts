import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { trackPageView, trackEvent, trackClarityEvent } from '@/lib/analytics';

// Module-level tracking state - survives React StrictMode remounts
const trackedPaths = new Set<string>();
const pathTimestamps = new Map<string, number>();
const DUPLICATE_THRESHOLD_MS = 1000; // Consider duplicate if within 1 second

// Page view tracking Hook - Prevents duplicate tracking in React StrictMode
export const usePageTracking = () => {
  const [location] = useLocation();
  const prevLocationRef = useRef<string | null>(null);

  useEffect(() => {
    // Skip if this is the exact same location as previous effect run
    if (prevLocationRef.current === location) {
      return;
    }
    
    // Check if we recently tracked this path (within threshold)
    const now = Date.now();
    const lastTracked = pathTimestamps.get(location);
    if (lastTracked && (now - lastTracked) < DUPLICATE_THRESHOLD_MS) {
      console.log(`⏭️  Skipping duplicate page_view for ${location} (tracked ${now - lastTracked}ms ago)`);
      return;
    }
    
    // Update tracking state
    prevLocationRef.current = location;
    pathTimestamps.set(location, now);
    trackedPaths.add(location);
    
    // Track page view
    trackPageView(location);
    
    // Track Clarity page view
    trackClarityEvent('page_view', {
      path: location,
      timestamp: now
    });
    
    console.log(`✅ Tracked page_view: ${location}`);
  }, [location]);
};

// Event tracking Hook
export const useEventTracking = () => {
  const trackImageEdit = (prompt: string, duration: number) => {
    trackEvent('image_edit', 'editor', 'prompt_used', duration);
    trackClarityEvent('image_edit', {
      prompt: prompt.substring(0, 100), // Only record first 100 characters
      duration,
      timestamp: Date.now()
    });
  };

  const trackFeatureSelection = (feature: string) => {
    trackEvent('feature_select', 'ui', feature);
    trackClarityEvent('feature_select', {
      feature,
      timestamp: Date.now()
    });
  };

  const trackPromptSuggestion = (suggestion: string) => {
    trackEvent('prompt_suggestion', 'editor', suggestion);
    trackClarityEvent('prompt_suggestion', {
      suggestion: suggestion.substring(0, 50),
      timestamp: Date.now()
    });
  };

  const trackGalleryInteraction = (action: string, itemId?: string) => {
    trackEvent('gallery_interaction', 'engagement', action);
    trackClarityEvent('gallery_interaction', {
      action,
      itemId,
      timestamp: Date.now()
    });
  };

  const trackConversionGoal = (goal: string) => {
    trackEvent('conversion', 'goal', goal);
    trackClarityEvent('conversion', {
      goal,
      timestamp: Date.now()
    });
  };

  return {
    trackImageEdit,
    trackFeatureSelection,
    trackPromptSuggestion,
    trackGalleryInteraction,
    trackConversionGoal
  };
};