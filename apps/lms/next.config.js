/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@o4s/api", "@o4s/auth", "@o4s/db"],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: !!process.env.CI },
  typescript: { ignoreBuildErrors: !!process.env.CI },

	i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
		localeDetection: false,
  },

	async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
};

module.exports = nextConfig

