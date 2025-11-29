/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.utilitygenai.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  // exclude: ['/admin/*'], 
}

