import React from "react";
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
  Sparkles
} from "lucide-react";
import ImageEditor from "@/components/image-editor";
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";
import { nanoBananaExamples, defaultGalleryProps } from "@/data/gallery-examples";

export default function Home() {
  console.log("Home component is rendering");
  
  // State to handle prompt updates from gallery
  const [editorPrompt, setEditorPrompt] = React.useState('');
  
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
      title: "Multi-Turn Editing",
      description: "Make multiple changes while AI maintains context."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Free Access",
      description: "Use free - no signup required."
    }
  ];

  // Viral trending examples based on social media buzz and real user cases
  const examples = [
    {
      category: "🔥 Viral Selfie Magic",
      description: "Turn separate photos into natural selfies - the trick breaking Twitter",
      prompt: "Make them look like they're taking a selfie together in a park",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      viral: true,
      views: "2.3M views"
    },
    {
      category: "💇‍♀️ Virtual Hair Try-On",
      description: "Preview different hairstyles instantly - show your stylist what you want",
      prompt: "Reimagine this person with different hairstyles: Korean short cut, French curls, vintage waves",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      viral: true,
      views: "1.8M views"
    },
    {
      category: "🏖️ Object Persistence Magic",
      description: "Change objects while keeping backgrounds intact - tech that amazed Reddit",
      prompt: "Change the umbrellas to red but keep the beach exactly the same",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      viral: true,
      views: "3.1M views"
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Designer", 
      content: "This tool completely changed how I create mockups. Hours in Photoshop now take minutes. I recommend Gemini Nano Banana to everyone.",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Content Creator",
      content: "The character consistency is absolutely unreal. I create story sequences keeping characters identical. Every creator needs this platform.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-8 border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 pulse-glow"></span>
              🔥 Viral on Twitter • 2.5M LMArena Votes • #1 AI Image Editor
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text block">🍌 Gemini Nano Banana</span>
              <span className="block">Free AI Image Editor</span>
              <span className="block text-lg md:text-xl lg:text-2xl font-normal text-muted-foreground">Revolutionary AI Image Technology</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Create viral content with <strong>Gemini Nano Banana</strong> - the breakthrough AI that took social media by storm. This revolutionary platform uses advanced technology to deliver professional results with lightning-fast processing for stunning visuals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="px-10 py-5 text-lg font-bold bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-primary/20 rounded-xl"
                data-testid="hero-try-free"
              >
                <span className="text-2xl mr-2">🍌</span>
                Try Free Now
                <span className="ml-2 text-lg">✨</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold border-2"
                data-testid="hero-watch-tutorial"
              >
                View Tutorial
              </Button>
            </div>
            
            {/* Hero Demo Image */}
            <div className="relative max-w-4xl mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
                alt="AI image editing demonstration showing before and after transformations" 
                className="rounded-2xl shadow-2xl w-full h-auto float-animation" 
              />
              
              <Badge className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm">
                Before
              </Badge>
              <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground">
                After ✨
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Block */}
      <section className="py-8 border-b border-border bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-muted-foreground font-medium mb-4">Trusted by millions worldwide for professional creativity with industry-leading <strong>Gemini Nano Banana</strong> technology.</p>
          <div className="grid grid-cols-2 gap-4 opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground" data-testid="stat-users">2.5M</div>
              <div className="text-sm text-muted-foreground">LMArena Votes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground" data-testid="stat-images">🍌🍌🍌</div>
              <div className="text-sm text-muted-foreground">Sundar Pichai's Tweet</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground" data-testid="stat-ranking">#1</div>
              <div className="text-sm text-muted-foreground">Image AI Worldwide</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground" data-testid="stat-plan">1-2s</div>
              <div className="text-sm text-muted-foreground">Generation Speed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tool Demo */}
      <div data-testid="image-editor">
        <ImageEditor promptFromGallery={editorPrompt} />
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Why Choose <span className="gradient-text">Gemini Nano Banana</span>?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              <strong>Gemini Nano Banana</strong> outperformed Midjourney and DALL-E on LMArena benchmarks, delivering superior results that millions trust. Professional creators choose this platform for viral content creation and innovative editing solutions with consistent excellence.
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

      {/* What is Gemini Nano Banana */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">What is <span className="gradient-text">Gemini Nano Banana</span>?</h2>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p className="text-xl leading-relaxed text-center">
              <strong>Gemini Nano Banana</strong> is Google's viral AI that dominated LMArena leaderboards, shocking the community with unprecedented results. This platform offers revolutionary capabilities that make it the top choice for creators worldwide.
            </p>
            
            <h3 className="text-2xl font-bold mb-4">Why It Goes Viral</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  🍌 Character Consistency
                </h4>
                <p className="text-sm">
                  Keeps people looking identical across multiple edits
                </p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  🍌 Perfect Blending
                </h4>
                <p className="text-sm">
                  Gemini Nano Banana creates natural-looking photo combinations
                </p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  🍌 Natural Language
                </h4>
                <p className="text-sm">
                  Just tell Gemini Nano Banana what you want in plain English
                </p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  🍌 Professional Results
                </h4>
                <p className="text-sm">
                  Gemini Nano Banana delivers studio-quality edits instantly
                </p>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4">How It Works</h3>
            
            <p className="text-lg leading-relaxed">
              <strong>Gemini Nano Banana</strong> outperformed Midjourney and DALL-E, winning 2.5M+ votes on LMArena. Unlike other editors, this platform maintains visual coherence and creates authentic results for millions of users worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Bento Gallery - Popular Examples */}
      <section className="py-16 bg-muted/20">
        <InteractiveBentoGallery
          mediaItems={nanoBananaExamples}
          title={defaultGalleryProps.title}
          description={defaultGalleryProps.description}
          onUsePrompt={handleUsePrompt}
        />
      </section>

      {/* How Gemini Nano Banana Works */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">How <span className="gradient-text">It</span> Works</h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Three simple steps to use <strong>Gemini Nano Banana</strong> effectively. Master <strong>Gemini Nano Banana</strong> editing in minutes with <strong>Gemini Nano Banana</strong> tutorials.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 banana-glow">
                📤
              </div>
              <h3 className="text-xl font-bold mb-4">1. Upload Images</h3>
              <p className="text-muted-foreground">Drop images into the interface</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 banana-glow">
                ✍️
              </div>
              <h3 className="text-xl font-bold mb-4">2. Describe Changes</h3>
              <p className="text-muted-foreground">Tell the AI what you want in plain English</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 banana-glow">
                ✨
              </div>
              <h3 className="text-xl font-bold mb-4">3. AI Magic</h3>
              <p className="text-muted-foreground">Get perfect results instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gemini Nano Banana Reviews */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Why Creators Love <span className="gradient-text">Gemini Nano Banana</span></h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6" data-testid={`testimonial-${index}`}>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary rounded-full mr-3 flex items-center justify-center text-primary-foreground font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                <div className="flex text-primary">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Start Using Gemini Nano Banana Today */}
      <section className="py-16 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="text-6xl mb-6">🍌</div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Start Using <span className="gradient-text">Gemini Nano Banana</span> Today</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join millions creating viral content with <strong>Gemini Nano Banana</strong> - the AI that broke the internet. <strong>Gemini Nano Banana</strong> dominated social media feeds worldwide. Experience <strong>Gemini Nano Banana</strong> magic today with <strong>Gemini Nano Banana</strong> free access.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="px-12 py-5 text-lg font-bold hero-cta-button rounded-xl"
              data-testid="final-cta-start"
            >
              <span className="text-2xl mr-3">🍌</span>
              Try Gemini Nano Banana Free
              <span className="ml-3 text-lg">✨</span>
            </Button>
            <Link href="/api">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-10 py-4 text-lg font-bold"
                data-testid="final-cta-api"
              >
                API Access
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6">
            <strong>Gemini Nano Banana</strong> requires no signup • Free forever • Professional API available
          </p>
        </div>
      </section>

      {/* Quick FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="gradient-text">Gemini Nano Banana</span> FAQ
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-bold mb-2">What makes Gemini Nano Banana special?</h3>
              <p className="text-sm text-muted-foreground">
                <strong>Gemini Nano Banana</strong> is Google's breakthrough AI that became viral after topping LMArena, creating professional-grade edits that look authentically human.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-bold mb-2">Is <strong>Gemini Nano Banana</strong> really free?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! <strong>Gemini Nano Banana</strong> offers free unlimited access. Advanced features and API access available for professionals.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-bold mb-2">How fast is <strong>Gemini Nano Banana</strong>?</h3>
              <p className="text-sm text-muted-foreground">
                <strong>Gemini Nano Banana</strong> generates stunning edits in seconds. Upload images, describe your vision, and get viral-ready results instantly.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-bold mb-2">Why choose <strong>Gemini Nano Banana</strong>?</h3>
              <p className="text-sm text-muted-foreground">
                <strong>Gemini Nano Banana</strong> outperforms competitors with superior character consistency and maintains perfect visual coherence across all edits.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button 
              size="lg" 
              className="px-8 py-3 text-lg font-bold"
              onClick={() => document.querySelector('#tool')?.scrollIntoView({ behavior: 'smooth' })}
            >
              🍌 Experience the Magic
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Ready to create viral content? <strong>Gemini Nano Banana</strong> is waiting for you above.
            </p>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button 
          size="icon"
          className="w-14 h-14 rounded-full shadow-lg banana-glow text-2xl"
          onClick={() => document.querySelector('#tool')?.scrollIntoView({ behavior: 'smooth' })}
          data-testid="floating-action-button"
        >
          🍌
        </Button>
      </div>
    </div>
  );
}
