/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://lpnu-schedule.vercel.app',
    generateRobotsTxt: true,
    generateIndexSitemap: false
}
