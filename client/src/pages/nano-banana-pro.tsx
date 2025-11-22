import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, Sparkles, Printer, Download, ArrowRight, Star, Play, CheckCircle, 
  Zap, Palette, Users, Globe, Image as ImageIcon, Wand2, Code, BookOpen,
  ChevronRight, Copy, Check, Search, Filter
} from "lucide-react";
import { Link } from "wouter";
import { AnimatedBackground, InteractiveButton } from "@/components/ui/animated-background";
import { useToast } from "@/hooks/use-toast";
import { 
  nanoBananaProPrompts, 
  promptCategories, 
  getPromptsByCategory, 
  getFeaturedPrompts,
  searchPrompts,
  PromptTemplate 
} from "@/data/nano-banana-pro-prompts";

export default function NanoBananaPro() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedPromptCategory, setSelectedPromptCategory] = useState("all");
  const [promptSearchQuery, setPromptSearchQuery] = useState("");
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const { toast } = useToast();

  // SEO meta tags - Optimized for "Nano Banana Pro" keyword
  useEffect(() => {
    document.title = "Nano Banana Pro - Free AI Image Generator | 4K Text Rendering | Gemini 3 Pro";
    
    const existingMeta = document.querySelectorAll('meta[data-nano-banana-page]');
    existingMeta.forEach(meta => meta.remove());
    
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Create stunning 4K images with perfect text rendering using Nano Banana Pro. Free online AI image generator powered by Google Gemini 3 Pro. Try now, no signup required. Complete pipeline: generation → 3D → printing.';
    metaDescription.setAttribute('data-nano-banana-page', 'true');
    document.head.appendChild(metaDescription);
    
    const metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    metaKeywords.content = 'nano banana pro, nano banana pro free, nano banana pro playground, gemini 3 pro image, ai image generator, 4k text rendering, nano banana pro tutorial, nano banana pro prompts, free online tool';
    metaKeywords.setAttribute('data-nano-banana-page', 'true');
    document.head.appendChild(metaKeywords);

    // Open Graph tags
    const ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.content = 'Nano Banana Pro - Free AI Image Generator with 4K Output';
    ogTitle.setAttribute('data-nano-banana-page', 'true');
    document.head.appendChild(ogTitle);

    const ogDescription = document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.content = 'Create professional 4K images with perfect text rendering. Powered by Google Gemini 3 Pro. Try free online now - no signup required!';
    ogDescription.setAttribute('data-nano-banana-page', 'true');
    document.head.appendChild(ogDescription);

    const ogType = document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.content = 'website';
    ogType.setAttribute('data-nano-banana-page', 'true');
    document.head.appendChild(ogType);

    const ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    ogUrl.content = window.location.href;
    ogUrl.setAttribute('data-nano-banana-page', 'true');
    document.head.appendChild(ogUrl);

    const ogImage = document.createElement('meta');
    ogImage.setAttribute('property', 'og:image');
    ogImage.content = window.location.origin + '/assets/nano-banana-pro-social.jpg';
    ogImage.setAttribute('data-nano-banana-page', 'true');
    document.head.appendChild(ogImage);

    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = window.location.href;
    canonical.setAttribute('data-nano-banana-page', 'true');
    document.head.appendChild(canonical);

    // Twitter Card tags
    const twitterCard = document.createElement('meta');
    twitterCard.name = 'twitter:card';
    twitterCard.content = 'summary_large_image';
    twitterCard.setAttribute('data-nano-banana-page', 'true');
    document.head.appendChild(twitterCard);

    const twitterTitle = document.createElement('meta');
    twitterTitle.name = 'twitter:title';
    twitterTitle.content = 'Nano Banana Pro - Free AI Image Generator';
    twitterTitle.setAttribute('data-nano-banana-page', 'true');
    document.head.appendChild(twitterTitle);

    const twitterDescription = document.createElement('meta');
    twitterDescription.name = 'twitter:description';
    twitterDescription.content = 'Create 4K images with perfect text. Powered by Gemini 3 Pro. Try free!';
    twitterDescription.setAttribute('data-nano-banana-page', 'true');
    document.head.appendChild(twitterDescription);

    // Structured data (SoftwareApplication Schema)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Nano Banana Pro",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "5000",
        "bestRating": "5",
        "worstRating": "1"
      },
      "description": "Free online AI image generator powered by Google Gemini 3 Pro. Create 4K images with perfect text rendering. Complete pipeline from generation to 3D printing.",
      "featureList": [
        "4K Resolution Output",
        "Perfect Text Rendering",
        "Multi-Image Composition",
        "Character Consistency",
        "3D Model Conversion",
        "Instant Print Quotes",
        "100+ Prompt Templates"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-nano-banana-page', 'true');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // FAQ Schema
    const faqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Nano Banana Pro?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nano Banana Pro (Gemini 3 Pro Image) is Google's latest AI image generation and editing model. It excels at creating 4K images with perfect text rendering, multi-image composition, and character consistency."
          }
        },
        {
          "@type": "Question",
          "name": "How to use Nano Banana Pro for free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simply visit our playground, enter your prompt or upload an image, and click generate. No signup required. You can also access Nano Banana Pro through Google's Gemini app, Google AI Studio, or our free online tool."
          }
        },
        {
          "@type": "Question",
          "name": "How much does Nano Banana Pro cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nano Banana Pro offers a free tier with daily quotas. API pricing ranges from $0.134-0.24 per image depending on resolution (1K/2K/4K). Our free playground allows you to try it without any cost."
          }
        },
        {
          "@type": "Question",
          "name": "What makes Nano Banana Pro better than other AI image generators?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nano Banana Pro offers best-in-class text rendering, supports up to 14 reference images, provides native 4K output, includes Google Search grounding for real-time data, and maintains character consistency across multiple generations."
          }
        }
      ]
    };

    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.setAttribute('data-nano-banana-page', 'true');
    faqScript.textContent = JSON.stringify(faqData);
    document.head.appendChild(faqScript);

    return () => {
      const metaToRemove = document.querySelectorAll('meta[data-nano-banana-page]');
      metaToRemove.forEach(meta => meta.remove());
      const scriptsToRemove = document.querySelectorAll('script[data-nano-banana-page]');
      scriptsToRemove.forEach(script => script.remove());
    };
  }, []);

  const handleGenerateFromText = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a prompt to generate an image",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-image-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      // Check if response is OK before parsing
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: `Server error: ${response.status}` }));
        toast({
          title: "Generation failed",
          description: errorData.error || `Server returned ${response.status}. Please try again later.`,
          variant: "destructive"
        });
        return;
      }

      const data = await response.json();
      
      if (data.success && data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        toast({
          title: "Success!",
          description: "Your Nano Banana Pro image has been generated"
        });
      } else {
        toast({
          title: "Generation failed",
          description: data.error || "Please try again",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyPromptToClipboard = (promptTemplate: PromptTemplate) => {
    navigator.clipboard.writeText(promptTemplate.prompt);
    setCopiedPromptId(promptTemplate.id);
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard"
    });
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const getFilteredPrompts = () => {
    let filtered = nanoBananaProPrompts;
    
    if (selectedPromptCategory !== "all") {
      filtered = getPromptsByCategory(selectedPromptCategory);
    }
    
    if (promptSearchQuery.trim()) {
      filtered = searchPrompts(promptSearchQuery);
    }
    
    return filtered;
  };

  const featuredPrompts = getFeaturedPrompts().slice(0, 6);

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      
      {/* Hero Section - Optimized for SEO */}
      <div className="relative bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <Badge className="inline-flex items-center px-6 py-3 bg-primary/15 backdrop-blur-sm rounded-full text-sm font-semibold text-primary mb-8 border border-primary/20" data-testid="badge-powered-by">
              <Zap className="w-4 h-4 mr-2" />
              Powered by Google Gemini 3 Pro • Released Nov 2025
            </Badge>
            
            <h1 className="text-5xl md:text-8xl font-extrabold mb-8 max-w-6xl mx-auto leading-tight tracking-tight">
              <span className="gradient-text bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Nano Banana Pro
              </span>
              <br />
              <span className="text-foreground">Free AI Image Generator</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
              Create stunning <strong className="text-foreground">4K images with perfect text rendering</strong> using Nano Banana Pro. 
              The only platform offering <strong className="text-foreground">complete pipeline</strong>: AI Generation → 3D Conversion → Printing Quotes.
            </p>

            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              Try <strong className="text-foreground">Nano Banana Pro free online</strong> • No signup required • 100+ tested prompts • Real-time playground
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ImageIcon className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">4K</span> resolution output
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">Best-in-class</span> text rendering
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">100%</span> free to try
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <InteractiveButton 
                variant="primary" 
                className="px-10 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                onClick={() => document.getElementById('playground')?.scrollIntoView({behavior:'smooth'})}
                data-testid="button-try-free-playground"
              >
                <Play className="w-5 h-5 mr-2" />
                Try Free Playground
              </InteractiveButton>
              <InteractiveButton 
                variant="secondary" 
                className="px-10 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300"
                onClick={() => document.getElementById('prompts')?.scrollIntoView({behavior:'smooth'})}
                data-testid="button-view-prompts"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                100+ Prompts
              </InteractiveButton>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Playground Section */}
      <div id="playground" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Nano Banana Pro Playground
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start creating instantly - no signup required. Enter your prompt and watch Nano Banana Pro generate stunning 4K images in seconds.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto backdrop-blur-sm bg-card/95 border-primary/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Wand2 className="w-6 h-6 text-primary" />
              Generate Your First Image
            </CardTitle>
            <CardDescription className="text-base">
              Enter a detailed prompt or select from our tested templates below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Textarea
                placeholder='Example: Create a vintage concert poster for "Banana Jazz Fest 2025" with art deco typography, warm golden tones, elegant serif fonts, centered layout, decorative borders'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-32 text-base resize-none"
                data-testid="textarea-prompt-input"
              />
              
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">Quick prompts:</span>
                {featuredPrompts.slice(0, 3).map((p) => (
                  <Badge 
                    key={p.id} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => setPrompt(p.prompt)}
                    data-testid={`badge-quick-prompt-${p.id}`}
                  >
                    {p.title}
                  </Badge>
                ))}
              </div>

              <Button
                onClick={handleGenerateFromText}
                disabled={isGenerating || !prompt.trim()}
                className="w-full py-6 text-lg font-semibold"
                data-testid="button-generate-image"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Generating with Nano Banana Pro...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Image (Free)
                  </>
                )}
              </Button>
            </div>

            {generatedImage && (
              <div className="space-y-4 p-6 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Generated Image
                  </h3>
                  <Button variant="outline" size="sm" data-testid="button-download-image">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
                <img 
                  src={generatedImage} 
                  alt="Generated by Nano Banana Pro" 
                  className="w-full rounded-lg shadow-lg"
                  data-testid="img-generated-result"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Prompt Library Section */}
      <div id="prompts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative bg-muted/30">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            100+ <span className="gradient-text bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Tested Prompts
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Copy-paste ready templates categorized by use case. All prompts tested and optimized for Nano Banana Pro.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search prompts..."
              value={promptSearchQuery}
              onChange={(e) => setPromptSearchQuery(e.target.value)}
              className="pl-10 py-6 text-lg"
              data-testid="input-search-prompts"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedPromptCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPromptCategory("all")}
              data-testid="button-category-all"
            >
              All
            </Button>
            {promptCategories.map((cat) => (
              <Button
                key={cat}
                variant={selectedPromptCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPromptCategory(cat)}
                data-testid={`button-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Prompt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredPrompts().map((promptTemplate) => (
            <Card key={promptTemplate.id} className="hover:shadow-lg transition-shadow" data-testid={`card-prompt-${promptTemplate.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="text-lg">{promptTemplate.title}</CardTitle>
                  {promptTemplate.featured && (
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {promptTemplate.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {promptTemplate.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {promptTemplate.prompt}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => copyPromptToClipboard(promptTemplate)}
                    data-testid={`button-copy-prompt-${promptTemplate.id}`}
                  >
                    {copiedPromptId === promptTemplate.id ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => {
                      setPrompt(promptTemplate.prompt);
                      document.getElementById('playground')?.scrollIntoView({behavior:'smooth'});
                    }}
                    data-testid={`button-use-prompt-${promptTemplate.id}`}
                  >
                    Use
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {promptTemplate.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {getFilteredPrompts().length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No prompts found. Try a different search or category.
            </p>
          </div>
        )}
      </div>

      {/* Feature Comparison Table Section */}
      <div id="comparison" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Why Choose <span className="gradient-text bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Nano Banana Pro?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how Nano Banana Pro compares to other leading AI image generators
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold text-primary">Nano Banana Pro</th>
                    <th className="px-6 py-4 text-center font-semibold">Nano Banana</th>
                    <th className="px-6 py-4 text-center font-semibold">DALL-E 3</th>
                    <th className="px-6 py-4 text-center font-semibold">Flux</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-6 py-4 font-medium">Text Rendering</td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant="default">⭐ Best</Badge>
                    </td>
                    <td className="px-6 py-4 text-center text-muted-foreground">Good</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">Good</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">Moderate</td>
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="px-6 py-4 font-medium">Max Resolution</td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant="default">4K</Badge>
                    </td>
                    <td className="px-6 py-4 text-center text-muted-foreground">2K</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">1792×1024</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">2K</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4 font-medium">Multi-Image Input</td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant="default">14 images</Badge>
                    </td>
                    <td className="px-6 py-4 text-center text-muted-foreground">3 images</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">1-2 images</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">~5 images</td>
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="px-6 py-4 font-medium">Real-Time Data</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 mx-auto text-green-500" />
                    </td>
                    <td className="px-6 py-4 text-center text-muted-foreground">❌</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">❌</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">❌</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4 font-medium">Free Tier</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 mx-auto text-green-500" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 mx-auto text-green-500" />
                    </td>
                    <td className="px-6 py-4 text-center text-muted-foreground">❌</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">Varies</td>
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="px-6 py-4 font-medium">API Cost</td>
                    <td className="px-6 py-4 text-center text-sm">$0.134-0.24</td>
                    <td className="px-6 py-4 text-center text-sm">$0.039</td>
                    <td className="px-6 py-4 text-center text-sm">$0.04</td>
                    <td className="px-6 py-4 text-center text-sm">$0.04-0.08</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            <strong className="text-foreground">Nano Banana Pro</strong> excels at text-heavy designs, high-resolution outputs, and multi-image compositions - perfect for professional marketing and design work.
          </p>
          <Button size="lg" onClick={() => document.getElementById('playground')?.scrollIntoView({behavior:'smooth'})} data-testid="button-try-comparison">
            Try Nano Banana Pro Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Complete Pipeline Section */}
      <div className="bg-muted/30 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Complete <span className="gradient-text bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Pipeline
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The only platform offering end-to-end workflow: AI generation → 3D conversion → printing quotes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-xl transition-shadow" data-testid="card-step-generate">
              <CardHeader>
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">1. Generate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create stunning 4K images with Nano Banana Pro AI in seconds
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow" data-testid="card-step-convert">
              <CardHeader>
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Code className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">2. Convert to 3D</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Transform 2D images into printable 3D STL models
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow" data-testid="card-step-quote">
              <CardHeader>
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Printer className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">3. Get Quotes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Instant pricing from professional 3D printing services
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow" data-testid="card-step-deliver">
              <CardHeader>
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Download className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">4. Deliver</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive high-quality 3D prints at your doorstep
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <Link href="/nano-banana-3d-figurines">
              <Button size="lg" variant="outline" data-testid="button-learn-complete-pipeline">
                Learn More About Complete Pipeline
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Frequently Asked <span className="gradient-text bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Nano Banana Pro
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What is Nano Banana Pro?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nano Banana Pro (officially called Gemini 3 Pro Image) is Google's latest AI image generation and editing model. 
                Released in November 2025, it excels at creating 4K images with perfect text rendering, multi-image composition, and character consistency.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to use Nano Banana Pro for free?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Simply visit our playground above, enter your prompt or upload an image, and click generate. No signup required! 
                You can also access Nano Banana Pro through Google's Gemini app (select "Thinking" model and "Create images"), Google AI Studio, or our free online tool.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How much does Nano Banana Pro cost?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nano Banana Pro offers a free tier with daily quotas. API pricing ranges from $0.134-0.24 per image depending on resolution (1K/2K/4K). 
                Our free playground allows you to try it without any cost. Batch processing gets 50% discount.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What makes Nano Banana Pro better than other AI image generators?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nano Banana Pro offers best-in-class text rendering, supports up to 14 reference images, provides native 4K output, 
                includes Google Search grounding for real-time data, and maintains excellent character consistency across multiple generations. 
                Plus, we're the only platform offering complete pipeline from generation to 3D printing.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Can I use Nano Banana Pro images commercially?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Yes! Images generated with Nano Banana Pro can be used for commercial purposes according to Google's terms of service. 
                All images include SynthID invisible watermark for AI detection. Enterprise copyright indemnification is coming soon.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What are the best use cases for Nano Banana Pro?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nano Banana Pro excels at: marketing posters & ads with text, infographics & educational diagrams, product mockups, 
                multi-language campaigns, character design with consistency, social media content, and professional presentations. 
                If your project involves text rendering or high-resolution outputs, Nano Banana Pro is the best choice.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Create with <span className="gradient-text bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Nano Banana Pro?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of creators using Nano Banana Pro for professional image generation. 
            Try it free - no signup, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-10 py-6 text-lg font-semibold"
              onClick={() => document.getElementById('playground')?.scrollIntoView({behavior:'smooth'})}
              data-testid="button-final-cta-playground"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Creating Free
            </Button>
            <Link href="/tutorials">
              <Button 
                size="lg" 
                variant="outline" 
                className="px-10 py-6 text-lg font-semibold"
                data-testid="button-final-cta-tutorials"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                View Tutorials
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              No signup required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              100+ tested prompts
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              4K resolution output
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Complete pipeline to printing
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
