// Comprehensive comparison data for Nano Banana Pro vs competitors
// Based on real market research and feature analysis

export interface ComparisonFeature {
  feature: string;
  nanoBananaPro: string | boolean;
  nanoBanana: string | boolean;
  dalleThree: string | boolean;
  fluxKontext: string | boolean;
  description?: string;
}

export const featureComparisons: ComparisonFeature[] = [
  // Core Capabilities
  {
    feature: "Text Rendering Quality",
    nanoBananaPro: "⭐ Best-in-class",
    nanoBanana: "Good",
    dalleThree: "Good",
    fluxKontext: "Moderate",
    description: "Ability to render legible, stylized text in multiple languages"
  },
  {
    feature: "Maximum Resolution",
    nanoBananaPro: "4K (4096×4096)",
    nanoBanana: "2K (2048×2048)",
    dalleThree: "1792×1024",
    fluxKontext: "2K",
    description: "Native maximum output resolution"
  },
  {
    feature: "Multi-Image Input",
    nanoBananaPro: "Up to 14 images",
    nanoBanana: "Up to 3 images",
    dalleThree: "Limited (1-2)",
    fluxKontext: "~5 images",
    description: "Number of reference images that can be blended"
  },
  {
    feature: "Character Consistency",
    nanoBananaPro: "Excellent (5 people)",
    nanoBanana: "Good (2-3 people)",
    dalleThree: "Moderate",
    fluxKontext: "Good",
    description: "Maintain character appearance across generations"
  },
  {
    feature: "Real-Time Data Access",
    nanoBananaPro: "✅ Google Search",
    nanoBanana: false,
    dalleThree: false,
    fluxKontext: false,
    description: "Access to live information (weather, sports, recipes)"
  },
  
  // Advanced Features
  {
    feature: "Editing Capabilities",
    nanoBananaPro: "Advanced (camera, lighting, depth)",
    nanoBanana: "Basic",
    dalleThree: "Moderate",
    fluxKontext: "Moderate",
    description: "Post-generation editing controls"
  },
  {
    feature: "Localization Support",
    nanoBananaPro: "70+ languages",
    nanoBanana: "Limited",
    dalleThree: "Moderate",
    fluxKontext: "English-focused",
    description: "Multi-language text generation and translation"
  },
  {
    feature: "Infographics & Diagrams",
    nanoBananaPro: "✅ Specialized",
    nanoBanana: "Basic",
    dalleThree: "Moderate",
    fluxKontext: "Limited",
    description: "Create data visualizations and technical diagrams"
  },
  {
    feature: "Aspect Ratio Control",
    nanoBananaPro: "Multiple ratios",
    nanoBanana: "Multiple ratios",
    dalleThree: "Square & landscape",
    fluxKontext: "Multiple ratios",
    description: "Flexible output dimensions"
  },
  
  // Pricing & Access
  {
    feature: "Free Tier Available",
    nanoBananaPro: "✅ Limited quota",
    nanoBanana: "✅ Limited quota",
    dalleThree: "❌ No",
    fluxKontext: "Varies by platform",
    description: "Free access for testing"
  },
  {
    feature: "API Cost (per image)",
    nanoBananaPro: "$0.134 - $0.24",
    nanoBanana: "$0.039",
    dalleThree: "$0.04",
    fluxKontext: "$0.04 - $0.08",
    description: "Average API pricing for standard resolution"
  },
  {
    feature: "Batch Processing Discount",
    nanoBananaPro: "50% off",
    nanoBanana: "50% off",
    dalleThree: false,
    fluxKontext: "Platform-dependent",
    description: "Reduced pricing for bulk operations"
  },
  
  // Integration & Ecosystem
  {
    feature: "Official App Access",
    nanoBananaPro: "Gemini app, AI Studio",
    nanoBanana: "Gemini app, AI Studio",
    dalleThree: "ChatGPT Plus",
    fluxKontext: "Third-party only",
    description: "First-party application integration"
  },
  {
    feature: "Adobe Integration",
    nanoBananaPro: "✅ Firefly & Photoshop",
    nanoBanana: "Limited",
    dalleThree: "❌ No",
    fluxKontext: "❌ No",
    description: "Native integration with Adobe products"
  },
  {
    feature: "Workspace Integration",
    nanoBananaPro: "Google Workspace",
    nanoBanana: "Limited",
    dalleThree: "Microsoft 365 (limited)",
    fluxKontext: "❌ No",
    description: "Productivity suite integration"
  },
  
  // Quality & Reliability
  {
    feature: "Generation Speed",
    nanoBananaPro: "15-25 seconds",
    nanoBanana: "10-15 seconds",
    dalleThree: "10-20 seconds",
    fluxKontext: "20-40 seconds",
    description: "Average time to generate image"
  },
  {
    feature: "Watermarking",
    nanoBananaPro: "SynthID (invisible)",
    nanoBanana: "SynthID (invisible)",
    dalleThree: "Visible (free) / None (paid)",
    fluxKontext: "Platform-dependent",
    description: "AI detection watermark system"
  },
  {
    feature: "Commercial Use",
    nanoBananaPro: "✅ Allowed",
    nanoBanana: "✅ Allowed",
    dalleThree: "✅ Allowed",
    fluxKontext: "Check platform ToS",
    description: "Permission for commercial applications"
  },
  {
    feature: "Copyright Indemnification",
    nanoBananaPro: "Coming (enterprise)",
    nanoBanana: false,
    dalleThree: "✅ Yes",
    fluxKontext: false,
    description: "Legal protection for generated content"
  }
];

// Pricing comparison table
export interface PricingTier {
  model: string;
  freeTier: string;
  standardCost: string;
  highResCost: string;
  notes: string;
}

export const pricingComparison: PricingTier[] = [
  {
    model: "Nano Banana Pro",
    freeTier: "Limited daily quota",
    standardCost: "$0.134 (1K/2K)",
    highResCost: "$0.24 (4K)",
    notes: "50% discount for batch processing"
  },
  {
    model: "Nano Banana (Original)",
    freeTier: "Limited daily quota",
    standardCost: "$0.039 (standard)",
    highResCost: "N/A",
    notes: "Faster but lower quality"
  },
  {
    model: "DALL-E 3",
    freeTier: "None",
    standardCost: "$0.04 (1024×1024)",
    highResCost: "$0.08 (1792×1024)",
    notes: "ChatGPT Plus includes quota"
  },
  {
    model: "Flux Kontext",
    freeTier: "Platform-dependent",
    standardCost: "$0.04 - $0.08",
    highResCost: "Varies",
    notes: "Third-party pricing varies"
  }
];

// Use case recommendations
export interface UseCase {
  name: string;
  bestModel: string;
  reason: string;
  example: string;
}

export const useCaseRecommendations: UseCase[] = [
  {
    name: "Marketing Posters & Ads",
    bestModel: "Nano Banana Pro",
    reason: "Best-in-class text rendering for taglines and product names",
    example: "Product launch ads, event posters, sale banners"
  },
  {
    name: "Infographics & Diagrams",
    bestModel: "Nano Banana Pro",
    reason: "Google Search grounding for accurate data + clear text labels",
    example: "Educational diagrams, recipe cards, statistics visualization"
  },
  {
    name: "Product Mockups",
    bestModel: "Nano Banana Pro or DALL-E 3",
    reason: "High-quality studio lighting and multiple reference images",
    example: "E-commerce photos, packaging design, lifestyle shots"
  },
  {
    name: "Character Design",
    bestModel: "Nano Banana Pro",
    reason: "Excellent character consistency across 5 people",
    example: "Storyboards, game characters, illustrated books"
  },
  {
    name: "Social Media Content",
    bestModel: "Nano Banana Pro",
    reason: "Fast generation + perfect text for quotes and captions",
    example: "Instagram posts, YouTube thumbnails, Twitter headers"
  },
  {
    name: "Quick Prototypes",
    bestModel: "Nano Banana (Original)",
    reason: "Faster and cheaper for rapid iteration",
    example: "Concept sketches, mood boards, brainstorming"
  },
  {
    name: "Artistic Illustrations",
    bestModel: "Flux Kontext or DALL-E 3",
    reason: "More artistic freedom and stylistic variety",
    example: "Album art, digital paintings, creative exploration"
  },
  {
    name: "Multi-Language Campaigns",
    bestModel: "Nano Banana Pro",
    reason: "70+ language support with accurate text rendering",
    example: "Global marketing, translation services, localized content"
  }
];

// Strengths and weaknesses
export interface ModelProfile {
  model: string;
  strengths: string[];
  weaknesses: string[];
  bestFor: string[];
}

export const modelProfiles: ModelProfile[] = [
  {
    model: "Nano Banana Pro",
    strengths: [
      "Best text rendering quality in the industry",
      "Native 4K output for print-ready quality",
      "Up to 14 reference images for complex compositions",
      "Google Search integration for real-time data",
      "Excellent character consistency (5 people)",
      "Advanced editing controls (lighting, camera, depth)"
    ],
    weaknesses: [
      "Higher cost than alternatives ($0.134-0.24/image)",
      "Slower generation (15-25 seconds)",
      "Free tier has stricter quotas",
      "Still struggles with small faces and complex details"
    ],
    bestFor: [
      "Professional marketing materials",
      "Infographics and educational content",
      "Multi-language campaigns",
      "Product mockups with text labels",
      "Character-driven narratives"
    ]
  },
  {
    model: "Nano Banana (Original)",
    strengths: [
      "Very affordable ($0.039/image)",
      "Fast generation (10-15 seconds)",
      "Good for rapid prototyping",
      "Same Google ecosystem integration"
    ],
    weaknesses: [
      "Limited text rendering quality",
      "Lower resolution (2K max)",
      "Basic editing capabilities",
      "Fewer reference images (3 max)"
    ],
    bestFor: [
      "Quick concept iterations",
      "Budget-conscious projects",
      "Non-text-heavy images",
      "Personal/hobby use"
    ]
  },
  {
    model: "DALL-E 3",
    strengths: [
      "Copyright indemnification included",
      "Integrated with ChatGPT Plus",
      "Good overall quality",
      "Moderate pricing"
    ],
    weaknesses: [
      "No free tier",
      "Limited multi-image support",
      "Lower max resolution (1792×1024)",
      "No real-time data access"
    ],
    bestFor: [
      "ChatGPT users",
      "Commercial projects needing legal protection",
      "General-purpose image generation",
      "Quick iterations within ChatGPT"
    ]
  },
  {
    model: "Flux Kontext",
    strengths: [
      "Artistic flexibility",
      "Multiple aspect ratios",
      "Good character consistency",
      "Competitive pricing"
    ],
    weaknesses: [
      "Limited first-party access",
      "Moderate text rendering",
      "Platform-dependent features",
      "Less ecosystem integration"
    ],
    bestFor: [
      "Artistic projects",
      "Creative exploration",
      "Stylized illustrations",
      "Independent creators"
    ]
  }
];
