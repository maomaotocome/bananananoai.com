import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { initGA, initClarity } from "@/lib/analytics";
import { usePageTracking } from "@/hooks/useAnalytics";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import WhatIsNanoBanana from "@/pages/what-is-nano-banana";
import HowToUse from "@/pages/how-to-use";
import ApiDocs from "@/pages/api-docs";
import Examples from "@/pages/examples";
import Tutorials from "@/pages/tutorials";
import NotFound from "@/pages/not-found";

function Router() {
  console.log("Router component is rendering");
  
  // 初始化页面追踪
  usePageTracking();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/what-is-nano-banana" component={WhatIsNanoBanana} />
          <Route path="/how-to-use" component={HowToUse} />
          <Route path="/api" component={ApiDocs} />
          <Route path="/examples" component={Examples} />
          <Route path="/tutorials" component={Tutorials} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  // 初始化分析工具
  useEffect(() => {
    initGA();
    initClarity();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
