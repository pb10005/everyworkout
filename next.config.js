const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
});

module.exports = {
    output: "export",
    distDir: "dist",
    reactStrictMode: true,
};

// module.exports = withPWA({
//     output: "export",
//     distDir: "dist",
//     reactStrictMode: true,
// });
