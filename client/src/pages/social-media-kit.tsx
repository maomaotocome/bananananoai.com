import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  Copy, 
  Share2, 
  Image, 
  Video, 
  FileText,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  CheckCircle,
  Sparkles,
  Zap,
  Users
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function SocialMediaKit() {
  const { toast } = useToast();
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedText(id);
    toast({
      title: "Copied to clipboard!",
      description: "Content copied successfully.",
    });
    setTimeout(() => setCopiedText(null), 2000);
  };

  const socialPlatforms = [
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      specs: "1080x1080 (Square), 1080x1350 (Portrait)",
      formats: ["JPG", "PNG"],
      hashtags: "#BananaNanoAi #AIImageEditor #CreativeAI #InstagramEdit #ViralContent #AIArt #PhotoEdit #CreatorTool #TechInnovation #DigitalArt"
    },
    {
      name: "Twitter/X", 
      icon: <Twitter className="w-5 h-5" />,
      color: "bg-black",
      specs: "1200x675 (Landscape), 1200x1200 (Square)",
      formats: ["JPG", "PNG", "GIF"],
      hashtags: "#BananaNanoAi #AIImageEditor #TechBreakthrough #AIRevolution #CreativeAI #Innovation #StartupLife #TechNews #AIArt #DigitalTransformation"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      color: "bg-blue-600",
      specs: "1200x628 (Single), 1080x1080 (Carousel)",
      formats: ["JPG", "PNG"],
      hashtags: "#BananaNanoAi #AIInnovation #BusinessTech #DigitalTransformation #CreativeTech #StartupSuccess #TechLeadership #AIAdoption #FutureOfWork #TechTrends"
    },
    {
      name: "TikTok",
      icon: <Video className="w-5 h-5" />,
      color: "bg-gradient-to-r from-pink-500 to-red-500",
      specs: "1080x1920 (Vertical Video)",
      formats: ["MP4", "MOV"],
      hashtags: "#BananaNanoAi #AIEditor #TechTok #CreativeAI #ViralEdit #AImagic #TechTrend #CreatorHack #AIArt #TechReview"
    },
    {
      name: "YouTube",
      icon: <Youtube className="w-5 h-5" />,
      color: "bg-red-600",
      specs: "1280x720 (Thumbnail), 1920x1080 (Cover)",
      formats: ["JPG", "PNG"],
      hashtags: "#BananaNanoAi #AIImageEditor #TechReview #CreativeAI #AITutorial #TechChannel #AIInnovation #CreatorTool #DigitalArt #AIRevolution"
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      color: "bg-blue-500",
      specs: "1200x630 (Link), 1080x1080 (Post)",
      formats: ["JPG", "PNG"],
      hashtags: "#BananaNanoAi #AIImageEditor #CreativeAI #TechInnovation #DigitalArt #PhotoEditing #AITechnology #CreativeTool #ArtificialIntelligence #TechNews"
    }
  ];

  const contentTemplates = {
    announcement: [
      {
        id: "launch",
        title: "Product Launch Announcement",
        text: "🚀 Introducing Banana Nano Ai - The AI that broke the internet!\n\n✨ Perfect character consistency\n⚡ Lightning-fast generation\n🎨 Professional quality results\n🆓 100% Free to use\n\nJoin the AI revolution that got 2.5M votes before Google revealed it was theirs!\n\n#BananaNanoAi #AIRevolution",
        platforms: ["Twitter", "LinkedIn", "Facebook"]
      },
      {
        id: "milestone",
        title: "User Milestone Celebration", 
        text: "🎉 INCREDIBLE! We just hit 100K+ creators using Banana Nano Ai!\n\nThank you to our amazing community for:\n🌟 2.5M+ images generated\n💫 500K+ viral posts created\n🚀 98% satisfaction rate\n\nThe future of creative AI is here, and you're part of it!\n\n#BananaNanoAi #Community #AICreators",
        platforms: ["Instagram", "Twitter", "LinkedIn"]
      }
    ],
    tutorials: [
      {
        id: "quick-tip",
        title: "Quick Tutorial Post",
        text: "💡 PRO TIP: Get perfect character consistency with Banana Nano Ai\n\n1️⃣ Upload your photo\n2️⃣ Use specific descriptors: 'Change [item] while keeping the person identical'\n3️⃣ Watch the magic happen!\n\n✨ Perfect for influencers, brands, and creators\n\nTry it free: [link]\n\n#BananaNanoAi #CreatorTips",
        platforms: ["Instagram", "TikTok", "Twitter"]
      },
      {
        id: "comparison",
        title: "Before/After Showcase",
        text: "🤯 MIND = BLOWN! Check out this transformation with Banana Nano Ai\n\n⬅️ Original casual photo\n➡️ Professional business portrait\n\n🎯 Same person, perfect consistency\n⚡ Generated in under 30 seconds\n💰 $0 cost vs $500+ photoshoot\n\n#BananaNanoAi #AITransformation #CreativeAI",
        platforms: ["Instagram", "Facebook", "LinkedIn"]
      }
    ],
    engagement: [
      {
        id: "challenge",
        title: "User Challenge",
        text: "🏆 BANANA NANO AI CHALLENGE!\n\nShow us your most creative transformation:\n\n1️⃣ Use Banana Nano Ai to create something amazing\n2️⃣ Post with #BananaNanoAiChallenge\n3️⃣ Tag 3 friends to try it\n\n🎁 Best submissions win exclusive features!\n\nReady to blow minds? Let's see what you create!\n\n#BananaNanoAiChallenge",
        platforms: ["Instagram", "TikTok", "Twitter"]
      },
      {
        id: "poll",
        title: "Community Poll",
        text: "🤔 Which Banana Nano Ai feature amazes you most?\n\nA) Perfect character consistency\nB) Lightning-fast generation  \nC) Professional quality results\nD) It's completely FREE!\n\nVote below! 👇 We love hearing from our community!\n\n#BananaNanoAi #CommunityVoice #AIInnovation",
        platforms: ["Twitter", "LinkedIn", "Instagram"]
      }
    ]
  };

  const visualAssets = [
    {
      category: "Logo & Branding",
      items: [
        { name: "Primary Logo (PNG)", size: "512x512", format: "PNG" },
        { name: "Logo Mark Only", size: "256x256", format: "PNG" },
        { name: "Horizontal Logo", size: "800x200", format: "PNG" },
        { name: "White Logo Version", size: "512x512", format: "PNG" }
      ]
    },
    {
      category: "Social Media Templates",
      items: [
        { name: "Instagram Post Template", size: "1080x1080", format: "PSD/PNG" },
        { name: "Instagram Story Template", size: "1080x1920", format: "PSD/PNG" },
        { name: "Twitter Header", size: "1500x500", format: "PNG" },
        { name: "LinkedIn Banner", size: "1584x396", format: "PNG" },
        { name: "YouTube Thumbnail", size: "1280x720", format: "PNG" },
        { name: "Facebook Cover", size: "820x312", format: "PNG" }
      ]
    },
    {
      category: "Demo Content",
      items: [
        { name: "Before/After Examples", size: "Various", format: "JPG" },
        { name: "Feature Screenshots", size: "1920x1080", format: "PNG" },
        { name: "User Interface Previews", size: "1440x900", format: "PNG" },
        { name: "Product Showcase", size: "Various", format: "JPG/PNG" }
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
            <Share2 className="w-4 h-4 mr-2" />
            🚀 Complete Marketing Toolkit
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Banana Nano Ai</span> Social Media Kit
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Everything you need to promote <strong>Banana Nano Ai</strong> across all social platforms. 
            Ready-to-use content, visual assets, and proven strategies that drive engagement and conversions.
          </p>
        </div>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content">Content Templates</TabsTrigger>
            <TabsTrigger value="platforms">Platform Specs</TabsTrigger>
            <TabsTrigger value="assets">Visual Assets</TabsTrigger>
            <TabsTrigger value="strategies">Growth Strategies</TabsTrigger>
          </TabsList>

          {/* Content Templates Tab */}
          <TabsContent value="content" className="space-y-8">
            <div className="grid gap-8">
              {Object.entries(contentTemplates).map(([category, templates]) => (
                <section key={category}>
                  <h2 className="text-2xl font-bold mb-6 capitalize flex items-center">
                    <Sparkles className="w-6 h-6 mr-3 text-primary" />
                    {category} Content
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {templates.map((template) => (
                      <Card key={template.id} className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">{template.title}</h3>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(template.text, template.id)}
                            data-testid={`copy-${template.id}`}
                          >
                            {copiedText === template.id ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg mb-4 text-sm">
                          <pre className="whitespace-pre-wrap font-mono">{template.text}</pre>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {template.platforms.map((platform) => (
                            <Badge key={platform} variant="secondary" className="text-xs">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </TabsContent>

          {/* Platform Specifications Tab */}
          <TabsContent value="platforms" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {socialPlatforms.map((platform) => (
                <Card key={platform.name} className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-2 rounded-lg text-white mr-3 ${platform.color}`}>
                      {platform.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{platform.name}</h3>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Image Specs</div>
                      <div className="text-sm">{platform.specs}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Formats</div>
                      <div className="flex gap-1">
                        {platform.formats.map((format) => (
                          <Badge key={format} variant="outline" className="text-xs">
                            {format}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Recommended Hashtags</div>
                    <div className="bg-muted/50 p-3 rounded-lg text-xs">
                      {platform.hashtags}
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => copyToClipboard(platform.hashtags, `hashtags-${platform.name}`)}
                    data-testid={`copy-hashtags-${platform.name.toLowerCase()}`}
                  >
                    {copiedText === `hashtags-${platform.name}` ? (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    ) : (
                      <Copy className="w-4 h-4 mr-2" />
                    )}
                    Copy Hashtags
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Visual Assets Tab */}
          <TabsContent value="assets" className="space-y-8">
            {visualAssets.map((category) => (
              <section key={category.category}>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Image className="w-6 h-6 mr-3 text-primary" />
                  {category.category}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((item, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold">{item.name}</h3>
                        <Button variant="outline" size="sm" data-testid={`download-${index}`}>
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground mb-1">
                        Size: {item.size}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Format: {item.format}
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </TabsContent>

          {/* Growth Strategies Tab */}
          <TabsContent value="strategies" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Viral Content Strategy
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Before/After Posts:</strong> Show dramatic transformations to capture attention and demonstrate value</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Speed Challenges:</strong> Create content showing "30-second transformations" to emphasize efficiency</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Character Consistency:</strong> Highlight the unique selling point that competitors can't match</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Creator Stories:</strong> Share success stories from real users to build social proof</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Trending Moments:</strong> Jump on viral trends and show how Banana Nano Ai enhances them</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Community Building
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>User Challenges:</strong> Weekly creative challenges with #BananaNanoAiChallenge hashtag</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Feature Requests:</strong> Engage community in product development decisions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Tutorial Contests:</strong> Encourage users to create and share tutorials</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Creator Spotlights:</strong> Feature amazing user-generated content regularly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Live Sessions:</strong> Host live Q&A and demo sessions on platforms like Instagram Live</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 lg:col-span-2">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Influencer Collaboration Framework
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">Micro-Influencers (1K-100K)</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Free access + feature credits</li>
                      <li>• Custom tutorial content</li>
                      <li>• Community showcase spots</li>
                      <li>• Early access to new features</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">Mid-Tier (100K-1M)</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Monetary compensation</li>
                      <li>• Exclusive feature previews</li>
                      <li>• Co-created content series</li>
                      <li>• Product development input</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">Mega-Influencers (1M+)</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Custom partnership deals</li>
                      <li>• Branded feature launches</li>
                      <li>• Event collaboration</li>
                      <li>• Long-term brand ambassador</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <section className="mt-16 text-center">
          <Card className="p-12 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Amplify Your Reach?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Use these proven templates and strategies to grow your audience and drive engagement across all social platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="banana-glow" data-testid="download-full-kit">
                <Download className="w-4 h-4 mr-2" />
                Download Complete Kit
              </Button>
              <Button variant="outline" size="lg" data-testid="join-community">
                <Users className="w-4 h-4 mr-2" />
                Join Creator Community
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}