import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { initGA, initClarity } from "@/lib/analytics";
import { initializePerformance } from "@/lib/performance";
import { usePageTracking } from "@/hooks/useAnalytics";
import { SEORedirects } from "@/components/seo-redirects";
import { SchemaMarkup } from "@/components/schema-markup";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import WhatIsNanoBanana from "@/pages/what-is-nano-banana";
import HowToUse from "@/pages/how-to-use";
import ApiDocs from "@/pages/api-docs";
import Examples from "@/pages/examples";
import Tutorials from "@/pages/tutorials";
import Blog from "@/pages/blog";
import CaseStudies from "@/pages/case-studies";
import SocialMediaKit from "@/pages/social-media-kit";
import OutreachStrategy from "@/pages/outreach-strategy";
import LandingFunnel from "@/pages/landing-funnel";
import FAQ from "@/pages/faq";
import NotFound from "@/pages/not-found";
import PosePainter from "@/pages/pose-painter";

function Router() {
  console.log("Router component is rendering");
  
  // Track page views when routes change
  usePageTracking();
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/what-is-nano-banana" component={WhatIsNanoBanana} />
          <Route path="/how-to-use" component={HowToUse} />
          <Route path="/api" component={ApiDocs} />
          <Route path="/examples" component={Examples} />
          <Route path="/tutorials" component={Tutorials} />
          <Route path="/blog" component={Blog} />
          <Route path="/case-studies" component={CaseStudies} />
          <Route path="/social-media-kit" component={SocialMediaKit} />
          <Route path="/outreach-strategy" component={OutreachStrategy} />
          <Route path="/landing-funnel" component={LandingFunnel} />
          <Route path="/faq" component={FAQ} />
          <Route path="/pose-painter" component={PosePainter} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  // Initialize Google Analytics and performance monitoring when app loads
  useEffect(() => {
    initGA();
    initClarity();
    initializePerformance();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SEORedirects />
      <SchemaMarkup />
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;