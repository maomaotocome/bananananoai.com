import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowRight, 
  BarChart3,
  Target,
  Zap,
  Award,
  ExternalLink,
  Download
} from "lucide-react";
import { SEOHead, seoConfigs } from "@/components/seo-head";
import { StructuredData } from "@/components/structured-data";

export default function CaseStudies() {
  const caseStudies = [
    {
      id: 1,
      company: "StyleCraft Fashion",
      industry: "E-commerce Fashion",
      challenge: "Low conversion rates on product photography",
      solution: "AI-generated lifestyle product photos using Banana Nano Ai",
      results: {
        conversionIncrease: "340%",
        engagementBoost: "280%", 
        costReduction: "75%",
        timeToMarket: "90% faster"
      },
      description: "StyleCraft Fashion, a mid-size online fashion retailer, struggled with expensive traditional product photography. By implementing Banana Nano Ai for lifestyle product shots, they achieved remarkable results in just 3 months.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      testimonial: "Banana Nano Ai completely transformed our product photography workflow. We went from spending weeks on photoshoots to generating professional lifestyle images in minutes. Our conversion rates skyrocketed!",
      author: "Sarah Chen, Marketing Director",
      featured: true,
      tags: ["E-commerce", "Fashion", "Product Photography", "ROI"],
      publishDate: "2025-08-30",
      readTime: "12 min read"
    },
    {
      id: 2,
      company: "CreativeFlow Agency",
      industry: "Digital Marketing",
      challenge: "Scaling personalized content for 200+ clients",
      solution: "Automated social media content creation with character consistency",
      results: {
        clientCapacity: "300% increase",
        contentOutput: "500% more",
        clientSatisfaction: "98%",
        profitMargin: "180% growth"
      },
      description: "A boutique creative agency used Banana Nano Ai to scale their personalized content creation, enabling them to serve 3x more clients with the same team size.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      testimonial: "The character consistency feature is a game-changer. We can create months of personalized content for influencers while maintaining their exact look and brand identity.",
      author: "Marcus Rodriguez, Creative Director",
      featured: true,
      tags: ["Agency", "Social Media", "Character Consistency", "Scaling"],
      publishDate: "2025-08-28",
      readTime: "10 min read"
    },
    {
      id: 3,
      company: "TechStart Solutions",
      industry: "B2B SaaS",
      challenge: "Generic stock photos hurt brand credibility",
      solution: "Custom branded imagery and professional headshots",
      results: {
        brandRecognition: "250% increase",
        leadQuality: "180% improvement",
        websiteTime: "320% longer",
        salesCycle: "40% shorter"
      },
      description: "A B2B SaaS startup replaced all stock photography with custom AI-generated branded imagery, dramatically improving their professional appearance and conversion metrics.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
      testimonial: "Prospects kept telling us our marketing looked 'more professional' after we switched to Banana Nano Ai. Our sales team noticed immediate improvements in lead quality.",
      author: "Jennifer Park, VP Marketing",
      featured: false,
      tags: ["B2B", "SaaS", "Brand Identity", "Lead Generation"],
      publishDate: "2025-08-26",
      readTime: "8 min read"
    },
    {
      id: 4,
      company: "Urban Fitness Studios",
      industry: "Health & Fitness",
      challenge: "Expensive gym photography and member engagement",
      solution: "Personalized fitness journey visualizations",
      results: {
        memberRetention: "85% improvement",
        socialSharing: "400% increase",
        referrals: "220% growth",
        membershipUpgrades: "160% boost"
      },
      description: "A fitness studio chain used Banana Nano Ai to create personalized before/after visualizations and transformation goals, dramatically improving member engagement and retention.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      testimonial: "Members love seeing their potential transformation visualized. It's incredibly motivating and has become our best retention and upselling tool.",
      author: "David Thompson, Franchise Owner",
      featured: false,
      tags: ["Fitness", "Member Retention", "Personalization", "Motivation"],
      publishDate: "2025-08-24",
      readTime: "9 min read"
    }
  ];

  const metrics = [
    { label: "Average ROI Increase", value: "240%", icon: <TrendingUp className="w-6 h-6" /> },
    { label: "Client Success Rate", value: "96%", icon: <Target className="w-6 h-6" /> },
    { label: "Time Savings", value: "80%", icon: <Zap className="w-6 h-6" /> },
    { label: "Businesses Served", value: "2,500+", icon: <Users className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen py-12 bg-background">
      <SEOHead {...seoConfigs.caseStudies} />
      
      {/* Case Studies structured data */}
      <StructuredData 
        type="CollectionPage"
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Banana Nano Ai Case Studies",
          "description": "Real success stories and ROI data from businesses using Banana Nano Ai for image editing",
          "url": "https://bananananoai.com/case-studies",
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": caseStudies.length,
            "itemListElement": caseStudies.map((study, index) => ({
              "@type": "Article",
              "position": index + 1,
              "name": study.company + " Case Study",
              "description": study.description,
              "author": {
                "@type": "Organization",
                "name": "Banana Nano Ai"
              }
            }))
          }
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
            <Award className="w-4 h-4 mr-2" />
            🏆 Real Business Success Stories
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Banana Nano Ai</span> Case Studies
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover how businesses across industries are using <strong>Banana Nano Ai</strong> to achieve remarkable results. 
            From e-commerce to agencies, see the real impact of AI-powered image editing on revenue, efficiency, and growth.
          </p>
        </div>

        {/* Success Metrics */}
        <section className="mb-16">
          <div className="grid md:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <Card key={index} className="p-6 text-center border border-primary/20">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 text-primary">
                  {metric.icon}
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                <div className="text-muted-foreground">{metric.label}</div>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Case Studies */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-primary" />
            Featured Success Stories
          </h2>
          
          {caseStudies.filter(study => study.featured).map((study, index) => (
            <Card key={study.id} className={`mb-12 overflow-hidden border border-primary/20 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <img 
                    src={study.image} 
                    alt={study.company}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                    <Badge variant="outline">{study.industry}</Badge>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">{study.company}</h3>
                  <p className="text-muted-foreground mb-6">{study.description}</p>
                  
                  {/* Results Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {Object.entries(study.results).map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Testimonial */}
                  <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-4">
                    "{study.testimonial}"
                  </blockquote>
                  <div className="text-sm font-medium">{study.author}</div>
                  
                  <Button className="mt-6" data-testid={`read-case-study-${study.id}`}>
                    Read Full Case Study <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </section>

        {/* All Case Studies Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">All Case Studies</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <Card key={study.id} className="group hover:shadow-lg transition-all duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={study.image} 
                    alt={study.company}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {study.featured && (
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">{study.industry}</Badge>
                    <div className="text-muted-foreground text-xs">{study.readTime}</div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {study.company}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {study.description}
                  </p>
                  
                  {/* Key Results */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {Object.entries(study.results).slice(0, 2).map(([key, value]) => (
                      <div key={key} className="text-center p-2 bg-muted/30 rounded text-xs">
                        <div className="font-bold text-primary">{value}</div>
                        <div className="text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {study.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button variant="ghost" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                    Read Case Study <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="p-12 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 2,500+ businesses already using <strong>Banana Nano Ai</strong> to transform their visual content and achieve outstanding results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="banana-glow" data-testid="start-free-trial">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" data-testid="request-demo">
                Request Demo <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}