const fs = require('node:fs');
const origin = (process.env.SITE_ORIGIN || 'http://127.0.0.1:4173').replace(/\/$/, '');
const routes = [
  '/', '/work/', '/thinking/', '/aigc-process/', '/about/', '/resume/', '/contact/',
  '/projects/soundscape/', '/projects/renew/', '/projects/lightmap/', '/projects/lumen/', '/projects/flow/'
];
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map(route => `  <url><loc>${origin}${route}</loc></url>`),
  '</urlset>',
  ''
].join('\n');
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;
fs.writeFileSync('sitemap.xml', xml, 'utf8');
fs.writeFileSync('robots.txt', robots, 'utf8');
console.log(`Wrote sitemap.xml and robots.txt for ${origin}`);
