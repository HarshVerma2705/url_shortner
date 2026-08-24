/**
 * PM2 production configuration
 *
 * Current production architecture:
 *   Nginx -> Node/Express -> port 3000
 *
 * The frontend is built with Vite and served directly by Nginx.
 * It does NOT need a PM2 process.
 *
 * Note:
 * server.js currently listens on port 3000 directly, so PORT is
 * documented here for clarity and future refactoring.
 */
module.exports = {
  apps: [
    {
      name: "coderunner-api",
      script: "./server.js",
      cwd: "/home/ubuntu/apps/url_shortner/BACKEND",

      instances: 1,
      exec_mode: "fork",

      env: {
        NODE_ENV: "production",
        PORT: 3000
      },

      autorestart: true,
      max_restarts: 10,
      min_uptime: "10s",
      watch: false
    }
  ]
};
