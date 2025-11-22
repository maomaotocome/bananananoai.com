import { useEffect } from "react";

export interface BreadcrumbSchemaItem {
  position: number;
  name: string;
  item: string; // Full URL
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbSchemaItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  useEffect(() => {
    // Remove any existing breadcrumb schema
    const existingSchema = document.querySelector('script[data-breadcrumb-schema]');
    if (existingSchema) {
      existingSchema.remove();
    }

    // Create new breadcrumb schema
    const breadcrumbListSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map(item => ({
        "@type": "ListItem",
        "position": item.position,
        "name": item.name,
        "item": item.item
      }))
    };

    // Add to document head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-breadcrumb-schema', 'true');
    script.textContent = JSON.stringify(breadcrumbListSchema);
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const schemaToRemove = document.querySelector('script[data-breadcrumb-schema]');
      if (schemaToRemove) {
        schemaToRemove.remove();
      }
    };
  }, [items]);

  // This component doesn't render anything visible
  return null;
}
