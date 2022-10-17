/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
	dest: 'public',
    register: true,
    skipWaiting: true,
	disable: process.env.NODE_ENV === 'development'
});

module.exports = withPWA({
	reactStrictMode: true,
	swcMinify: true,
	async headers() {
		return [
			{
				source: '/schedule/[group]',
				headers: [
					{
						key: 'Cache-Control',
						value: 's-maxage=1, stale-while-revalidate=59'
					}
				]
			},
			{
				source: '/settings',
				headers: [
					{
						key: 'Cache-Control',
						value: 's-maxage=1, stale-while-revalidate=28799'
					}
				]
			},
			{
				source: '/setup',
				headers: [
					{
						key: 'Cache-Control',
						value: 's-maxage=1, stale-while-revalidate=28799'
					}
				]
			}
		]
	}
});
