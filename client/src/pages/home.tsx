import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Zap, 
  Palette, 
  MessageSquare, 
  RotateCcw, 
  Heart,
  Star,
  ArrowRight,
  Sparkles,
  HelpCircle
} from "lucide-react";
import { AnimatedBackground, InteractiveButton } from "@/components/ui/animated-background";
import { StepGuide, StepIndicator } from "@/components/ui/step-guide";
import ImageEditor from "@/components/image-editor";
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";
import { bananaNanoAiExamples, defaultGalleryProps } from "@/data/gallery-examples";
import { SEOHead, seoConfigs } from "@/components/seo-head";
import { StructuredData, OrganizationStructuredData } from "@/components/structured-data";

export default function Home() {
  console.log("Home component is rendering");
  
  // State to handle prompt updates from gallery
  const [editorPrompt, setEditorPrompt] = React.useState('');
  const [showGuide, setShowGuide] = useState(false);
  
  // Function to handle prompt selection from gallery
  const handleUsePrompt = (prompt: string) => {
    setEditorPrompt(prompt);
    // Scroll to the editor
    const editorElement = document.querySelector('[data-testid="image-editor"]');
    if (editorElement) {
      editorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Character Consistency",
      description: "Keep subjects identical across edits with advanced AI technology."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Lightning Speed",
      description: "Generate professional edits in seconds with powerful AI processing."
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Multi-Image Blending",
      description: "Combine photos seamlessly with advanced technology."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Natural Language",
      description: "Describe edits in plain English - simple and intuitive."
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: "Professional Quality",
      description: "Studio-grade results that rival expensive software solutions."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Free & Accessible",
      description: "Powerful editing tools available to everyone at zero cost."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Designer", 
      content: "This Banana Nano Ai tool completely changed how I create mockups. Hours in Photoshop now take minutes. I recommend Banana Nano Ai to everyone.",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Content Creator",
      content: "The Banana Nano Ai character consistency is absolutely unreal. I create story sequences keeping characters identical. Every creator needs this Banana Nano Ai platform.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <SEOHead {...seoConfigs.home} />
      
      {/* Structured Data for SEO */}
      <StructuredData 
        type="SoftwareApplication" 
        data={{
          name: "Banana Nano Ai",
          description: "Revolutionary AI-powered image editing tool",
          rating: 4.9,
          reviewCount: 50000
        }} 
      />
      <OrganizationStructuredData />
      
      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32 relative overflow-hidden">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-8 border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 pulse-glow"></span>
              🔥 Viral on Twitter • 2.5M LMArena Votes • #1 AI Image Editor
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text block">🍌 Banana Nano Ai</span>
              <span className="block">Free AI Image Editor</span>
              <span className="block text-lg md:text-xl lg:text-2xl font-normal text-muted-foreground">Revolutionary AI Image Technology</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Create viral content with <strong>Banana Nano Ai</strong> - the breakthrough <strong>Banana Nano Ai</strong> AI that took social media by storm. This revolutionary <strong>Banana Nano Ai</strong> platform uses advanced technology to deliver professional results with lightning-fast processing for stunning visuals. <Link href="/examples" className="text-primary hover:text-primary/80 underline">See examples</Link> of what's possible or <Link href="/how-to-use" className="text-primary hover:text-primary/80 underline">learn how to get started</Link>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 min-h-[80px]">
              <InteractiveButton 
                variant="primary"
                onClick={() => {
                  const editorSection = document.getElementById('editor');
                  if (editorSection) {
                    editorSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                data-testid="hero-try-free"
              >
                <span className="text-2xl mr-2">🍌</span>
                Try Free Now
                <span className="ml-2 text-lg">✨</span>
              </InteractiveButton>
              <InteractiveButton 
                variant="secondary"
                onClick={() => setShowGuide(true)}
                data-testid="hero-watch-tutorial"
              >
                <HelpCircle className="mr-2 w-5 h-5" />
                New User Guide
                <ArrowRight className="ml-2 w-5 h-5" />
              </InteractiveButton>
            </div>
            
            <div className="flex flex-wrap gap-6 justify-center items-center text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">4.9/5 from 50k+ users</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full pulse-glow"></span>
                <span className="font-medium">100% Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="font-medium">Instant Processing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Editor Section */}
      <section id="editor" className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Transform Images with <span className="gradient-text">Banana Nano Ai</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the power of <strong>Banana Nano Ai</strong> AI image editing with <strong>Banana Nano Ai</strong> technology. Upload your photo and describe the changes you want in natural language. Our advanced <strong>Banana Nano Ai</strong> technology delivers professional results instantly with unprecedented quality and speed.
            </p>
          </div>
          {/* Step indicator with fixed height */}
          <div className="h-16 flex items-center justify-center">
            <StepIndicator />
          </div>
          
          <ImageEditor 
            key={editorPrompt} 
            promptFromGallery={editorPrompt}
            data-testid="image-editor"
          />
        </div>
      </section>

      {/* Interactive Bento Gallery - Popular Examples - Moved here for better UX and SEO */}
      <section className="py-16 bg-muted/20">
        <InteractiveBentoGallery
          mediaItems={bananaNanoAiExamples}
          title={defaultGalleryProps.title}
          description={defaultGalleryProps.description}
          onUsePrompt={handleUsePrompt}
        />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Why Choose <span className="gradient-text">Banana Nano Ai</span>?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              <strong>Banana Nano Ai</strong> outperformed Midjourney and DALL-E on LMArena benchmarks, delivering superior <strong>Banana Nano Ai</strong> results that millions trust. Professional creators choose this <strong>Banana Nano Ai</strong> platform for viral content creation and innovative editing solutions with consistent excellence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="feature-card p-8 transition-all hover:shadow-lg"
                data-testid={`feature-${index}`}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What is Banana Nano Ai - Expanded Content */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">What is <span className="gradient-text">Banana Nano Ai</span>?</h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Revolutionary AI Image Editor Technology</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                <strong>Banana Nano Ai</strong> represents the next generation of AI-powered image editing technology. Built on Google's advanced Gemini 2.5 Flash Image model, this revolutionary <strong>Banana Nano Ai</strong> platform combines cutting-edge machine learning with intuitive design, making professional-grade image editing accessible to everyone worldwide.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Unlike traditional image editors that require complex skills and expensive software, <strong>Banana Nano Ai</strong> uses natural language processing to understand your creative vision. Simply describe what you want in plain English, and watch as our advanced <strong>Nano Banana AI</strong> technology transforms your ideas into stunning visual reality with unprecedented precision and speed.
              </p>
            </div>
            <div className="bg-muted/30 rounded-xl p-8">
              <h4 className="text-xl font-bold mb-4">Key Capabilities</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start"><span className="text-primary mr-2">•</span>Character consistency across multiple edits</li>
                <li className="flex items-start"><span className="text-primary mr-2">•</span>Multi-image blending and fusion</li>
                <li className="flex items-start"><span className="text-primary mr-2">•</span>Background replacement and scene editing</li>
                <li className="flex items-start"><span className="text-primary mr-2">•</span>Virtual try-on and product visualization</li>
                <li className="flex items-start"><span className="text-primary mr-2">•</span>Style transfer and artistic effects</li>
                <li className="flex items-start"><span className="text-primary mr-2">•</span>Object removal and addition</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <h4 className="text-xl font-bold mb-4">Performance Leader</h4>
              <p className="text-muted-foreground mb-4">
                <strong>Banana Nano Ai</strong> outperformed Midjourney, DALL-E 3, and other leading AI image generators in blind testing, earning over 2.5 million votes on LMArena benchmarks.
              </p>
              <Badge className="bg-primary/10 text-primary">Verified #1 Performance</Badge>
            </Card>
            
            <Card className="p-6 text-center">
              <h4 className="text-xl font-bold mb-4">Industry Recognition</h4>
              <p className="text-muted-foreground mb-4">
                Featured in major publications including The Washington Post, Business Insider, and TechCrunch for its breakthrough character consistency and multi-image editing capabilities.
              </p>
              <Badge className="bg-primary/10 text-primary">Media Featured</Badge>
            </Card>
            
            <Card className="p-6 text-center">
              <h4 className="text-xl font-bold mb-4">User Trusted</h4>
              <p className="text-muted-foreground mb-4">
                Over 100,000+ creators, designers, and businesses worldwide trust <strong>Banana Nano Ai</strong> for their professional image editing needs and viral content creation.
              </p>
              <Badge className="bg-primary/10 text-primary">100K+ Active Users</Badge>
            </Card>
          </div>
          
          {/* How Banana Nano AI Works */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">How <span className="gradient-text">Banana Nano Ai</span> Works</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl mb-4 mx-auto">1</div>
                <h4 className="font-semibold mb-2">Upload Image</h4>
                <p className="text-sm text-muted-foreground">Upload your photo or image to the <strong>Banana Nano Ai</strong> platform</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl mb-4 mx-auto">2</div>
                <h4 className="font-semibold mb-2">Describe Changes</h4>
                <p className="text-sm text-muted-foreground">Tell <strong>Nano Banana AI</strong> what you want to edit in natural language</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl mb-4 mx-auto">3</div>
                <h4 className="font-semibold mb-2">AI Processing</h4>
                <p className="text-sm text-muted-foreground">Advanced <strong>Banana Nano Ai</strong> algorithms process your request</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl mb-4 mx-auto">4</div>
                <h4 className="font-semibold mb-2">Get Results</h4>
                <p className="text-sm text-muted-foreground">Download your professionally edited image in seconds</p>
              </div>
            </div>
          </div>
          
          {/* Use Cases */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">Popular <span className="gradient-text">Banana Nano Ai</span> Use Cases</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h4 className="font-bold mb-3">Content Creation</h4>
                <p className="text-sm text-muted-foreground">Social media creators use <strong>Banana Nano Ai</strong> to produce viral content with consistent characters and professional quality that engages millions of followers.</p>
              </Card>
              <Card className="p-6">
                <h4 className="font-bold mb-3">E-commerce Product Photos</h4>
                <p className="text-sm text-muted-foreground">Online stores leverage <strong>Nano Banana AI</strong> for product mockups, virtual try-ons, and lifestyle photography that increases conversion rates.</p>
              </Card>
              <Card className="p-6">
                <h4 className="font-bold mb-3">Marketing Campaigns</h4>
                <p className="text-sm text-muted-foreground">Agencies and brands use <strong>Banana Nano Ai</strong> to create compelling visual content for advertisements, social campaigns, and promotional materials.</p>
              </Card>
              <Card className="p-6">
                <h4 className="font-bold mb-3">Personal Photography</h4>
                <p className="text-sm text-muted-foreground">Individual users enhance their photos with <strong>Banana Nano Ai</strong> for professional results without expensive software or technical expertise.</p>
              </Card>
              <Card className="p-6">
                <h4 className="font-bold mb-3">Graphic Design</h4>
                <p className="text-sm text-muted-foreground">Designers integrate <strong>Nano Banana AI</strong> into their workflow for rapid prototyping, concept visualization, and creative exploration.</p>
              </Card>
              <Card className="p-6">
                <h4 className="font-bold mb-3">Educational Content</h4>
                <p className="text-sm text-muted-foreground">Educators and trainers use <strong>Banana Nano Ai</strong> to create engaging visual materials, illustrations, and interactive learning resources.</p>
              </Card>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              The technology behind <strong>Banana Nano Ai</strong> has been rigorously tested and validated by millions of users worldwide, earning recognition for its superior performance in competitive benchmarks. Content creators, professional designers, marketing agencies, and businesses across industries rely on this <strong>Nano Banana AI</strong> platform for its consistency, quality, and ease of use. From complex virtual try-ons to seamless background replacements, <strong>Banana Nano Ai</strong> handles even the most challenging editing tasks with remarkable precision and reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Users Say About <span className="gradient-text">Banana Nano Ai</span></h2>
            <p className="text-xl text-muted-foreground">
              Millions trust <strong>Banana Nano Ai</strong> for their creative projects
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8" data-testid={`testimonial-${index}`}>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create with <span className="gradient-text">Banana Nano Ai</span>?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join millions who trust <strong>Banana Nano Ai</strong> for professional image editing. Start creating amazing content today with our revolutionary AI technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-10 py-5 text-lg font-bold bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-primary/20 rounded-xl"
              onClick={() => {
                const editorSection = document.getElementById('editor');
                if (editorSection) {
                  editorSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              data-testid="cta-start-creating"
            >
              <span className="text-2xl mr-2">🍌</span>
              Start Creating Now
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold border-2"
              asChild
              data-testid="cta-learn-more"
            >
              <Link href="/examples">
                View More Examples
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Step Guide Modal */}
      <StepGuide 
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
      />
    </div>
  );
}