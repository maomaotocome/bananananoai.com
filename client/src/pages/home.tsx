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
              <span className="gradient-text block">🍌 Nano Banana AI</span>
              <span className="block">Photo Magic</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              The mysterious <strong>Nano Banana AI</strong> that broke Twitter and topped LMArena leaderboards. Now you can use Google's revolutionary <strong>Gemini 2.5 Flash Image</strong> model to create the same viral <strong>Nano Banana</strong> edits everyone's talking about. Experience the power of <strong>Gemini Nano Banana</strong> technology for free!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="px-10 py-5 text-lg font-bold bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-primary/20 rounded-xl"
                data-testid="hero-try-free"
              >
                <span className="text-2xl mr-2">🍌</span>
                Start Editing for Free
                <span className="ml-2 text-lg">✨</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold border-2"
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
              Why Choose <span className="gradient-text">Nano Banana AI</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powered by Google's <strong>Gemini 2.5 Flash Image</strong>, the revolutionary <strong>Gemini Nano Banana</strong> technology delivers world-class AI image editing capabilities that outperformed Midjourney, DALL-E, and other leading models on LMArena benchmarks.
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

      {/* What is Nano Banana AI - SEO Optimized Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              What is <span className="gradient-text">Nano Banana AI</span>?
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p className="text-xl leading-relaxed">
                <strong>Nano Banana AI</strong> is the viral codename for Google's groundbreaking <strong>Gemini 2.5 Flash Image</strong> model that took the internet by storm. 
                Originally appearing anonymously on LMArena benchmarks under the mysterious "nano-banana" identifier, this revolutionary AI image editing technology 
                achieved unprecedented results that shocked the AI community.
              </p>
              
              <p className="text-lg leading-relaxed">
                The <strong>Gemini Nano Banana</strong> phenomenon began when this unknown AI model dominated LMArena's image editing leaderboard, 
                outperforming established giants like Midjourney, DALL-E, and other leading AI image generators. For weeks, the tech community 
                speculated about the identity behind the mysterious "nano-banana" that was consistently winning blind tests with over 2.5 million votes.
              </p>
              
              <p className="text-lg leading-relaxed">
                When Google finally revealed that <strong>Nano Banana AI</strong> was actually their latest <strong>Gemini 2.5 Flash Image</strong> model, 
                social media exploded. Twitter users shared viral threads showcasing incredible <strong>Nano Banana</strong> transformations - from seamless 
                photo blending to perfect character consistency across multiple edits. The term "nano banana" became synonymous with high-quality, 
                believable AI image editing that maintains natural-looking results.
              </p>
              
              <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">
                How Does <span className="gradient-text">Nano Banana AI</span> Work?
              </h3>
              
              <p className="text-lg leading-relaxed">
                The <strong>Gemini Nano Banana</strong> technology uses advanced multi-turn editing capabilities, allowing users to make iterative changes 
                while maintaining perfect context and consistency. Unlike traditional AI image editors that treat each edit as isolated, 
                <strong>Nano Banana AI</strong> understands the relationship between subjects, objects, and backgrounds across multiple modifications.
              </p>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 my-8">
                <h4 className="text-xl font-semibold mb-3 text-foreground">Key Features of Nano Banana AI:</h4>
                <ul className="space-y-2 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 font-bold">🍌</span>
                    <span><strong>Character Consistency:</strong> Keep people looking the same across multiple edits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 font-bold">🍌</span>
                    <span><strong>Object Persistence:</strong> Change specific elements while preserving the rest</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 font-bold">🍌</span>
                    <span><strong>Multi-Image Blending:</strong> Combine photos seamlessly with natural results</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 font-bold">🍌</span>
                    <span><strong>Natural Language Prompts:</strong> Describe edits in plain English</span>
                  </li>
                </ul>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Why is <span className="gradient-text">Nano Banana</span> Going Viral?
              </h3>
              
              <p className="text-lg leading-relaxed">
                The <strong>Nano Banana AI</strong> viral phenomenon stems from its ability to create convincing, shareable content that looks genuinely natural. 
                Social media creators discovered they could generate viral "selfie magic" by blending separate photos into believable group shots, 
                create professional product photography without expensive equipment, and transform ordinary photos into extraordinary visual content.
              </p>
              
              <p className="text-lg leading-relaxed">
                What sets <strong>Gemini Nano Banana</strong> apart is its understanding of context and consistency. Traditional AI image editors often 
                produce obvious artifacts or inconsistent lighting, but <strong>Nano Banana</strong> maintains visual coherence that makes edits 
                look authentic and shareable. This quality has made it the go-to tool for content creators, marketers, and everyday users 
                looking to create professional-grade visual content without professional skills or equipment.
              </p>
            </div>
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
              className="px-12 py-5 text-lg font-bold hero-cta-button rounded-xl"
              data-testid="final-cta-start"
            >
              <span className="text-2xl mr-3">🍌</span>
              Start Creating for Free
              <span className="ml-3 text-lg">✨</span>
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

      {/* Nano Banana Tutorial & FAQ Section - SEO Optimized */}
      <section className="py-20 bg-gradient-to-br from-yellow-50/50 to-orange-50/50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              <span className="gradient-text">Nano Banana AI</span> Tutorial & FAQ
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">Quick Start Guide</h3>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h4 className="font-semibold text-lg mb-3">How to Use Nano Banana AI for Free</h4>
                    <ol className="space-y-2 text-muted-foreground">
                      <li>1. Upload your image(s) using our <strong>Nano Banana</strong> interface</li>
                      <li>2. Write your edit request in natural language</li>
                      <li>3. Click generate and watch <strong>Gemini 2.5 Flash Image</strong> work its magic</li>
                      <li>4. Download your viral-ready <strong>Nano Banana</strong> creation!</li>
                    </ol>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h4 className="font-semibold text-lg mb-3">Best Nano Banana AI Prompts</h4>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li>• "Make them look like they're taking a selfie together"</li>
                      <li>• "Change the background to a tropical beach paradise"</li>
                      <li>• "Add professional studio lighting to this portrait"</li>
                      <li>• "Blend these two photos into one natural scene"</li>
                      <li>• "Transform this into a vintage 1960s style photo"</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h4 className="font-semibold text-lg mb-2">What is Nano Banana AI?</h4>
                    <p className="text-muted-foreground text-sm">
                      <strong>Nano Banana AI</strong> is the viral codename for Google's <strong>Gemini 2.5 Flash Image</strong> model. 
                      It gained fame by topping LMArena benchmarks and creating viral social media content with perfect character consistency.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h4 className="font-semibold text-lg mb-2">Is Nano Banana AI free to use?</h4>
                    <p className="text-muted-foreground text-sm">
                      Yes! Our <strong>Gemini Nano Banana</strong> interface provides free access to Google's AI model. 
                      Premium features with unlimited usage are available for power users.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h4 className="font-semibold text-lg mb-2">How does Nano Banana AI compare to other tools?</h4>
                    <p className="text-muted-foreground text-sm">
                      <strong>Nano Banana AI</strong> outperformed Midjourney, DALL-E, and other leading models on LMArena. 
                      It excels at character consistency and natural-looking edits that don't appear obviously AI-generated.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h4 className="font-semibold text-lg mb-2">Can I use Nano Banana AI for commercial projects?</h4>
                    <p className="text-muted-foreground text-sm">
                      Yes! <strong>Gemini 2.5 Flash Image</strong> outputs can be used commercially. Many creators use <strong>Nano Banana</strong> 
                      for professional product photography, marketing content, and social media campaigns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <h3 className="text-xl font-semibold mb-4">Ready to Try Nano Banana AI?</h3>
              <p className="text-muted-foreground mb-6">
                Join millions of creators using <strong>Gemini Nano Banana</strong> technology to create viral content
              </p>
              <Button 
                size="lg" 
                className="px-10 py-4 text-lg font-bold"
                onClick={() => document.querySelector('#tool')?.scrollIntoView({ behavior: 'smooth' })}
              >
                🍌 Start Creating with Nano Banana AI
              </Button>
            </div>
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
