import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ExternalLink, 
  Users, 
  Target, 
  Mail, 
  MessageSquare,
  TrendingUp,
  Award,
  Globe,
  Search,
  FileText,
  Zap,
  CheckCircle,
  Copy,
  Star
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SEOHead, seoConfigs } from "@/components/seo-head";

export default function OutreachStrategy() {
  const { toast } = useToast();
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedText(id);
    toast({
      title: "Copied to clipboard!",
      description: "Email template copied successfully.",
    });
    setTimeout(() => setCopiedText(null), 2000);
  };

  const outreachTargets = [
    {
      category: "AI Tool Directories",
      priority: "High",
      targets: [
        { name: "Product Hunt", url: "producthunt.com", da: 92, traffic: "10M/month", status: "Ready" },
        { name: "Futurepedia", url: "futurepedia.io", da: 71, traffic: "2.1M/month", status: "Ready" },
        { name: "AI Tool Guru", url: "aitool.guru", da: 45, traffic: "500K/month", status: "Pending" },
        { name: "There's An AI For That", url: "theresanaiforthat.com", da: 68, traffic: "1.8M/month", status: "Ready" },
        { name: "AI Depot", url: "aidepot.co", da: 42, traffic: "300K/month", status: "Ready" }
      ]
    },
    {
      category: "Tech News & Blogs",
      priority: "High",
      targets: [
        { name: "TechCrunch", url: "techcrunch.com", da: 95, traffic: "25M/month", status: "Pitch Ready" },
        { name: "The Verge", url: "theverge.com", da: 94, traffic: "30M/month", status: "Pitch Ready" },
        { name: "VentureBeat", url: "venturebeat.com", da: 90, traffic: "8M/month", status: "Ready" },
        { name: "AI News", url: "ainews.com", da: 65, traffic: "800K/month", status: "Ready" },
        { name: "Towards Data Science", url: "towardsdatascience.com", da: 88, traffic: "15M/month", status: "Pending" }
      ]
    },
    {
      category: "Creative Communities",
      priority: "Medium", 
      targets: [
        { name: "Behance", url: "behance.net", da: 95, traffic: "50M/month", status: "Ready" },
        { name: "Dribbble", url: "dribbble.com", da: 92, traffic: "25M/month", status: "Ready" },
        { name: "DeviantArt", url: "deviantart.com", da: 91, traffic: "45M/month", status: "Pending" },
        { name: "ArtStation", url: "artstation.com", da: 85, traffic: "12M/month", status: "Ready" },
        { name: "Creative Bloq", url: "creativebloq.com", da: 82, traffic: "5M/month", status: "Ready" }
      ]
    },
    {
      category: "Reddit Communities",
      priority: "High",
      targets: [
        { name: "r/artificial", url: "reddit.com/r/artificial", da: 98, traffic: "1.2M members", status: "Active" },
        { name: "r/MachineLearning", url: "reddit.com/r/MachineLearning", da: 98, traffic: "2.8M members", status: "Active" },
        { name: "r/singularity", url: "reddit.com/r/singularity", da: 98, traffic: "800K members", status: "Ready" },
        { name: "r/deepdream", url: "reddit.com/r/deepdream", da: 98, traffic: "120K members", status: "Ready" },
        { name: "r/CreativeAI", url: "reddit.com/r/CreativeAI", da: 98, traffic: "85K members", status: "Ready" }
      ]
    }
  ];

  const emailTemplates = {
    press: {
      subject: "Exclusive: The AI That Got 2.5M Votes Before Google Revealed It Was Theirs",
      body: `Hi [Name],

I hope this email finds you well. I'm reaching out because I have an exclusive story that I think would be perfect for [Publication].

You may have seen the viral story about the mysterious AI that dominated LMArena leaderboards for weeks before Google revealed it was theirs with a cryptic 🍌🍌🍌 tweet. That AI is now publicly available as Banana Nano Ai, and the numbers are staggering:

🔥 Key Story Angles:
• 2.5M+ user votes ranking it #1 before anyone knew it was Google's
• Outperformed DALL-E 3, Midjourney, and Stable Diffusion in blind testing  
• First AI to achieve true character consistency across edits
• Completely free access to Google's cutting-edge image generation

📊 Traction Data:
• 100K+ creators using it in first month
• 2.5M+ images generated
• 98% user satisfaction rate
• Featured in 500+ viral social posts

I'd love to offer you an exclusive first look, including:
• Behind-the-scenes technical insights
• Interview opportunities with the team
• Early access to unreleased features
• Exclusive user success stories

Would you be interested in learning more? I'm happy to provide additional materials, arrange interviews, or answer any questions.

Best regards,
[Your Name]
[Contact Information]

P.S. I've attached some impressive before/after examples that show why this is generating so much buzz in the creative community.`
    },
    directory: {
      subject: "Submission: Banana Nano Ai - The Viral Google AI That Broke Twitter",
      body: `Hello,

I'd like to submit Banana Nano Ai for inclusion in your AI tools directory.

Product Overview:
Banana Nano Ai is Google's revolutionary image editing AI that achieved viral fame after getting 2.5M votes on LMArena before Google revealed it was theirs. It's the first AI to achieve perfect character consistency across edits.

Key Features:
• Perfect character consistency (industry-first)
• Lightning-fast generation (1-2 seconds)
• Professional quality results
• Natural language prompts
• 100% free access

Traction & Credibility:
• #1 on LMArena leaderboards (2.5M+ votes)
• 100K+ active users
• 2.5M+ images generated
• Google-backed technology
• 98% user satisfaction

Why Include This:
• Revolutionary technology from Google
• Proven user demand and engagement
• First-to-market character consistency
• High-quality, free alternative to paid tools

Website: https://bananananoai.com
Category: AI Image Editing
Pricing: Free

Thank you for considering Banana Nano Ai for your directory. Please let me know if you need any additional information.

Best regards,
[Your Name]`
    },
    influencer: {
      subject: "Partnership Opportunity: Banana Nano Ai - The AI That's Breaking the Internet",
      body: `Hi [Influencer Name],

I've been following your amazing content on [Platform] and love how you showcase cutting-edge AI tools to your audience. Your recent post about [specific content] was particularly impressive!

I wanted to reach out about Banana Nano Ai - the Google AI that's currently going viral across social media. Here's why I think it would be perfect for your audience:

🚀 The Story:
This is the mysterious AI that got 2.5M votes on LMArena before Google revealed it was theirs with a simple 🍌🍌🍌 tweet. It's now publicly available and absolutely free.

🎯 Perfect for Your Content:
• Perfect character consistency (your followers will love this!)
• Creates viral-worthy before/after content
• Lightning-fast results for quick tutorials
• Free tool = high engagement from followers

💡 Partnership Ideas:
• Exclusive first-look tutorial for your audience
• Before/after showcase series
• "Speed challenge" content
• Tutorial collaboration

What We Offer:
• Early access to new features
• Direct line to our team for support
• Potential monetary partnership (for larger creators)
• Co-marketing opportunities

I'd love to send you early access and some example content ideas. Would you be interested in exploring this further?

Looking forward to potentially working together!

Best,
[Your Name]
[Contact Information]`
    }
  };

  const backLinkOpportunities = [
    {
      category: "Guest Posting",
      sites: [
        { name: "Towards Data Science", da: 88, topic: "The Science Behind Perfect Character Consistency in AI" },
        { name: "AI Research Blog", da: 65, topic: "How Banana Nano Ai Achieved #1 LMArena Ranking" },
        { name: "Creative Bloq", da: 82, topic: "10 Ways AI is Revolutionizing Creative Workflows" },
        { name: "UX Planet", da: 74, topic: "Designing AI Tools That Creators Actually Want to Use" }
      ]
    },
    {
      category: "Resource Pages",
      sites: [
        { name: "Awesome AI Tools", da: 55, link: "github.com/awesome-ai-tools" },
        { name: "AI Tool Collections", da: 45, link: "Various curated lists" },
        { name: "Creative Resources", da: 60, link: "Design agency resource pages" },
        { name: "University AI Courses", da: 70, link: "Educational resource sections" }
      ]
    },
    {
      category: "Broken Link Building",
      opportunities: [
        "AI tool reviews with dead links",
        "Outdated image editing comparisons", 
        "Broken creative resource links",
        "Defunct AI demo links in articles"
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-background">
      <SEOHead {...seoConfigs.outreachStrategy} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
            <Target className="w-4 h-4 mr-2" />
            🎯 Strategic Link Building
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Banana Nano Ai</span> Outreach Strategy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive link building and outreach strategy to establish <strong>Banana Nano Ai</strong> as the leading AI image editing platform. 
            Proven templates, target lists, and growth tactics for maximum impact.
          </p>
        </div>

        <Tabs defaultValue="targets" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="targets">Target Sites</TabsTrigger>
            <TabsTrigger value="templates">Email Templates</TabsTrigger>
            <TabsTrigger value="backlinks">Backlink Strategy</TabsTrigger>
            <TabsTrigger value="tracking">Success Metrics</TabsTrigger>
          </TabsList>

          {/* Target Sites Tab */}
          <TabsContent value="targets" className="space-y-8">
            {outreachTargets.map((category) => (
              <section key={category.category}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center">
                    <Globe className="w-6 h-6 mr-3 text-primary" />
                    {category.category}
                  </h2>
                  <Badge variant={category.priority === "High" ? "default" : "secondary"}>
                    {category.priority} Priority
                  </Badge>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.targets.map((target, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{target.name}</h3>
                        <Badge 
                          variant={target.status === "Ready" ? "default" : target.status === "Active" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {target.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">DA:</span>
                          <span className="font-medium">{target.da}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Traffic:</span>
                          <span className="font-medium">{target.traffic}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">URL:</span>
                          <a href={`https://${target.url}`} target="_blank" rel="noopener noreferrer" 
                             className="text-primary hover:underline flex items-center">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full mt-3" data-testid={`contact-${index}`}>
                        <Mail className="w-3 h-3 mr-2" />
                        Contact
                      </Button>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </TabsContent>

          {/* Email Templates Tab */}
          <TabsContent value="templates" className="space-y-8">
            {Object.entries(emailTemplates).map(([type, template]) => (
              <Card key={type} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold capitalize">{type} Outreach Template</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(template.body, type)}
                    data-testid={`copy-template-${type}`}
                  >
                    {copiedText === type ? (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    ) : (
                      <Copy className="w-4 h-4 mr-2" />
                    )}
                    Copy Template
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Subject Line:</label>
                    <div className="bg-muted/50 p-3 rounded-lg mt-1 font-mono text-sm">
                      {template.subject}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email Body:</label>
                    <div className="bg-muted/50 p-4 rounded-lg mt-1 text-sm">
                      <pre className="whitespace-pre-wrap font-mono">{template.body}</pre>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Backlink Strategy Tab */}
          <TabsContent value="backlinks" className="space-y-8">
            {backLinkOpportunities.map((strategy) => (
              <section key={strategy.category}>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-primary" />
                  {strategy.category}
                </h2>
                
                {strategy.sites && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {strategy.sites.map((site, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{site.name}</h3>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium">DA {site.da}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {site.topic || site.link}
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          <Mail className="w-3 h-3 mr-2" />
                          Reach Out
                        </Button>
                      </Card>
                    ))}
                  </div>
                )}
                
                {strategy.opportunities && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {strategy.opportunities.map((opportunity, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center mb-2">
                          <Search className="w-4 h-4 mr-2 text-primary" />
                          <span className="font-medium">Opportunity</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{opportunity}</p>
                      </Card>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </TabsContent>

          {/* Success Metrics Tab */}
          <TabsContent value="tracking" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="font-bold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Traffic Metrics
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Organic traffic growth</li>
                  <li>• Referral traffic from targets</li>
                  <li>• Brand search volume</li>
                  <li>• Social media mentions</li>
                  <li>• Direct traffic increase</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  Link Metrics
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Total backlinks acquired</li>
                  <li>• Domain authority of links</li>
                  <li>• Follow vs nofollow ratio</li>
                  <li>• Anchor text diversity</li>
                  <li>• Referring domains growth</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Engagement Metrics
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Email response rates</li>
                  <li>• Successful partnerships</li>
                  <li>• Content collaboration</li>
                  <li>• Community growth</li>
                  <li>• User acquisition cost</li>
                </ul>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Monthly Targets</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">25+</div>
                  <div className="text-sm text-muted-foreground">New Backlinks</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Outreach Emails</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">Press Features</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">15%</div>
                  <div className="text-sm text-muted-foreground">Traffic Growth</div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <section className="mt-16 text-center">
          <Card className="p-12 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Execute Your Outreach Campaign?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Use these proven templates and strategies to build high-quality backlinks and establish industry authority.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="banana-glow" data-testid="start-outreach">
                <Zap className="w-4 h-4 mr-2" />
                Start Outreach Campaign
              </Button>
              <Button variant="outline" size="lg" data-testid="track-progress">
                <TrendingUp className="w-4 h-4 mr-2" />
                Track Progress
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}