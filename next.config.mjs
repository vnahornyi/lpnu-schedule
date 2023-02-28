/** @type {import('next').NextConfig} */
import nextPwa from 'next-pwa';

const withPWA = nextPwa({
    dest: 'public',
    register: true,
    skipWaiting: true,
    publicExcludes: ['**/*'],
    buildExcludes: [() => true],
    disable: process.env.NODE_ENV === 'development',
});

export default withPWA({
    reactStrictMode: true,
    swcMinify: true,
    webpack: config => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            net: false,
            tls: false,
            fs: false,
            child_process: false,
            perf_hooks: false,
        };

        return config;
    },
    async headers() {
        return [
            {
                source: '/schedule/[group]',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 's-maxage=1, stale-while-revalidate=59',
                    },
                ],
            },
            {
                source: '/settings',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 's-maxage=1, stale-while-revalidate=28799',
                    },
                ],
            },
            {
                source: '/setup',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 's-maxage=1, stale-while-revalidate=28799',
                    },
                ],
            },
        ];
    },
});
