"use client"
import React from 'react';
// import Head from 'next/head'; // Not needed for this implementation

// Structured data for better SEO according to ChatGPT recommendations
interface StructuredDataProps {
  type: 'WebApplication' | 'SoftwareApplication' | 'FAQPage' | 'ImageObject' | 'Review' | 'Blog' | 'CollectionPage' | 'HowTo' | 'Custom';
  data: any;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  let structuredData = {};

  switch (type) {
    case 'WebApplication':
    case 'SoftwareApplication':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Banana Nano Ai - Free AI Image Editor",
        "description": "Revolutionary AI-powered image editing tool using advanced Banana Nano Ai technology. Transform images with natural language prompts.",
        "url": "https://bananananoai.com",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "50000",
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Organization",
          "name": "Banana Nano Ai",
          "url": "https://bananananoai.com"
        },
        "provider": {
          "@type": "Organization",
          "name": "Banana Nano Ai",
          "url": "https://bananananoai.com"
        },
        "browserRequirements": "Modern web browser with JavaScript enabled",
        "softwareVersion": "2.5",
        "featureList": [
          "Character Consistency",
          "Multi-Image Blending", 
          "Background Replacement",
          "Virtual Try-On",
          "Style Transfer",
          "Natural Language Processing"
        ]
      };
      break;

    case 'FAQPage':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": data.faqs?.map((faq: any) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        })) || []
      };
      break;

    case 'Blog':
    case 'CollectionPage':
    case 'HowTo':
    case 'Custom':
      // Use the provided data directly for these types
      structuredData = data;
      break;

    case 'ImageObject':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "name": data.name || "Banana Nano Ai Generated Image",
        "description": data.description || "Professional image editing result created with Banana Nano Ai technology",
        "url": data.url,
        "width": data.width || "1024",
        "height": data.height || "1024",
        "encodingFormat": "image/webp",
        "creator": {
          "@type": "SoftwareApplication",
          "name": "Banana Nano Ai"
        },
        "copyrightHolder": {
          "@type": "Organization", 
          "name": "Banana Nano Ai"
        }
      };
      break;

    case 'Review':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
          "@type": "SoftwareApplication",
          "name": "Banana Nano Ai"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": data.rating || "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": data.authorName
        },
        "reviewBody": data.content
      };
      break;

    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

// Breadcrumb structured data
export const BreadcrumbStructuredData: React.FC<{ breadcrumbs: Array<{name: string, url: string}> }> = ({ breadcrumbs }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://bananananoai.com${item.url}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

// Organization structured data
export const OrganizationStructuredData: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Banana Nano Ai",
    "url": "https://bananananoai.com",
    "logo": "https://bananananoai.com/favicon.ico",
    "description": "Revolutionary AI image editing platform using advanced Banana Nano Ai technology",
    "foundingDate": "2024",
    "sameAs": [
      "https://twitter.com/bananananoai",
      "https://github.com/bananananoai"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["English", "Chinese"]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

// Product structured data for premium features
export const ProductStructuredData: React.FC<{ product: any }> = ({ product }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Banana Nano Ai"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": product.currency || "USD",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Banana Nano Ai"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating || "4.9",
      "ratingCount": product.reviewCount || "1000"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

// How-to structured data for tutorials
export const HowToStructuredData: React.FC<{ tutorial: any }> = ({ tutorial }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": tutorial.name,
    "description": tutorial.description,
    "image": tutorial.image,
    "totalTime": tutorial.totalTime || "PT5M",
    "supply": tutorial.supplies || [
      {
        "@type": "HowToSupply",
        "name": "Image to edit"
      },
      {
        "@type": "HowToSupply", 
        "name": "Internet connection"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Banana Nano Ai Platform"
      }
    ],
    "step": tutorial.steps?.map((step: any, index: number) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "image": step.image
    })) || []
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default StructuredData;