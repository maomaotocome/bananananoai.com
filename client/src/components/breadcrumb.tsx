import { ChevronRight, Home } from "lucide-react";
import { Link } from "wouter";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="py-3 px-4 sm:px-6 lg:px-8 bg-background/50"
      data-testid="breadcrumb-nav"
    >
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground max-w-7xl mx-auto">
        <li className="flex items-center">
          <Link
            href="/"
            className="hover:text-foreground transition-colors flex items-center"
            data-testid="breadcrumb-home"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.href} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-2" />
              {isLast ? (
                <span
                  className="text-foreground font-medium"
                  aria-current="page"
                  data-testid={`breadcrumb-current`}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                  data-testid={`breadcrumb-${index}`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
