/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://nulp-schedule.vercel.app',
    generateRobotsTxt: true,
    generateIndexSitemap: false
}
