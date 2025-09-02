import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Users, 
  Target, 
  Mail, 
  Zap,
  CheckCircle,
  ArrowRight,
  Gift,
  Star,
  Trophy,
  Clock,
  Shield,
  Play,
  Download,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function LandingFunnel() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleEmailSignup = async () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to continue.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate API call
    toast({
      title: "Welcome to Banana Nano Ai!",
      description: "Check your email for instant access and exclusive tutorials.",
    });
    setEmail("");
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback) {
      toast({
        title: "Feedback required",
        description: "Please share your thoughts to help us improve.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Thank you for your feedback!",
      description: "Your input helps us make Banana Nano Ai even better.",
    });
    setFeedback("");
  };

  const funnelSteps = [
    {
      stage: "Awareness",
      title: "Viral Discovery",
      description: "Users discover Banana Nano Ai through viral social content, press coverage, or search",
      conversion: "25%",
      traffic: "100K visitors/month",
      tactics: [
        "Viral before/after content on social media",
        "SEO-optimized blog posts and tutorials", 
        "Press coverage in tech publications",
        "Influencer partnerships and reviews",
        "Reddit community engagement"
      ]
    },
    {
      stage: "Interest",
      title: "Feature Exploration",
      description: "Visitors explore unique features and see Banana Nano Ai's competitive advantages",
      conversion: "40%",
      traffic: "25K engaged users",
      tactics: [
        "Interactive demo showcasing character consistency",
        "Comparison pages vs competitors",
        "Free tutorial library and case studies",
        "Community success stories",
        "Live examples and before/after galleries"
      ]
    },
    {
      stage: "Trial",
      title: "First Use Experience",
      description: "Users try the tool and experience the quality and speed firsthand",
      conversion: "60%",
      traffic: "10K trial users",
      tactics: [
        "One-click start with no registration required",
        "Smart prompt suggestions for first-time users",
        "Quick wins with impressive results",
        "Onboarding tooltips and guidance",
        "Social sharing prompts for results"
      ]
    },
    {
      stage: "Adoption",
      title: "Regular Usage",
      description: "Users integrate Banana Nano Ai into their regular creative workflow",
      conversion: "45%",
      traffic: "6K active users",
      tactics: [
        "Email course with advanced techniques",
        "Community challenges and competitions",
        "New feature announcements and tutorials",
        "User-generated content showcases",
        "Creator program and partnerships"
      ]
    },
    {
      stage: "Advocacy",
      title: "Word-of-Mouth",
      description: "Satisfied users become advocates, sharing and recommending the tool",
      conversion: "30%",
      traffic: "2.7K advocates",
      tactics: [
        "Referral program with exclusive benefits",
        "User testimonial collection",
        "Community moderator program",
        "Early access to new features",
        "Creator spotlight features"
      ]
    }
  ];

  const landingPageVariants = [
    {
      title: "For Creators & Influencers",
      headline: "Create Viral Content That Gets 10x More Engagement",
      subheadline: "The AI that creates perfect character consistency - used by top creators to generate millions of views",
      cta: "Start Creating Viral Content",
      benefits: [
        "Perfect character consistency across all edits",
        "Lightning-fast generation (1-2 seconds)",
        "Viral-worthy before/after transformations",
        "100% free - no credit cards required"
      ],
      testimonial: "I went from 50K to 500K followers in 3 months using Banana Nano Ai. The character consistency is unreal!",
      author: "Sarah Chen, Content Creator"
    },
    {
      title: "For Businesses & Agencies",
      headline: "Scale Your Visual Content 10x Faster",
      subheadline: "The Google AI that outperformed DALL-E 3 and Midjourney - now powering businesses worldwide",
      cta: "Transform Your Business",
      benefits: [
        "Reduce content creation costs by 75%",
        "Generate professional imagery in seconds",
        "Maintain brand consistency across campaigns",
        "Scale creative output without hiring"
      ],
      testimonial: "Banana Nano Ai helped us increase sales by 340% through better product photography. ROI was immediate.",
      author: "Marcus Rodriguez, Marketing Director"
    },
    {
      title: "For AI Enthusiasts",
      headline: "The Mysterious AI That Broke the Internet",
      subheadline: "The Google AI that got 2.5M votes before anyone knew it was Google's - now publicly available",
      cta: "Experience the Revolution",
      benefits: [
        "First AI to achieve true character consistency",
        "Google's latest image generation breakthrough",
        "Outperformed all competitors in blind testing",
        "Free access to cutting-edge technology"
      ],
      testimonial: "This is the most impressive AI I've tested. The quality is mind-blowing and it's completely free.",
      author: "Dr. Jennifer Park, AI Researcher"
    }
  ];

  const conversionOptimizations = [
    {
      element: "Headlines",
      principle: "Curiosity + Social Proof",
      examples: [
        "The AI That Got 2.5M Votes Before Google Revealed It Was Theirs",
        "Why 100K+ Creators Switched to This Free AI Tool",
        "The Secret Behind Viral Content That Gets 10x More Engagement"
      ]
    },
    {
      element: "CTAs",
      principle: "Action-Oriented + Value",
      examples: [
        "Start Creating Viral Content (Free)",
        "Get Instant Access - No Signup Required",
        "Transform Your Content in 30 Seconds"
      ]
    },
    {
      element: "Social Proof",
      principle: "Credibility + Numbers",
      examples: [
        "#1 Ranked AI on LMArena (2.5M+ votes)",
        "Trusted by 100K+ creators worldwide",
        "Featured in TechCrunch, The Verge, VentureBeat"
      ]
    },
    {
      element: "Benefits",
      principle: "Outcome-Focused",
      examples: [
        "Perfect character consistency (industry-first)",
        "10x faster than traditional methods",
        "340% increase in engagement rates"
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
            <Target className="w-4 h-4 mr-2" />
            🎯 User Acquisition System
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Banana Nano Ai</span> Growth Funnel
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Strategic user acquisition funnel designed to convert visitors into advocates. 
            Optimized landing pages, conversion tactics, and retention strategies for exponential growth.
          </p>
        </div>

        <Tabs defaultValue="funnel" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
            <TabsTrigger value="landing">Landing Pages</TabsTrigger>
            <TabsTrigger value="optimization">A/B Testing</TabsTrigger>
            <TabsTrigger value="retention">Retention Strategy</TabsTrigger>
          </TabsList>

          {/* Conversion Funnel Tab */}
          <TabsContent value="funnel" className="space-y-8">
            <div className="grid gap-6">
              {funnelSteps.map((step, index) => (
                <Card key={step.stage} className="p-6 border border-primary/20">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-4">
                        {index + 1}
                      </div>
                      <div>
                        <Badge className="mb-2">{step.stage}</Badge>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{step.conversion}</div>
                      <div className="text-sm text-muted-foreground">Conversion Rate</div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  <div className="text-sm font-medium mb-4">Target: {step.traffic}</div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {step.tactics.map((tactic, tacticIndex) => (
                      <div key={tacticIndex} className="flex items-start text-sm">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{tactic}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Funnel Metrics */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Projected Monthly Metrics</h3>
              <div className="grid md:grid-cols-5 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">100K</div>
                  <div className="text-sm text-muted-foreground">Monthly Visitors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">25K</div>
                  <div className="text-sm text-muted-foreground">Engaged Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">10K</div>
                  <div className="text-sm text-muted-foreground">Trial Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">6K</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">2.7K</div>
                  <div className="text-sm text-muted-foreground">Advocates</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Landing Pages Tab */}
          <TabsContent value="landing" className="space-y-8">
            {landingPageVariants.map((variant, index) => (
              <Card key={index} className="p-6">
                <Badge className="mb-4">{variant.title}</Badge>
                <h3 className="text-2xl font-bold mb-2">{variant.headline}</h3>
                <p className="text-muted-foreground mb-6">{variant.subheadline}</p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-3">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {variant.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start text-sm">
                          <Star className="w-4 h-4 text-primary mr-2 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Social Proof:</h4>
                    <blockquote className="border-l-4 border-primary pl-4 italic text-sm text-muted-foreground mb-2">
                      "{variant.testimonial}"
                    </blockquote>
                    <div className="text-sm font-medium">— {variant.author}</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="banana-glow" data-testid={`cta-${index}`}>
                    {variant.cta} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* A/B Testing Optimization Tab */}
          <TabsContent value="optimization" className="space-y-8">
            {conversionOptimizations.map((optimization) => (
              <Card key={optimization.element} className="p-6">
                <h3 className="text-xl font-bold mb-2">{optimization.element}</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Principle:</strong> {optimization.principle}
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">Testing Variants:</h4>
                  {optimization.examples.map((example, index) => (
                    <div key={index} className="flex items-center p-3 bg-muted/50 rounded-lg">
                      <Badge variant="outline" className="mr-3">V{index + 1}</Badge>
                      <span className="text-sm">{example}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}

            {/* Test Implementation */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">A/B Testing Implementation</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Target className="w-4 h-4 mr-2 text-primary" />
                    Traffic Split
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Control (Original): 50%</li>
                    <li>• Variant A: 25%</li>
                    <li>• Variant B: 25%</li>
                    <li>• Minimum 1,000 visitors per variant</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-primary" />
                    Success Metrics
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Email signup rate</li>
                    <li>• Tool trial rate</li>
                    <li>• Time on page</li>
                    <li>• Social shares</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    Testing Schedule
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Test duration: 2 weeks</li>
                    <li>• Statistical significance: 95%</li>
                    <li>• Review cycle: Weekly</li>
                    <li>• Implementation: Immediate</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Retention Strategy Tab */}
          <TabsContent value="retention" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-primary" />
                  Email Nurture Sequence
                </h3>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Day 0: Welcome & Quick Start</div>
                    <div className="text-sm text-muted-foreground">Instant access + first tutorial</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Day 3: Success Stories</div>
                    <div className="text-sm text-muted-foreground">Case studies & viral examples</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Day 7: Advanced Techniques</div>
                    <div className="text-sm text-muted-foreground">Pro tips & character consistency guide</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Day 14: Community Invite</div>
                    <div className="text-sm text-muted-foreground">Join creator community & challenges</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Community Engagement
                </h3>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Weekly Challenges</div>
                    <div className="text-sm text-muted-foreground">Creative contests with prizes</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">User Showcases</div>
                    <div className="text-sm text-muted-foreground">Feature amazing user creations</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Expert Sessions</div>
                    <div className="text-sm text-muted-foreground">Live tutorials with pros</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Feedback Loops</div>
                    <div className="text-sm text-muted-foreground">Product development input</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Feedback Collection */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Continuous Improvement</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Share your experience with Banana Nano Ai:
                  </label>
                  <Textarea
                    placeholder="What do you love about Banana Nano Ai? What could we improve?"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[100px]"
                    data-testid="feedback-input"
                  />
                </div>
                <Button onClick={handleFeedbackSubmit} data-testid="submit-feedback">
                  <Gift className="w-4 h-4 mr-2" />
                  Submit Feedback
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <section className="mt-16 text-center">
          <Card className="p-12 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Experience <span className="gradient-text">Banana Nano Ai</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 100K+ creators already using the AI that outperformed DALL-E 3 and Midjourney. 
              Start creating viral content in seconds - completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Input
                placeholder="Enter your email for instant access"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="max-w-sm"
                data-testid="email-signup"
              />
              <Button size="lg" className="banana-glow" onClick={handleEmailSignup} data-testid="signup-button">
                <Zap className="w-4 h-4 mr-2" />
                Get Instant Access
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                No credit card required
              </div>
              <div className="flex items-center">
                <Sparkles className="w-4 h-4 mr-1" />
                100% free forever
              </div>
              <div className="flex items-center">
                <Trophy className="w-4 h-4 mr-1" />
                #1 ranked AI
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}