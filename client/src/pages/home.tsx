import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * DEPRECATED: This old Home component has been replaced by NanoBananaPro.
 * This file now only serves as a redirect to avoid SEO conflicts.
 * The old home page content is now at /nano-banana-pro
 */
export default function Home() {
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    // Immediately redirect to the new Nano Banana Pro homepage
    setLocation("/nano-banana-pro");
  }, [setLocation]);
  
  // Minimal render while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Redirecting to Nano Banana Pro...</p>
    </div>
  );
}
