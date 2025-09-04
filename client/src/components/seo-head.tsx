import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEOHead({ 
  title, 
  description, 
  keywords = "banana nano ai, nano banana ai, ai image editor, character consistency, gemini 2.5 flash image, free ai tool",
  image = "https://bananananoai.com/og-image.jpg",
  url = "https://bananananoai.com",
  type = "website"
}: SEOHeadProps) {
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(selector) as HTMLMetaElement;
      
      if (!tag) {
        tag = document.createElement('meta');
        if (property) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:alt', title, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'Banana Nano Ai', true);
    updateMetaTag('og:locale', 'en_US', true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:site', '@bananananoai');
    updateMetaTag('twitter:creator', '@bananananoai');
    
    // Additional SEO tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('author', 'Banana Nano Ai');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1');
    
    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', url);
    
  }, [title, description, keywords, image, url, type]);

  return null;
}

// Pre-defined SEO configurations for each page
export const seoConfigs = {
  home: {
    title: "Banana Nano Ai - Free AI Image Editor with Character Consistency",
    description: "Create viral content with Banana Nano Ai - the #1 ranked AI image editor. Character consistency, multi-image blending, and professional results in seconds. 100% free forever.",
    keywords: "banana nano ai, nano banana ai, free ai image editor, character consistency, gemini 2.5 flash image, ai photo editor, viral content creator",
    url: "https://bananananoai.com"
  },
  howToUse: {
    title: "How to Use Banana Nano Ai - Complete Tutorial Guide 2025",
    description: "Master Banana Nano Ai with our step-by-step tutorial. Learn character consistency, prompt writing, and advanced techniques used by 100K+ creators worldwide.",
    keywords: "banana nano ai tutorial, nano banana ai guide, how to use ai image editor, character consistency tutorial, ai editing techniques",
    url: "https://bananananoai.com/how-to-use"
  },
  faq: {
    title: "Banana Nano Ai FAQ - Answers to Common Questions",
    description: "Get answers about Banana Nano Ai features, pricing, character consistency, and more. Everything you need to know about the #1 AI image editor.",
    keywords: "banana nano ai faq, nano banana ai questions, ai image editor help, character consistency questions, free ai tool faq",
    url: "https://bananananoai.com/faq"
  },
  examples: {
    title: "Banana Nano Ai Examples - Viral Content & Character Consistency",
    description: "See amazing Banana Nano Ai examples and results. Character consistency, virtual try-ons, background changes, and viral content creation examples.",
    keywords: "banana nano ai examples, nano banana ai gallery, character consistency examples, ai editing results, viral content examples",
    url: "https://bananananoai.com/examples"
  },
  tutorials: {
    title: "Banana Nano Ai Tutorials - Advanced AI Image Editing Techniques",
    description: "Learn advanced Banana Nano Ai techniques with our video tutorials. Character consistency, multi-image blending, and professional editing methods.",
    keywords: "banana nano ai tutorials, nano banana ai videos, character consistency tutorials, ai image editing lessons, professional ai techniques",
    url: "https://bananananoai.com/tutorials"
  },
  blog: {
    title: "Banana Nano Ai Blog - AI Image Editing Tips & News",
    description: "Stay updated with Banana Nano Ai blog. Latest AI image editing trends, character consistency techniques, and creative inspiration for content creators.",
    keywords: "banana nano ai blog, nano banana ai news, ai image editing blog, character consistency tips, ai creativity blog",
    url: "https://bananananoai.com/blog"
  },
  caseStudies: {
    title: "Banana Nano Ai Case Studies - Success Stories & Results",
    description: "Real success stories using Banana Nano Ai. See how creators achieved viral content, 340% sales increases, and professional results with character consistency.",
    keywords: "banana nano ai case studies, nano banana ai success stories, character consistency results, ai editing success, viral content case studies",
    url: "https://bananananoai.com/case-studies"
  },
  apiDocs: {
    title: "Banana Nano Ai API Documentation - Developer Guide",
    description: "Banana Nano Ai API documentation for developers. Integrate character consistency and AI image editing features into your applications.",
    keywords: "banana nano ai api, nano banana ai developer docs, character consistency api, ai image editing api, gemini image api",
    url: "https://bananananoai.com/api"
  },
  socialMediaKit: {
    title: "Banana Nano Ai Social Media Kit - Viral Content Templates",
    description: "Free social media templates and viral content ideas for Banana Nano Ai. Create engaging posts with character consistency across all platforms.",
    keywords: "banana nano ai social media, nano banana ai templates, viral content templates, character consistency social media, ai content marketing",
    url: "https://bananananoai.com/social-media-kit"
  },
  outreachStrategy: {
    title: "Banana Nano Ai Outreach Strategy - Link Building & PR Guide",
    description: "Comprehensive outreach strategy for Banana Nano Ai promotion. Media contacts, link building tactics, and PR templates for AI image editor promotion.",
    keywords: "banana nano ai outreach, nano banana ai marketing, ai tool promotion, link building strategy, ai startup pr",
    url: "https://bananananoai.com/outreach-strategy"
  },
  landingFunnel: {
    title: "Banana Nano Ai Growth Funnel - User Acquisition Strategy",
    description: "Strategic user acquisition funnel for Banana Nano Ai. Convert visitors to advocates with optimized landing pages and retention strategies.",
    keywords: "banana nano ai growth, nano banana ai funnel, user acquisition strategy, ai tool marketing funnel, conversion optimization",
    url: "https://bananananoai.com/landing-funnel"
  }
};