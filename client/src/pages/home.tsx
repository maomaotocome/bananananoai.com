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

export default function Home() {
  console.log("Home component is rendering");
  
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Character Consistency",
      description: "Keep subjects looking the same across multiple edits. Perfect for virtual try-ons and style transformations."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Generate professional edits in seconds, not minutes. Optimized for speed and quality."
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Multi-Image Blending",
      description: "Combine multiple photos seamlessly. Create impossible scenes with natural-looking results."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Natural Language",
      description: "Describe what you want in plain English. No complex interfaces or technical knowledge required."
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: "Multi-Turn Editing",
      description: "Make iterative changes while maintaining context. Build your perfect image step by step."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Free to Use",
      description: "No signup required for basic usage. Premium features available for power users."
    }
  ];

  // Viral trending examples based on social media buzz and real user cases
  const examples = [
    {
      category: "🔥 Viral Selfie Magic",
      description: "Turn two separate photos into a natural-looking selfie - the trick that's breaking Twitter",
      prompt: "Make them look like they're taking a selfie together in a park",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      viral: true,
      views: "2.3M views"
    },
    {
      category: "💇‍♀️ Virtual Hair Try-On",
      description: "Preview 6 different hairstyles instantly - show your stylist exactly what you want",
      prompt: "Reimagine this person with different hairstyles: Korean short cut, French curls, vintage waves",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      viral: true,
      views: "1.8M views"
    },
    {
      category: "🏖️ Object Persistence Magic",
      description: "Change specific objects while keeping backgrounds perfectly intact - the tech that amazed Reddit",
      prompt: "Change the umbrellas to red but keep the beach exactly the same",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      viral: true,
      views: "3.1M views"
    },
    {
      category: "🎨 Tattoo Effect Preview",
      description: "See how tattoos look before getting inked - upload body part photo with desired design",
      prompt: "Add a traditional Japanese dragon tattoo on the arm, maintaining original skin tone and muscle definition",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      viral: false,
      views: "950K views"
    },
    {
      category: "🏠 Interior Design Instant",
      description: "Upload empty room photo with simple sketch - AI generates professional interior design",
      prompt: "Place sofa, coffee table, TV stand at marked positions, modern minimalist style",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      viral: false,
      views: "720K views"
    },
    {
      category: "🍳 Recipe Generator",
      description: "Photo your fridge contents - AI creates complete recipe with cooking tutorial video",
      prompt: "Convert these ingredients into complete step-by-step recipe infographic, top-down view, minimal style",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      viral: false,
      views: "890K views"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Designer",
      content: "Nano Banana completely changed how I create mockups. What used to take hours in Photoshop now takes minutes.",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Content Creator",
      content: "The character consistency is unreal. I can create entire story sequences while keeping my characters looking the same.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "E-commerce Owner",
      content: "My product photos look so professional now. Nano Banana helped me create shots I couldn't afford with traditional photography.",
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
              🔥 Viral on Twitter • 2.5M Votes on LMArena • #1 Image AI
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              The Viral AI Behind
              <span className="gradient-text block">🍌 Nano Banana</span>
              <span className="block">Photo Magic</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              The mysterious AI that broke Twitter and topped LMArena leaderboards. Now you can use Google's Gemini 2.5 Flash Image model to create the same viral edits everyone's talking about.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold banana-glow"
                data-testid="hero-try-free"
              >
                🍌 Start Editing for Free
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold"
                data-testid="hero-watch-tutorial"
              >
                Watch Tutorial
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
      <section className="py-12 border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-muted-foreground font-medium">Trusted by creators worldwide</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
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
      <ImageEditor />

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-text">Nano Banana</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powered by Google's Gemini 2.5 Flash Image, the world's most advanced AI image editing model
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

      {/* Examples Gallery */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Viral <span className="gradient-text">Nano Banana</span> Examples
            </h2>
            <p className="text-xl text-muted-foreground">The same edits that broke Twitter • Millions of views • Try them yourself</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {examples.map((example, index) => (
              <Card 
                key={index} 
                className={`overflow-hidden hover:shadow-lg transition-all ${
                  example.viral ? 'ring-2 ring-primary/20 border-primary/30' : ''
                }`}
                data-testid={`example-${index}`}
              >
                <div className="relative">
                  <img 
                    src={example.image} 
                    alt={example.description} 
                    className="w-full h-48 object-cover" 
                  />
                  {example.viral && (
                    <Badge className="absolute top-3 right-3 bg-red-500 text-white animate-pulse">
                      🔥 VIRAL
                    </Badge>
                  )}
                  <Badge className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm text-xs">
                    {example.views}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{example.category}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{example.description}</p>
                  <div className="flex items-start text-sm text-primary">
                    <span className="mr-2 mt-1">📝</span>
                    <code className="bg-primary/10 px-3 py-2 rounded text-xs leading-relaxed flex-1">"{example.prompt}"</code>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/examples">
              <Button variant="outline" size="lg" data-testid="view-all-examples">
                View All Examples
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground">Three simple steps to transform your images</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "📤", title: "Upload", desc: "Drag and drop up to 5 images. Support for JPG, PNG, WebP formats." },
              { icon: "✍️", title: "Describe", desc: "Write what you want in plain English. Be creative with your prompts!" },
              { icon: "✨", title: "Transform", desc: "Watch as AI creates your perfect image in seconds. Download and share!" }
            ].map((step, index) => (
              <div key={index} className="text-center" data-testid={`how-it-works-${index}`}>
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 banana-glow">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{index + 1}. {step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof & Testimonials */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Loved by <span className="gradient-text">Creators</span>
            </h2>
            <p className="text-xl text-muted-foreground">Join thousands of users creating amazing content</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Final CTA */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="text-6xl mb-6">🍌</div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to go <span className="gradient-text">Bananas</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of creators transforming their images with the world's most advanced AI editing technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="px-10 py-4 text-lg font-bold pulse-glow"
              data-testid="final-cta-start"
            >
              🍌 Start Creating for Free
            </Button>
            <Link href="/api">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-10 py-4 text-lg font-bold"
                data-testid="final-cta-api"
              >
                View API Documentation
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6">
            No signup required • Free forever plan • $0.039/image for API
          </p>
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
