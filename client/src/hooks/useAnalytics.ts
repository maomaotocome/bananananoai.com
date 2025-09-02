import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { trackPageView, trackEvent, trackClarityEvent } from '@/lib/analytics';

// Page view tracking Hook
export const usePageTracking = () => {
  const [location] = useLocation();

  useEffect(() => {
    // Track page view
    trackPageView(location);
    
    // Track Clarity page view
    trackClarityEvent('page_view', {
      path: location,
      timestamp: Date.now()
    });
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