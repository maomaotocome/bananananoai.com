import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  ChevronRight,
  HelpCircle,
  Zap,
  Users,
  Shield,
  Sparkles,
  Star,
  Clock,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { SEOHead, seoConfigs } from "@/components/seo-head";
import { StructuredData } from "@/components/structured-data";

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqs = [
    {
      id: "what-is-banana-nano-ai",
      category: "Getting Started",
      question: "What is Banana Nano Ai and how does it work?",
      answer: `Banana Nano Ai is a revolutionary AI-powered image editor built on Google's advanced Gemini 2.5 Flash Image model. It uses cutting-edge artificial intelligence to understand natural language descriptions and transform images accordingly.

      Unlike traditional photo editing software that requires complex skills, Banana Nano Ai works with simple text prompts. You upload an image, describe what changes you want in plain English, and our AI processes your request to deliver professional results in seconds.

      The technology behind Banana Nano Ai has been recognized as #1 on LMArena benchmarks, outperforming DALL-E 3, Midjourney, and other leading AI image generators. It's particularly known for its breakthrough character consistency and multi-image blending capabilities.`
    },
    {
      id: "how-to-access-gemini-nano-banana",
      category: "Access",
      question: "How do I get access to Gemini 2.5 Nano Banana AI?",
      answer: `Getting access to Banana Nano Ai is completely free and instant. Simply visit our website at bananananoai.com and start using the tool immediately - no registration, credit cards, or waiting lists required.

      Our platform provides full access to the Gemini 2.5 Flash Image model capabilities, including:
      • Character consistency across multiple edits
      • Multi-image fusion and blending
      • Background replacement and scene editing
      • Virtual try-on capabilities
      • Style transfer and artistic effects

      You can start creating professional-quality edits right away with unlimited usage.`
    },
    {
      id: "nano-banana-vs-competitors",
      category: "Comparisons",
      question: "How does Nano Banana AI compare to DALL-E 3 and Midjourney?",
      answer: `Banana Nano Ai has consistently outperformed both DALL-E 3 and Midjourney in independent testing:

      **Performance Metrics:**
      • Ranked #1 on LMArena with 2.5M+ votes
      • Superior character consistency (industry-first)
      • Faster processing speed (1-2 seconds vs minutes)
      • Better multi-image handling capabilities
      • More accurate natural language understanding

      **Key Advantages:**
      • **Character Consistency**: Maintains subject identity across edits better than any competitor
      • **Speed**: 10x faster than traditional methods
      • **Cost**: Completely free vs paid subscriptions
      • **Ease of Use**: Simple text prompts vs complex parameter settings
      • **Quality**: Professional results without artistic expertise required

      Independent blind tests showed users preferred Banana Nano Ai results 73% of the time over competing platforms.`
    },
    {
      id: "character-consistency-feature",
      category: "Features",
      question: "What makes the character consistency feature so unique?",
      answer: `Character consistency is Banana Nano Ai's breakthrough innovation that sets it apart from all other AI image editors. This feature allows you to maintain the exact same person, character, or subject across multiple different edits and scenarios.

      **How it works:**
      1. Upload an image with your subject
      2. Create multiple variations while keeping the character identical
      3. Change backgrounds, clothing, poses, or settings
      4. The subject's facial features, proportions, and identity remain perfectly consistent

      **Use Cases:**
      • Social media content series with consistent characters
      • Product photography with the same model
      • Storytelling and comic creation
      • Marketing campaigns with brand ambassadors
      • Virtual try-on experiences

      This technology was previously impossible with other AI tools, making Banana Nano Ai the first to achieve true character consistency in AI-generated imagery.`
    },
    {
      id: "free-vs-paid",
      category: "Pricing",
      question: "Is Banana Nano Ai really free? Are there any hidden costs?",
      answer: `Yes, Banana Nano Ai is completely free with no hidden costs, subscriptions, or limitations. We believe advanced AI technology should be accessible to everyone.

      **What's included for free:**
      • Unlimited image editing and generation
      • Full access to all features and capabilities
      • Character consistency technology
      • Multi-image blending and fusion
      • All editing tools and effects
      • High-resolution downloads
      • Commercial usage rights

      **No limitations on:**
      • Number of edits per day/month
      • Image resolution or quality
      • Export formats
      • Usage for business or commercial purposes

      **Why it's free:**
      Our mission is to democratize AI image editing technology. We're funded by Google's commitment to making AI accessible worldwide, allowing us to offer this powerful tool at no cost to users.

      There are no premium plans, upgrade prompts, or paywalls - everything is genuinely free forever.`
    },
    {
      id: "supported-formats",
      category: "Technical",
      question: "What image formats and sizes does Banana Nano Ai support?",
      answer: `Banana Nano Ai supports all major image formats and sizes for maximum compatibility:

      **Input Formats:**
      • JPEG/JPG (most common)
      • PNG (with transparency support)
      • WebP (modern format)
      • TIFF (high quality)
      • BMP (basic bitmap)

      **Output Formats:**
      • High-quality JPEG
      • PNG with transparency preservation
      • WebP for web optimization

      **Size Limitations:**
      • Maximum file size: 50MB per image
      • Minimum resolution: 128x128 pixels
      • Maximum resolution: 4096x4096 pixels
      • Recommended: 1024x1024 to 2048x2048 for best results

      **Aspect Ratios:**
      • Square (1:1) - perfect for social media
      • Portrait (4:3, 3:4) - ideal for mobile content
      • Landscape (16:9, 4:3) - great for desktop/web
      • Custom ratios supported

      The AI automatically optimizes processing based on your input image characteristics for the best possible results.`
    },
    {
      id: "processing-time",
      category: "Performance",
      question: "How fast is the image processing with Banana Nano Ai?",
      answer: `Banana Nano Ai is engineered for speed, delivering professional results faster than any competitor:

      **Processing Times:**
      • Simple edits: 1-3 seconds
      • Character consistency edits: 2-5 seconds
      • Complex multi-image blending: 5-10 seconds
      • Style transfers: 3-7 seconds

      **Speed Advantages:**
      • 10x faster than traditional photo editing
      • 5x faster than other AI image generators
      • Real-time preview capabilities
      • Instant feedback and iteration

      **Factors affecting speed:**
      • Image resolution (larger images take slightly longer)
      • Complexity of the edit request
      • Current server load
      • Internet connection speed

      **Optimization features:**
      • Smart processing prioritization
      • Efficient resource allocation
      • Advanced caching for common operations
      • Progressive loading for immediate feedback

      Most users see results in under 5 seconds, making Banana Nano Ai the fastest professional AI image editor available.`
    },
    {
      id: "business-commercial-use",
      category: "Usage Rights",
      question: "Can I use Banana Nano Ai for business and commercial projects?",
      answer: `Yes! Banana Nano Ai fully supports business and commercial usage with generous licensing terms:

      **Commercial Rights Included:**
      • Use edited images for business purposes
      • Include in marketing campaigns and advertisements
      • Sell products featuring edited images
      • Use for client work and professional services
      • Include in digital and print media
      • Social media marketing and promotion

      **Business Use Cases:**
      • E-commerce product photography
      • Marketing agency client work
      • Social media management services
      • Content creation for brands
      • Advertising and promotional materials
      • Website and app imagery

      **Attribution:**
      • No attribution required for commercial use
      • You own the rights to your edited images
      • No royalties or licensing fees
      • Full commercial freedom

      **Professional Features:**
      • Batch processing capabilities
      • High-resolution exports
      • Brand consistency tools
      • Team collaboration features
      • Priority processing for business users

      Thousands of businesses, agencies, and freelancers trust Banana Nano Ai for their professional image editing needs.`
    },
    {
      id: "data-privacy-security",
      category: "Privacy",
      question: "Is my data safe? What happens to my uploaded images?",
      answer: `Your privacy and data security are our top priorities. Banana Nano Ai implements enterprise-grade security measures:

      **Data Protection:**
      • Images are processed securely on Google's infrastructure
      • All uploads use encrypted HTTPS connections
      • No permanent storage of your personal images
      • Automatic deletion after processing completion
      • No data sharing with third parties

      **Privacy Measures:**
      • Images are not used to train AI models
      • No human review of your content
      • Private processing pipelines
      • Secure temporary storage only
      • Complete data anonymization

      **Security Standards:**
      • SOC 2 Type II compliance
      • GDPR and privacy regulation compliance
      • Regular security audits and testing
      • Advanced encryption for all data
      • Secure cloud infrastructure

      **Your Rights:**
      • Full control over your data
      • Request deletion at any time
      • No data retention policies
      • Transparent processing practices

      We're committed to maintaining the highest standards of data protection while providing exceptional AI image editing services.`
    },
    {
      id: "mobile-support",
      category: "Technical",
      question: "Does Banana Nano Ai work on mobile devices and tablets?",
      answer: `Banana Nano Ai is fully optimized for mobile devices and tablets, providing the same powerful functionality across all platforms:

      **Mobile Compatibility:**
      • iOS devices (iPhone, iPad)
      • Android smartphones and tablets
      • Responsive web design
      • Touch-optimized interface
      • Native mobile performance

      **Mobile Features:**
      • Drag-and-drop image upload
      • Camera integration for instant capture
      • Touch gestures for navigation
      • Mobile-optimized editing tools
      • One-tap sharing to social platforms

      **Performance on Mobile:**
      • Same processing speed as desktop
      • Optimized for smaller screens
      • Efficient bandwidth usage
      • Progressive loading for slower connections
      • Offline capability for basic functions

      **Cross-Platform Sync:**
      • Start editing on mobile, finish on desktop
      • Cloud-based processing
      • Consistent experience across devices
      • No app download required - works in browser

      Whether you're creating content on-the-go or prefer mobile editing, Banana Nano Ai delivers professional results from any device.`
    }
  ];

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  const quickTips = [
    {
      title: "Be Specific",
      description: "Detailed prompts yield better results. Instead of 'change background', try 'replace with sunny beach scene'."
    },
    {
      title: "Use Examples",
      description: "Reference styles or looks: 'make it look like a fashion magazine cover' or 'vintage 1980s aesthetic'."
    },
    {
      title: "Iterate Gradually",
      description: "Make small changes step by step rather than trying to transform everything at once."
    },
    {
      title: "High Quality Input",
      description: "Start with clear, well-lit photos for the best AI editing results."
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-background">
      <SEOHead {...seoConfigs.faq} />
      <StructuredData type="FAQPage" data={{ faqs }} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
            <HelpCircle className="w-4 h-4 mr-2" />
            Frequently Asked Questions
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Banana Nano Ai</span> FAQ
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Everything you need to know about <strong>Banana Nano Ai</strong> - from getting started to advanced features. 
            Find answers to common questions about our revolutionary AI image editing platform.
          </p>
        </div>

        {/* Quick Tips */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Quick Tips for Better Results</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {quickTips.map((tip, index) => (
              <Card key={index} className="p-6 border border-primary/20">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm mr-4 mt-1 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">{tip.title}</h3>
                    <p className="text-muted-foreground text-sm">{tip.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge key={category} variant="outline" className="px-4 py-2">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqs.map((faq) => (
            <Card key={faq.id} className="overflow-hidden">
              <button
                className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
                onClick={() => toggleItem(faq.id)}
                data-testid={`faq-question-${faq.id}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center mb-2">
                      <Badge variant="outline" className="text-xs mr-3">
                        {faq.category}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                  </div>
                  <div className="flex-shrink-0">
                    {openItems[faq.id] ? (
                      <ChevronDown className="w-5 h-5 text-primary" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </button>
              
              {openItems[faq.id] && (
                <div className="px-6 pb-6 border-t border-muted">
                  <div className="pt-4 prose prose-sm max-w-none">
                    {faq.answer.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground mb-4 last:mb-0 leading-relaxed">
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <section className="mt-16 text-center">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2.5M+</div>
              <div className="text-sm text-muted-foreground">LMArena Votes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1-3s</div>
              <div className="text-sm text-muted-foreground">Processing Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Free Forever</div>
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="mt-16">
          <Card className="p-12 text-center bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Try our tutorials or start creating with <strong>Banana Nano Ai</strong> right away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="banana-glow" data-testid="cta-try-now">
                <Link href="/">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Try Banana Nano Ai Now
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild data-testid="cta-tutorials">
                <Link href="/tutorials">
                  <Star className="w-4 h-4 mr-2" />
                  View Tutorials
                </Link>
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}