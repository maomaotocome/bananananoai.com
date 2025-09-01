import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { trackPageView, trackEvent, trackClarityEvent } from '@/lib/analytics';

// 页面浏览追踪Hook
export const usePageTracking = () => {
  const [location] = useLocation();

  useEffect(() => {
    // 追踪页面浏览
    trackPageView(location);
    
    // 追踪Clarity页面浏览
    trackClarityEvent('page_view', {
      path: location,
      timestamp: Date.now()
    });
  }, [location]);
};

// 事件追踪Hook
export const useEventTracking = () => {
  const trackImageEdit = (prompt: string, duration: number) => {
    trackEvent('image_edit', 'editor', 'prompt_used', duration);
    trackClarityEvent('image_edit', {
      prompt: prompt.substring(0, 100), // 只记录前100字符
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