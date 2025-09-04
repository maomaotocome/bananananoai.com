export function SchemaMarkup() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Banana Nano Ai",
    "applicationCategory": "MultimediaApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "operatingSystem": "Web Browser",
    "description": "Free AI-powered image editing tool with character consistency using Google's Gemini 2.5 Flash Image model",
    "url": "https://bananananoai.com",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "50000"
    },
    "creator": {
      "@type": "Organization",
      "name": "Banana Nano Ai",
      "url": "https://bananananoai.com"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}