// 动态sitemap生成器
export interface SitemapUrl {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const sitemapUrls: SitemapUrl[] = [
  {
    url: 'https://gemini-nano-banana.com/',
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 1.0
  },
  {
    url: 'https://gemini-nano-banana.com/examples',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    url: 'https://gemini-nano-banana.com/tutorials',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    url: 'https://gemini-nano-banana.com/api',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    url: 'https://gemini-nano-banana.com/what-is-nano-banana',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: 0.6
  },
  {
    url: 'https://gemini-nano-banana.com/how-to-use',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: 0.6
  }
];

export const generateSitemap = (): string => {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  
  const urls = sitemapUrls.map(item => `
  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('');
  
  const footer = '\n</urlset>';
  
  return header + urls + footer;
};