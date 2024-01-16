/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://cityhunter.cz',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: ['/admin', '/admin/**'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/*',
        disallow: ['/admin', '/admin/**', '/auth/login-receiver', '/unauthorized'],
      },
    ],
  },
};
