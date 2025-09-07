import { writeFileSync } from 'fs';
import { generateSitemap } from '../client/src/lib/sitemap';

const sitemap = generateSitemap();
writeFileSync('client/public/sitemap.xml', sitemap);
console.log('sitemap generated');
