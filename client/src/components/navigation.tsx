import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = [
    { name: "Features", href: "/#features" },
    { name: "Examples", href: "/examples" },
    { name: "Tutorials", href: "/tutorials" },
    { name: "API", href: "/api" },
    { name: "What is Nano Banana", href: "/what-is-nano-banana" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3" data-testid="logo-link">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-xl">
              🍌
            </div>
            <h1 className="text-xl font-bold gradient-text" style={{ color: 'hsl(var(--foreground))' }}>Nano Banana AI</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:block"
              data-testid="button-signin"
            >
              Sign In
            </Button>
            <Button
              className="banana-glow"
              data-testid="button-try-free"
            >
              🍌 Try Free
            </Button>

            {/* Mobile menu button */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setMobileOpen(false)}
                      data-testid={`mobile-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-border">
                    <Button variant="ghost" className="w-full mb-2" data-testid="mobile-button-signin">
                      Sign In
                    </Button>
                    <Button className="w-full banana-glow" data-testid="mobile-button-try-free">
                      🍌 Try Free
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
