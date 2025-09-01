import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, TrendingUp, Lightbulb, Target, ArrowRight, Copy, RefreshCw } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';

interface OptimizationSuggestion {
  originalPrompt: string;
  optimizedPrompt: string;
  improvements: string[];
  confidence: number;
  expectedEngagement: number;
  trendingElements: string[];
}

interface TrendingPattern {
  id: string;
  pattern: string;
  category: string;
  popularity: number;
  successRate: number;
  examples: string[];
  lastUpdated: string;
}

interface PromptOptimizerProps {
  currentPrompt: string;
  onPromptUpdate: (newPrompt: string) => void;
}

export function PromptOptimizer({ currentPrompt, onPromptUpdate }: PromptOptimizerProps) {
  const [selectedPrompt, setSelectedPrompt] = useState(currentPrompt);
  const [optimization, setOptimization] = useState<OptimizationSuggestion | null>(null);
  const { toast } = useToast();

  // Fetch trending patterns
  const { data: trendingPatterns = [] } = useQuery<TrendingPattern[]>({
    queryKey: ['/api/trending-patterns'],
  });

  // Optimize prompt mutation
  const optimizePromptMutation = useMutation({
    mutationFn: async (prompt: string) => {
      const response = await fetch('/api/optimize-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) throw new Error('Failed to optimize prompt');
      return response.json();
    },
    onSuccess: (data) => {
      setOptimization(data);
      toast({
        title: "Prompt Optimized!",
        description: `Confidence: ${data.confidence}% | Expected engagement: ${data.expectedEngagement}%`,
      });
    },
    onError: () => {
      toast({
        title: "Optimization Failed",
        description: "Unable to optimize prompt at this time",
        variant: "destructive",
      });
    },
  });

  // Generate suggestions mutation
  const generateSuggestionsMutation = useMutation({
    mutationFn: async (basePrompt: string) => {
      const response = await fetch('/api/generate-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ basePrompt, count: 4 }),
      });
      if (!response.ok) throw new Error('Failed to generate suggestions');
      return response.json();
    },
  });

  useEffect(() => {
    setSelectedPrompt(currentPrompt);
  }, [currentPrompt]);

  const handleOptimize = () => {
    if (selectedPrompt.trim()) {
      optimizePromptMutation.mutate(selectedPrompt.trim());
    }
  };

  const handleGenerateSuggestions = () => {
    if (selectedPrompt.trim()) {
      generateSuggestionsMutation.mutate(selectedPrompt.trim());
    }
  };

  const handleUseOptimizedPrompt = () => {
    if (optimization?.optimizedPrompt) {
      setSelectedPrompt(optimization.optimizedPrompt);
      onPromptUpdate(optimization.optimizedPrompt);
      toast({
        title: "Prompt Updated!",
        description: "Using the optimized version",
      });
    }
  };

  const handleUseSuggestion = (suggestion: string) => {
    setSelectedPrompt(suggestion);
    onPromptUpdate(suggestion);
    toast({
      title: "Suggestion Applied!",
      description: "Prompt updated with viral-worthy suggestion",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard",
    });
  };

  return (
    <div className="space-y-6" data-testid="prompt-optimizer">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            AI Prompt Optimizer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={selectedPrompt}
            onChange={(e) => setSelectedPrompt(e.target.value)}
            placeholder="Enter your image editing prompt here..."
            className="min-h-[100px]"
            data-testid="prompt-input"
          />
          
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={handleOptimize}
              disabled={optimizePromptMutation.isPending || !selectedPrompt.trim()}
              data-testid="optimize-button"
            >
              {optimizePromptMutation.isPending ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Target className="h-4 w-4 mr-2" />
              )}
              Optimize for Viral Content
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleGenerateSuggestions}
              disabled={generateSuggestionsMutation.isPending || !selectedPrompt.trim()}
              data-testid="suggestions-button"
            >
              {generateSuggestionsMutation.isPending ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Lightbulb className="h-4 w-4 mr-2" />
              )}
              Get Smart Suggestions
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="optimization" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="optimization" data-testid="tab-optimization">Optimization</TabsTrigger>
          <TabsTrigger value="suggestions" data-testid="tab-suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="trending" data-testid="tab-trending">Trending</TabsTrigger>
        </TabsList>

        <TabsContent value="optimization" className="space-y-4">
          {optimization && (
            <Card data-testid="optimization-results">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Optimized Prompt</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {optimization.confidence}% confidence
                    </Badge>
                    <Badge variant="outline">
                      {optimization.expectedEngagement}% engagement
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Textarea
                    value={optimization.optimizedPrompt}
                    readOnly
                    className="min-h-[80px] pr-10"
                    data-testid="optimized-prompt"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(optimization.optimizedPrompt)}
                    data-testid="copy-optimized"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Performance Metrics
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Confidence Score</span>
                        <span>{optimization.confidence}%</span>
                      </div>
                      <Progress value={optimization.confidence} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Expected Engagement</span>
                        <span>{optimization.expectedEngagement}%</span>
                      </div>
                      <Progress value={optimization.expectedEngagement} className="h-2" />
                    </div>
                  </div>
                </div>

                {optimization.improvements.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Key Improvements</h4>
                    <ul className="space-y-1">
                      {optimization.improvements.map((improvement, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <ArrowRight className="h-3 w-3 mt-1 text-green-500 flex-shrink-0" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {optimization.trendingElements.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Trending Elements Added</h4>
                    <div className="flex flex-wrap gap-1">
                      {optimization.trendingElements.map((element, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {element}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Button onClick={handleUseOptimizedPrompt} className="w-full" data-testid="use-optimized">
                  Use This Optimized Prompt
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          {generateSuggestionsMutation.data?.suggestions && (
            <div className="space-y-3" data-testid="suggestions-list">
              {generateSuggestionsMutation.data.suggestions.map((suggestion: string, index: number) => (
                <Card key={index} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm flex-1">{suggestion}</p>
                      <Button
                        size="sm"
                        onClick={() => handleUseSuggestion(suggestion)}
                        data-testid={`use-suggestion-${index}`}
                      >
                        Use This
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <div className="grid gap-4" data-testid="trending-patterns">
            {trendingPatterns.slice(0, 6).map((pattern) => (
              <Card key={pattern.id}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="capitalize">
                          {pattern.category}
                        </Badge>
                        <Badge variant="secondary">
                          {pattern.popularity}% popular
                        </Badge>
                        <Badge variant="default">
                          {pattern.successRate}% success
                        </Badge>
                      </div>
                      <p className="font-medium mb-2">{pattern.pattern}</p>
                      <p className="text-xs text-muted-foreground">
                        Example: {pattern.examples[0]}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}