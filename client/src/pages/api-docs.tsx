import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Code,
  Key,
  Zap,
  Shield,
  DollarSign,
  Copy,
  ExternalLink,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SEOHead, seoConfigs } from "@/components/seo-head";

export default function ApiDocs() {
  const { toast } = useToast();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedCode(id);
    toast({
      title: "Copied to clipboard!",
      description: "Code snippet copied successfully.",
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Simple Integration",
      description: "Easy-to-use REST API with comprehensive documentation and SDKs"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Affordable Pricing",
      description: "$0.039 per image generation with free tier available"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Ready",
      description: "Rate limiting, usage analytics, and dedicated support"
    }
  ];

  const codeExamples = {
    python: `# Install the SDK
pip install google-generativeai

import google.generativeai as genai
from PIL import Image

# Configure API
genai.configure(api_key="YOUR_API_KEY")

# Initialize model  
model = genai.GenerativeModel('gemini-2.5-flash')

# Load your image
image = Image.open("your_image.jpg")

# Edit image with prompt
response = model.generate_content([
    "Change the outfit to a red dress",
    image
])

# The response contains the edited image
print("Edit completed successfully!")`,

    javascript: `// Install the SDK
// npm install @google/generative-ai

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API
const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Function to edit image
async function editImage(imageFile, prompt) {
  try {
    // Convert file to base64
    const imageData = await fileToGenerativePart(imageFile);
    
    // Generate content with image and prompt
    const result = await model.generateContent([
      prompt,
      imageData
    ]);
    
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error editing image:", error);
  }
}

// Helper function to convert file to base64
async function fileToGenerativePart(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type
        }
      });
    };
    reader.readAsDataURL(file);
  });
}`,

    curl: `# Basic image editing request
curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Change the outfit to a red dress"
          },
          {
            "inline_data": {
              "mime_type": "image/jpeg",
              "data": "BASE64_ENCODED_IMAGE_DATA"
            }
          }
        ]
      }
    ],
    "generationConfig": {
      "temperature": 0.7,
      "maxOutputTokens": 1000
    }
  }'`,

    php: `<?php
// Install the SDK: composer require google/generative-ai

require_once 'vendor/autoload.php';

use Google\\GenerativeAI\\GenerativeAI;

// Initialize the client
$genAI = new GenerativeAI('YOUR_API_KEY');
$model = $genAI->getGenerativeModel('gemini-2.5-flash');

// Function to edit image
function editImage($imagePath, $prompt) {
    global $model;
    
    try {
        // Read and encode image
        $imageData = base64_encode(file_get_contents($imagePath));
        $mimeType = mime_content_type($imagePath);
        
        // Create request
        $response = $model->generateContent([
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt],
                        [
                            'inline_data' => [
                                'mime_type' => $mimeType,
                                'data' => $imageData
                            ]
                        ]
                    ]
                ]
            ]
        ]);
        
        return $response->text();
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
        return null;
    }
}

// Usage example
$result = editImage('path/to/image.jpg', 'Change the outfit to a red dress');
echo $result;
?>`
  };

  return (
    <div className="min-h-screen py-12">
      <SEOHead {...seoConfigs.apiDocs} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
            <Code className="w-4 h-4 mr-2" />
            API Documentation
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Build with <span className="gradient-text">Nano Banana</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Integrate Google's most advanced image editing model into your applications 
            with our simple, powerful API.
          </p>
        </div>

        {/* Features Overview */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center" data-testid={`api-feature-${index}`}>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-16">
          <Card className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Quick Start</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Get Your API Key</h3>
                      <p className="text-muted-foreground">
                        Sign up for Google AI Studio and get your free API key to start building.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Install SDK</h3>
                      <p className="text-muted-foreground">
                        Choose from our official SDKs for Python, JavaScript, PHP, and more.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Start Editing</h3>
                      <p className="text-muted-foreground">
                        Send images and prompts to transform them with AI magic!
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 mt-8">
                  <Button 
                    className="banana-glow"
                    data-testid="get-api-key-button"
                  >
                    <Key className="w-4 h-4 mr-2" />
                    Get API Key
                  </Button>
                  <Button 
                    variant="outline"
                    data-testid="view-examples-button"
                  >
                    View Examples
                  </Button>
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Basic Example</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(codeExamples.python, 'quickstart')}
                    data-testid="copy-quickstart"
                  >
                    {copiedCode === 'quickstart' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                
                <pre className="text-sm overflow-x-auto">
                  <code className="text-foreground">
{`import genai

# Configure API
genai.configure(api_key="YOUR_KEY")

# Edit image
model = genai.GenerativeModel('gemini-2.5-flash')
response = model.generate_content([
    "Change outfit to red dress",
    your_image
])

print("Done!")`}
                  </code>
                </pre>
              </div>
            </div>
          </Card>
        </section>

        {/* Code Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Code <span className="gradient-text">Examples</span>
          </h2>
          
          <Card className="p-8">
            <Tabs defaultValue="python" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="python" data-testid="tab-python">Python</TabsTrigger>
                <TabsTrigger value="javascript" data-testid="tab-javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="curl" data-testid="tab-curl">cURL</TabsTrigger>
                <TabsTrigger value="php" data-testid="tab-php">PHP</TabsTrigger>
              </TabsList>
              
              {Object.entries(codeExamples).map(([language, code]) => (
                <TabsContent key={language} value={language} className="mt-6">
                  <div className="bg-muted rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground capitalize">{language} Example</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(code, language)}
                        data-testid={`copy-${language}`}
                      >
                        {copiedCode === language ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    
                    <pre className="text-sm overflow-x-auto">
                      <code className="text-foreground">{code}</code>
                    </pre>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </Card>
        </section>

        {/* Pricing */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Simple <span className="gradient-text">Pricing</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="text-4xl mb-4">🆓</div>
              <h3 className="text-xl font-bold mb-2">Free Tier</h3>
              <div className="text-3xl font-bold text-primary mb-4">$0</div>
              <p className="text-muted-foreground mb-6">Perfect for testing and small projects</p>
              <ul className="space-y-2 text-sm text-muted-foreground text-left">
                <li>• 100 free images/month</li>
                <li>• Rate limit: 10 requests/minute</li>
                <li>• Community support</li>
                <li>• Standard image quality</li>
              </ul>
            </Card>
            
            <Card className="p-6 text-center border-primary shadow-lg">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Pay-as-you-go</h3>
              <div className="text-3xl font-bold text-primary mb-4">$0.039</div>
              <p className="text-muted-foreground mb-6">Per image generation</p>
              <ul className="space-y-2 text-sm text-muted-foreground text-left">
                <li>• Unlimited images</li>
                <li>• Higher rate limits</li>
                <li>• Email support</li>
                <li>• Premium image quality</li>
                <li>• Usage analytics</li>
              </ul>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <div className="text-3xl font-bold text-primary mb-4">Custom</div>
              <p className="text-muted-foreground mb-6">For high-volume applications</p>
              <ul className="space-y-2 text-sm text-muted-foreground text-left">
                <li>• Volume discounts</li>
                <li>• Dedicated support</li>
                <li>• SLA guarantees</li>
                <li>• Custom integrations</li>
                <li>• Priority processing</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* API Reference */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            API <span className="gradient-text">Reference</span>
          </h2>
          
          <div className="space-y-8">
            <Card className="p-8">
              <h3 className="text-xl font-bold mb-4">POST /v1/models/gemini-2.5-flash:generateContent</h3>
              <p className="text-muted-foreground mb-6">
                Generate or edit images using text prompts and optional image inputs.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3">Request Body</h4>
                  <div className="bg-muted rounded-lg p-4 text-sm font-mono">
                    <pre>{`{
  "contents": [
    {
      "parts": [
        {
          "text": "Your prompt here"
        },
        {
          "inline_data": {
            "mime_type": "image/jpeg",
            "data": "base64_encoded_image"
          }
        }
      ]
    }
  ],
  "generationConfig": {
    "temperature": 0.7,
    "maxOutputTokens": 1000
  }
}`}</pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Response</h4>
                  <div className="bg-muted rounded-lg p-4 text-sm font-mono">
                    <pre>{`{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "Image generated successfully"
          },
          {
            "inline_data": {
              "mime_type": "image/png",
              "data": "base64_encoded_result"
            }
          }
        ]
      }
    }
  ]
}`}</pre>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold mb-4">Error Handling</h3>
              <p className="text-muted-foreground mb-6">
                The API returns standard HTTP status codes and detailed error messages.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                  <div className="text-red-500 font-semibold">400</div>
                  <div>
                    <div className="font-semibold text-red-700 dark:text-red-300">Bad Request</div>
                    <div className="text-sm text-red-600 dark:text-red-400">Invalid prompt or image format</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <div className="text-orange-500 font-semibold">401</div>
                  <div>
                    <div className="font-semibold text-orange-700 dark:text-orange-300">Unauthorized</div>
                    <div className="text-sm text-orange-600 dark:text-orange-400">Invalid or missing API key</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                  <div className="text-yellow-500 font-semibold">429</div>
                  <div>
                    <div className="font-semibold text-yellow-700 dark:text-yellow-300">Rate Limited</div>
                    <div className="text-sm text-yellow-600 dark:text-yellow-400">Too many requests, please slow down</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Get Started CTA */}
        <section className="text-center bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start <span className="gradient-text">Building</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get your API key and start integrating Nano Banana into your applications today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold banana-glow"
              data-testid="get-started-api"
            >
              <Key className="w-5 h-5 mr-2" />
              Get API Key
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold"
              data-testid="view-full-docs"
            >
              View Full Documentation
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
