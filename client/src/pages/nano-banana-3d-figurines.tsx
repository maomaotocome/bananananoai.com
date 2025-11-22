import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Sparkles, Printer, Download, ArrowRight, Star, Play, CheckCircle, Zap, Palette, Users, Globe } from "lucide-react";
import { Link } from "wouter";
import { AnimatedBackground, InteractiveButton } from "@/components/ui/animated-background";
import FigurineGenerator from "@/components/figurine-generator";
import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export default function NanoBanana3DFigurines() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // SEO meta tags
  useEffect(() => {
    const PAGE_MARKER = 'figurines';
    // Set page title
    document.title = "Nano Banana 3D Figurines - AI Image to 3D Model & Print | Free STL Generator";
    
    // Cleanup only this page's meta tags, links, and scripts
    const existingMeta = document.querySelectorAll(`meta[data-nano-banana-page="${PAGE_MARKER}"]`);
    existingMeta.forEach(meta => meta.remove());
    const existingLinks = document.querySelectorAll(`link[data-nano-banana-page="${PAGE_MARKER}"]`);
    existingLinks.forEach(link => link.remove());
    const existingScripts = document.querySelectorAll(`script[data-nano-banana-page="${PAGE_MARKER}"]`);
    existingScripts.forEach(script => script.remove());
    
    // Add meta description
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Create custom Nano Banana 3D figurines from any photo. Upload image → AI generates figurine → Convert to 3D STL → Order professional prints. Complete pipeline from image to physical figurine.';
    metaDescription.setAttribute('data-nano-banana-page', PAGE_MARKER);
    document.head.appendChild(metaDescription);
    
    // Add keywords meta
    const metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    metaKeywords.content = 'nano banana 3d figurines, 3d figurine creator, ai image to 3d model, stl generator, 3d printing service, custom figurines, photo to 3d model, gemini 2.5 flash';
    metaKeywords.setAttribute('data-nano-banana-page', PAGE_MARKER);
    document.head.appendChild(metaKeywords);

    // Open Graph tags
    const ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.content = 'Nano Banana 3D Figurines - AI Image to 3D Model Generator';
    ogTitle.setAttribute('data-nano-banana-page', PAGE_MARKER);
    document.head.appendChild(ogTitle);

    const ogDescription = document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.content = 'Transform any photo into professional Nano Banana 3D figurines. Complete workflow: AI generation, 3D conversion, and instant printing quotes. Try it free!';
    ogDescription.setAttribute('data-nano-banana-page', PAGE_MARKER);
    document.head.appendChild(ogDescription);

    const ogType = document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.content = 'website';
    ogType.setAttribute('data-nano-banana-page', PAGE_MARKER);
    document.head.appendChild(ogType);

    const ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    ogUrl.content = window.location.href;
    ogUrl.setAttribute('data-nano-banana-page', PAGE_MARKER);
    document.head.appendChild(ogUrl);

    // OG Image for social sharing
    const ogImage = document.createElement('meta');
    ogImage.setAttribute('property', 'og:image');
    ogImage.content = window.location.origin + '/assets/nano-banana-social.jpg';
    ogImage.setAttribute('data-nano-banana-page', PAGE_MARKER);
    document.head.appendChild(ogImage);

    // Canonical link
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = window.location.href;
    canonical.setAttribute('data-nano-banana-page', PAGE_MARKER);
    document.head.appendChild(canonical);

    // Twitter Card tags
    const twitterCard = document.createElement('meta');
    twitterCard.name = 'twitter:card';
    twitterCard.content = 'summary_large_image';
    twitterCard.setAttribute('data-nano-banana-page', PAGE_MARKER);
    document.head.appendChild(twitterCard);

    const twitterTitle = document.createElement('meta');
    twitterTitle.name = 'twitter:title';
    twitterTitle.content = 'Nano Banana 3D Figurines - AI Image to 3D Model Generator';
    twitterTitle.setAttribute('data-nano-banana-page', PAGE_MARKER);
    document.head.appendChild(twitterTitle);

    const twitterDescription = document.createElement('meta');
    twitterDescription.name = 'twitter:description';
    twitterDescription.content = 'Transform photos into custom 3D figurines with AI. Complete pipeline from upload to print!';
    twitterDescription.setAttribute('data-nano-banana-page', PAGE_MARKER);
    document.head.appendChild(twitterDescription);

    // Structured data (HowTo Schema)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Create Nano Banana 3D Figurines from Photos",
      "description": "Step-by-step guide to transform any photo into a professional 3D printed figurine using AI technology",
      "image": window.location.origin + "/nano-banana-hero.jpg",
      "totalTime": "PT10M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "15.99"
      },
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Digital photo or image file"
        }
      ],
      "tool": [
        {
          "@type": "HowToTool",
          "name": "Nano Banana 3D Figurine Generator"
        },
        {
          "@type": "HowToTool", 
          "name": "Google Gemini 2.5 Flash AI"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "name": "Upload Your Photo",
          "text": "Select and upload any photo you want to transform into a figurine",
          "image": window.location.origin + "/step-upload.jpg",
          "url": window.location.href + "#upload"
        },
        {
          "@type": "HowToStep", 
          "name": "Choose Style Template",
          "text": "Select from pre-designed templates like Pet Figurines, Anime Style, or Office Desk themes",
          "image": window.location.origin + "/step-templates.jpg",
          "url": window.location.href + "#templates"
        },
        {
          "@type": "HowToStep",
          "name": "Generate AI Figurine", 
          "text": "Our AI creates a professional figurine design using Google's Gemini 2.5 Flash technology",
          "image": window.location.origin + "/step-generate.jpg",
          "url": window.location.href + "#generate"
        },
        {
          "@type": "HowToStep",
          "name": "Convert to 3D Model",
          "text": "Transform the 2D figurine into a printable 3D STL file ready for manufacturing",
          "image": window.location.origin + "/step-3d.jpg", 
          "url": window.location.href + "#3d-conversion"
        },
        {
          "@type": "HowToStep",
          "name": "Order Professional Print",
          "text": "Get instant quotes and order high-quality 3D prints in various materials and finishes",
          "image": window.location.origin + "/step-print.jpg",
          "url": window.location.href + "#printing"
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-nano-banana-page', PAGE_MARKER);
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      const metaToRemove = document.querySelectorAll('meta[data-nano-banana-page]');
      metaToRemove.forEach(meta => meta.remove());
      const scriptToRemove = document.querySelector('script[data-nano-banana-page]');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      title: "AI-Powered Generation",
      description: "Uses Google's Gemini 2.5 Flash Image (Nano Banana) for professional figurine creation"
    },
    {
      icon: <Download className="w-6 h-6 text-primary" />,
      title: "Make it 3D (STL)",
      description: "Transform your 2D figurine into a downloadable 3D model ready for printing"
    },
    {
      icon: <Printer className="w-6 h-6 text-primary" />,
      title: "Instant Print Quotes",
      description: "Get real-time pricing from professional 3D printing services"
    }
  ];

  const promptExamples = [
    {
      category: "Pet Figurines",
      prompt: "Create a 1/7 scale commercialized figurine of the pet in the photo, realistic lighting, displayed on a computer desk with BANDAI-style packaging",
      tags: ["Dogs", "Cats", "Pets"]
    },
    {
      category: "Anime Style",
      prompt: "Transform into anime figurine with Kotobukiya quality, complete with collector's box and acrylic base",
      tags: ["Anime", "Collectible", "Kotobukiya"]
    },
    {
      category: "Couple/Wedding",
      prompt: "Create matching figurine pair in wedding attire, romantic lighting, premium packaging with custom artwork",
      tags: ["Wedding", "Couples", "Romance"]
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Upload Your Photo",
      description: "Choose any photo of yourself, pet, or loved one"
    },
    {
      number: "2", 
      title: "Select Style Template",
      description: "Pick from 6 themed prompt packs or customize your own"
    },
    {
      number: "3",
      title: "Generate Figurine",
      description: "AI creates professional figurine with packaging in seconds"
    },
    {
      number: "4",
      title: "Make it 3D",
      description: "Convert to STL file for 3D printing (optional)"
    }
  ];

  // Breadcrumb data
  const breadcrumbItems = [
    { label: "Nano Banana Pro", href: "/nano-banana-pro" },
    { label: "3D Figurines", href: "/nano-banana-3d-figurines" }
  ];

  const breadcrumbSchemaItems = [
    { position: 1, name: "Home", item: "https://bananananoai.com/" },
    { position: 2, name: "Nano Banana Pro", item: "https://bananananoai.com/nano-banana-pro" },
    { position: 3, name: "3D Figurines", item: "https://bananananoai.com/nano-banana-3d-figurines" }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      <AnimatedBackground />
      
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Modern Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 pt-20 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <Badge className="inline-flex items-center px-6 py-3 bg-primary/15 backdrop-blur-sm rounded-full text-sm font-semibold text-primary mb-8 border border-primary/20">
              <Zap className="w-4 h-4 mr-2" />
              Powered by Google Gemini 2.5 Flash
            </Badge>
            
            <h1 className="text-4xl md:text-7xl font-extrabold mb-8 max-w-5xl mx-auto leading-tight tracking-tight">
              Create <span className="gradient-text bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">Nano Banana 3D Figurines</span> in Seconds
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
              Transform any photo into stunning <strong className="text-foreground">Nano Banana 3D figurines</strong> using Google's breakthrough AI technology. 
              Upload → AI Generate → 3D Convert → Print Quote — experience the complete pipeline from image to physical figurine in minutes.
            </p>

            {/* Stats Bar */}
            <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="font-semibold text-foreground">50K+</span> figurines created
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="w-4 h-4" />
                <span className="font-semibold text-foreground">15-25s</span> generation time
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe className="w-4 h-4" />
                <span className="font-semibold text-foreground">100%</span> free to use
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <InteractiveButton 
                variant="primary" 
                className="px-10 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                onClick={() => document.getElementById('upload')?.scrollIntoView({behavior:'smooth'})}
                data-testid="button-start-creating"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Creating Free
              </InteractiveButton>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-10 py-4 text-lg border-2 hover:bg-muted/50 backdrop-blur-sm" 
                asChild 
                data-testid="link-view-examples"
              >
                <Link href="/examples">
                  <Palette className="w-5 h-5 mr-2" />
                  View Gallery
                </Link>
              </Button>
            </div>
          </div>

          {/* Modern Upload & Generator Section */}
          <div className="max-w-5xl mx-auto">
            {/* Enhanced Upload Area */}
            <Card id="upload" className="backdrop-blur-sm bg-background/90 border-primary/20 shadow-xl">
              <CardHeader className="text-center pb-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                  <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent flex-1"></div>
                  <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                  <div className="h-px bg-gradient-to-r from-transparent via-muted to-transparent flex-1"></div>
                  <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                </div>
                <CardTitle className="text-2xl mb-2">Upload Your Photo</CardTitle>
                <CardDescription className="text-lg">
                  Start with any photo to create a professional Nano Banana figurine
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div 
                  className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 group cursor-pointer ${
                    dragActive 
                      ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 scale-[1.02]' 
                      : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/20'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  data-testid="upload-dropzone"
                >
                  {/* Upload Icon with Animation */}
                  <div className="mb-6">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 ${
                      dragActive ? 'bg-primary/20 scale-110' : 'bg-muted/50 group-hover:bg-primary/10'
                    }`}>
                      <Upload className={`w-10 h-10 transition-colors duration-300 ${
                        dragActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                      }`} />
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-3">
                      {dragActive ? 'Drop it right here!' : 'Drag & drop your image'}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Support JPG, PNG, WebP up to 10MB
                    </p>
                    <p className="text-sm text-muted-foreground">
                      or click the button below to browse files
                    </p>
                  </div>
                  
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    id="file-upload"
                    data-testid="input-file-upload"
                  />
                  
                  <InteractiveButton 
                    variant="secondary" 
                    className="relative z-10 pointer-events-none group-hover:border-primary/50 px-6 py-3"
                    data-testid="button-browse-files"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </InteractiveButton>
                  
                  {selectedFile && (
                    <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl border border-green-200 dark:border-green-800">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <p className="text-green-800 dark:text-green-200 font-medium" data-testid="text-selected-file">
                          {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(1)} MB)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Quick Tips */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <Sparkles className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">Best Results</p>
                    <p className="text-xs text-muted-foreground">Clear, well-lit photos</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <Zap className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">Fast Processing</p>
                    <p className="text-xs text-muted-foreground">15-25 seconds</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <CheckCircle className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">Safe & Secure</p>
                    <p className="text-xs text-muted-foreground">No data stored</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Figurine Generator */}
            {selectedFile && (
              <FigurineGenerator 
                selectedFile={selectedFile}
                onGenerationComplete={(figurine) => {
                  console.log("Figurine generated:", figurine);
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-gradient-to-br from-muted/30 via-background to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Complete Pipeline
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Complete <span className="gradient-text bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">Nano Banana</span> Workflow
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              From AI generation to physical 3D printing — we handle the entire pipeline with professional quality results
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <Card key={index} className="group relative text-center p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/30" data-testid={`feature-${index}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                <div className="relative z-10">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 group-hover:scale-110">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-muted-foreground">Simple 4-step process to create your figurine</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center" data-testid={`step-${index}`}>
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prompt Examples */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Popular Prompt Templates</h2>
            <p className="text-xl text-muted-foreground">
              Pre-tested prompts that create amazing figurines every time
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {promptExamples.map((example, index) => (
              <Card key={index} className="p-6" data-testid={`prompt-example-${index}`}>
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-lg">{example.category}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-sm text-muted-foreground mb-4 italic">
                    "{example.prompt}"
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {example.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild data-testid="link-all-prompts">
              <Link href="/prompts">View All Prompt Packs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Are Nano Banana 3D figurines free to generate?</h3>
              <p className="text-muted-foreground">
                Yes, creating Nano Banana 3D figurines is completely free using Google's Gemini 2.5 Flash Image technology. 
                Generate multiple custom figurines daily with no cost. Only 3D printing services have optional fees.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold mb-2">What is SynthID watermark?</h3>
              <p className="text-muted-foreground">
                All images generated through Gemini 2.5 Flash Image include an invisible SynthID watermark 
                for authenticity verification. This ensures responsible AI usage.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold mb-2">How do I 3D print my Nano Banana figurines?</h3>
              <p className="text-muted-foreground">
                Turn your Nano Banana 3D figurines into physical collectibles! Use our "Make it 3D" conversion tool to generate STL files. 
                Get instant printing quotes from professional services or download STL files for personal 3D printing.
              </p>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" asChild data-testid="link-full-faq">
              <Link href="/faq">View Complete FAQ</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your Nano Banana 3D Figurines?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join 50,000+ users creating incredible Nano Banana 3D figurines with our free AI-powered generator. Transform any photo into professional-quality figurines and physical collectibles in seconds!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-3" data-testid="button-start-now">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Creating Now
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3" asChild data-testid="link-how-to-guide">
              <Link href="/guides/how-to-use-nano-banana-in-ai-studio">How-to Guide</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}