# Deployment

## Production architecture

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
   +-- frontend -----> /var/www/coderunner
```

The React frontend is built with Vite and served by Nginx. PM2 is used only for the backend.

## PM2

From the repository root on EC2:

```bash
pm2 delete coderunner-api
pm2 start deploy/ecosystem.config.cjs
pm2 save
pm2 status
```

Do not run these commands on a working server until you have checked the current PM2 process. The ecosystem file is intended to standardize the process definition.

Check logs:

```bash
pm2 logs coderunner-api --lines 50
```

## Frontend deployment

```bash
cd FRONTEND
npm ci
npm run build

sudo rm -rf /var/www/coderunner/*
sudo cp -r dist/* /var/www/coderunner/
```

## Nginx

The repository contains `deploy/nginx.conf` as a template.

Production TLS is managed by Certbot. Do not remove the certificate directives from the active Nginx configuration.

Validate before reloading:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Useful inspection command:

```bash
sudo nginx -T
```

## Backend deployment

```bash
cd BACKEND
npm ci
pm2 restart coderunner-api --update-env
```

## Health checks

Local backend:

```bash
curl -i http://127.0.0.1:3000/health
```

Production:

```bash
curl -i https://coderunner.me/health
```

A protected endpoint returning `401 Unauthorized` can still indicate that the Nginx -> Express path is working.

Short URL:

```bash
curl -i https://coderunner.me/<shortcode>
```

A successful redirect should return `301` or `302` with a `Location` header.

## Important

Do not commit:

- `.env`
- MongoDB credentials
- JWT secrets
- private keys
- Let's Encrypt private keys
- EC2 SSH keys

Use the `.env.example` files as templates only.
