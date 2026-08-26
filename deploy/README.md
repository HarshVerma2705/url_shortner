# Deployment Guide

This directory contains deployment configuration and operational documentation for the CodeRunner URL Shortener production environment.

## Production Architecture

```text
Browser
   |
   | HTTPS
   v
Nginx
   |
   +-- /api/* -------> Express / Node :3000
   |
   +-- /<shortcode> -> Express / Node :3000
   |
   +-- / ------------> React production build
                        /var/www/coderunner
```

The React frontend is built with Vite and served directly by Nginx.

PM2 is used only to keep the Node.js/Express backend running.

MongoDB is hosted separately using MongoDB Atlas.

---

## Files

```text
deploy/
├── ecosystem.config.cjs
├── nginx.conf
└── README.md
```

### `ecosystem.config.cjs`

PM2 ecosystem configuration for the production backend.

### `nginx.conf`

Nginx deployment template for the application.

This is a template and should not be copied blindly over an existing production configuration, especially when Certbot-managed HTTPS is enabled.

### `README.md`

Deployment and operational documentation.

---

# Prerequisites

The production server requires:

- AWS EC2
- Ubuntu
- Node.js and npm
- Git
- Nginx
- PM2
- Certbot
- MongoDB Atlas connection
- Configured domain name

---

# Environment Variables

Production environment variables must remain on the EC2 server and must not be committed to Git.

Backend environment file:

```text
BACKEND/.env
```

Example:

```env
NODE_ENV=production
PORT=3000
MONGO_URI=<production-mongodb-uri>
JWT_SECRET=<production-jwt-secret>
FRONTEND_URL=https://coderunner.me
APP_URL=https://coderunner.me
```

Use `BACKEND/.env.example` as the template.

---

# PM2

The production backend process is:

```text
coderunner-api
```

The backend runs from:

```text
/home/ubuntu/apps/url_shortner/BACKEND
```

## Check the current process

Before changing PM2:

```bash
pm2 status
```

Inspect the process:

```bash
pm2 show coderunner-api
```

Check logs:

```bash
pm2 logs coderunner-api --lines 50
```

## Start using the ecosystem configuration

If the process does not already exist:

```bash
cd ~/apps/url_shortner
pm2 start deploy/ecosystem.config.cjs
```

Save the process list:

```bash
pm2 save
```

Verify:

```bash
pm2 status
```

### Important

Do not run this as part of a normal deployment:

```bash
pm2 delete coderunner-api
```

If `coderunner-api` is already running correctly, restart it instead:

```bash
pm2 restart coderunner-api --update-env
```

Deleting the process is only necessary when intentionally replacing or recreating the PM2 process definition.

---

# Backend Deployment

After pushing backend changes to GitHub:

```bash
cd ~/apps/url_shortner
git pull origin main
```

Install dependencies:

```bash
cd BACKEND
npm ci
```

Restart the backend:

```bash
pm2 restart coderunner-api --update-env
```

Check the process:

```bash
pm2 status
```

Check logs:

```bash
pm2 logs coderunner-api --lines 50
```

---

# Frontend Deployment

After pulling the latest frontend changes:

```bash
cd ~/apps/url_shortner
git pull origin main
```

Build the React application:

```bash
cd FRONTEND
npm ci
npm run build
```

Deploy the generated build:

```bash
sudo rm -rf /var/www/coderunner/*
sudo cp -r dist/* /var/www/coderunner/
```

Nginx serves the production files from:

```text
/var/www/coderunner
```

A normal frontend update does not require restarting PM2 or Nginx.

If the browser shows an older version, perform a hard refresh:

```text
Ctrl + Shift + R
```

---

# Nginx

The repository contains:

```text
deploy/nginx.conf
```

This file is a deployment template.

The live Nginx configuration is maintained on the EC2 server under:

```text
/etc/nginx/
```

Typical application configuration:

```text
/etc/nginx/sites-available/coderunner
/etc/nginx/sites-enabled/coderunner
```

The production backend currently uses:

```text
127.0.0.1:3000
```

## Validate Nginx configuration

Always test the configuration before reloading:

```bash
sudo nginx -t
```

If the test succeeds:

```bash
sudo systemctl reload nginx
```

Inspect the complete active configuration:

```bash
sudo nginx -T
```

Check Nginx status:

```bash
sudo systemctl status nginx
```

Check recent Nginx errors:

```bash
sudo tail -n 50 /var/log/nginx/error.log
```

---

# SSL / HTTPS

Production HTTPS is provided by:

```text
Let's Encrypt
+
Certbot
+
Nginx
```

The certificate is managed on the EC2 server.

Do not commit:

```text
/etc/letsencrypt/
```

or any private certificate/key files to Git.

Do not remove Certbot-managed certificate directives from the active Nginx configuration.

Check installed certificates:

```bash
sudo certbot certificates
```

Test certificate renewal:

```bash
sudo certbot renew --dry-run
```

---

# Health Checks

## Check the backend directly

```bash
curl -i http://127.0.0.1:3000/health
```

## Check through Nginx and HTTPS

```bash
curl -i https://coderunner.me/health
```

A protected endpoint returning:

```text
401 Unauthorized
```

can still indicate that the Nginx → Express path is working correctly.

For example:

```bash
curl -i https://coderunner.me/api/user/urls
```

may return `401` when no authentication cookie is supplied.

---

# Test a Short URL

Test an existing short code:

```bash
curl -i https://coderunner.me/<shortcode>
```

For example:

```bash
curl -i https://coderunner.me/abc123
```

A successful redirect should normally return:

```text
HTTP/1.1 301
```

or:

```text
HTTP/1.1 302
```

with a:

```text
Location: <original-url>
```

header.

---

# Production Update Workflow

## Backend changes

```bash
cd ~/apps/url_shortner

git pull origin main

cd BACKEND
npm ci

pm2 restart coderunner-api --update-env
```

Verify:

```bash
pm2 status
pm2 logs coderunner-api --lines 30
```

## Frontend changes

```bash
cd ~/apps/url_shortner

git pull origin main

cd FRONTEND
npm ci
npm run build

sudo rm -rf /var/www/coderunner/*
sudo cp -r dist/* /var/www/coderunner/
```

No Nginx restart is required for ordinary frontend file updates.

## Both frontend and backend changed

Run both workflows above.

---

# Security

Never commit production secrets or private infrastructure credentials.

Do not commit:

```text
.env
.env.*
*.pem
*.key
```

or files containing:

- MongoDB credentials
- JWT secrets
- API keys
- AWS credentials
- EC2 SSH private keys
- TLS private keys
- Let's Encrypt private keys

Use:

```text
BACKEND/.env.example
FRONTEND/.env.example
```

to document required environment variables.

### Vite environment variables

Any variable beginning with:

```text
VITE_
```

is bundled into the frontend and can be viewed by users in the browser.

Never put secrets in `VITE_*` variables.

---

# Troubleshooting

## PM2 is not running

```bash
pm2 status
```

```bash
pm2 logs coderunner-api --lines 50
```

## Check whether Node is listening on port 3000

```bash
sudo ss -ltnp | grep 3000
```

## Test Express without Nginx

```bash
curl -i http://127.0.0.1:3000/health
```

## Test the API through Nginx

```bash
curl -i https://coderunner.me/api/user/urls
```

A `401 Unauthorized` response can be expected for protected endpoints when no authentication cookie is supplied.

## Check Nginx configuration

```bash
sudo nginx -t
```

## Check Nginx logs

```bash
sudo tail -n 50 /var/log/nginx/error.log
```

## Check PM2 logs

```bash
pm2 logs coderunner-api --lines 50
```

---

# Important Production Notes

- The current production backend runs on port `3000`.
- Nginx proxies API and short-link requests to `127.0.0.1:3000`.
- The React production build is served from `/var/www/coderunner`.
- PM2 manages only the backend.
- Nginx serves the frontend directly.
- SSL is managed by Certbot.
- Production `.env` files remain on the server and are not committed.
- `deploy/nginx.conf` is a template and should be reviewed before applying it to a live server.