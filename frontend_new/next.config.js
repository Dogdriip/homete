module.exports = withFonts({
  reactStrictMode: true,
  images: {
    domains: ["pbs.twimg.com"],
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
});
