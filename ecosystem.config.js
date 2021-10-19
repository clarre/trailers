module.exports = {
  apps: [
    {
      name: "trailer_application",
      script: "./dist/index.js",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
}
