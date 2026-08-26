# CodeRunner URL Shortener

A production-deployed full-stack URL shortener built with **React, Node.js, Express, and MongoDB**.

Create short, shareable links, optionally use custom slugs, authenticate with HTTP-only cookies, and manage your URLs from a personal dashboard.

**Live application:** https://coderunner.me  
**Repository:** https://github.com/HarshVerma2705/url_shortner

---

## Features

- Create short URLs from long URLs
- Optional custom slugs for authenticated users
- User registration and login
- JWT-based authentication using HTTP-only cookies
- Personal URL dashboard
- URL deletion for authenticated users
- Short-link redirection
- Click/visit tracking
- React-based responsive frontend
- RESTful Express backend
- MongoDB persistence with Mongoose
- CORS and cookie-based authentication
- Production deployment on AWS EC2
- Nginx reverse proxy
- PM2 process management
- HTTPS with Let's Encrypt / Certbot

---

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- Tailwind CSS v4
- Lucide React

### Backend

- Node.js
- Express 5
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt / bcryptjs
- cookie-parser
- CORS
- nanoid
- dotenv

### Deployment

- AWS EC2
- Ubuntu
- Nginx
- PM2
- Certbot / Let's Encrypt
- MongoDB Atlas

---

## Architecture

### Local Development

```text
Browser
   |
   | http://localhost:5173
   v
React + Vite
   |
   | HTTP requests
   v
Express API :3000
   |
   v
MongoDB
```

### Production

```text
                         Internet
                            |
                            v
                    https://coderunner.me
                            |
                            v
                       Nginx :443
                     /      |       \
                    /       |        \
                   v        v         v
              React UI   /api/*    /<shortcode>
                   |        |         |
                   |        +----+----+
                   |             |
                   v             v
             /var/www/       Express :3000
             coderunner          |
                                  v
                             MongoDB Atlas
```

Nginx serves the production React build directly and reverse-proxies API and short-code requests to the Express backend.

---

## Repository Structure

```text
url_shortner/
│
├── BACKEND/
│   ├── src/
│   │   ├── config/          # Database and configuration
│   │   ├── controllers/     # Request handlers
│   │   ├── dao/             # Data access logic
│   │   ├── middleware/      # Middleware
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── utils/           # Utilities and helpers
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── FRONTEND/
│   ├── public/
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Application pages
│   │   ├── services/        # API services
│   │   └── store/           # React state/context
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── deploy/
│   ├── ecosystem.config.cjs # PM2 configuration
│   ├── nginx.conf           # Nginx deployment template
│   └── README.md            # Deployment notes
│
├── LICENSE
├── .gitignore
└── README.md
```

---

## Prerequisites

Before running the project locally, install:

- Node.js 20+ recommended
- npm
- MongoDB Atlas account or local MongoDB instance
- Git

Check your versions:

```bash
node --version
npm --version
git --version
```

---

# Local Development

## 1. Clone the repository

```bash
git clone https://github.com/HarshVerma2705/url_shortner.git
cd url_shortner
```

---

## 2. Configure the Backend

```bash
cd BACKEND
npm install
cp .env.example .env
```

Edit `BACKEND/.env`:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/urlshortener
JWT_SECRET=replace_with_a_long_random_secret
APP_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Backend environment variables

| Variable | Description | Example |
|---|---|---|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret used for JWT signing/verification | Long random string |
| `APP_URL` | Base URL used to generate public short links | `http://localhost:3000` |
| `FRONTEND_URL` | Frontend origin allowed by CORS | `http://localhost:5173` |
| `NODE_ENV` | Application environment | `development` / `production` |

Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:3000
```

---

## 3. Configure the Frontend

Open a second terminal:

```bash
cd FRONTEND
npm install
cp .env.example .env
```

Set:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

The frontend normally runs on:

```text
http://localhost:5173
```

Open the URL shown by Vite in your browser.

---

# API Documentation

The backend exposes REST-style endpoints under `/api`.

## Authentication

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login and set auth cookie | No |
| `POST` | `/api/auth/logout` | Clear authentication cookie | Yes |
| `GET` | `/api/auth/me` | Get current authenticated user | Yes |

Authentication uses JWTs stored in HTTP-only cookies.

---

## URL Management

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| `POST` | `/api/create/` | Create a short URL | Optional |
| `GET` | `/api/user/urls` | Get URLs belonging to the authenticated user | Yes |
| `DELETE` | `/api/user/urls/:id` | Delete a user's URL | Yes |

A custom slug can be supplied when creating a URL if supported by the request.

---

## Health Check

```http
GET /health
```

Example:

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok",
  "message": "Server is healthy"
}
```

---

## Short URL Redirect

```http
GET /:id
```

Example:

```text
https://coderunner.me/abc123
```

The backend resolves the short code and redirects the visitor to the stored destination URL.

---

# Production Deployment

The application is deployed on an **AWS EC2 Ubuntu instance**.

## Production Components

| Component | Purpose |
|---|---|
| AWS EC2 | Application server |
| Ubuntu | Server operating system |
| Nginx | Static file server and reverse proxy |
| PM2 | Node.js process manager |
| Certbot | Let's Encrypt SSL certificate |
| MongoDB Atlas | Production database |

### Production ports

```text
Internet
   |
   +--> 443 HTTPS --> Nginx
   |
   +--> 80 HTTP ----> Nginx / Certbot redirect handling

Nginx
   |
   +--> React static files: /var/www/coderunner
   |
   +--> API: 127.0.0.1:3000
   |
   +--> Short URLs: 127.0.0.1:3000
```

The Node.js backend is intentionally bound behind Nginx rather than exposed directly to the public internet.

---

## Production Environment

### Backend

```env
MONGO_URI=<production MongoDB connection string>
JWT_SECRET=<production JWT secret>
APP_URL=https://coderunner.me
FRONTEND_URL=https://coderunner.me
NODE_ENV=production
```

The current backend runs on port `3000`.

### Frontend

The production frontend uses:

```env
VITE_API_URL=https://coderunner.me
```

Vite variables are bundled into the browser, so **never put secrets in `VITE_*` variables**.

---

# Deploying to EC2

The repository contains deployment templates under `deploy/`.

## Backend

After pulling the latest code:

```bash
cd ~/apps/url_shortner

git pull origin main

cd BACKEND
npm ci

pm2 restart coderunner-api --update-env
```

Check the process:

```bash
pm2 status
```

View logs:

```bash
pm2 logs coderunner-api --lines 50
```

---

## Frontend

Pull the latest code and build:

```bash
cd ~/apps/url_shortner

git pull origin main

cd FRONTEND
npm ci
npm run build
```

Deploy the generated build:

```bash
sudo rm -rf /var/www/coderunner/*
sudo cp -r dist/* /var/www/coderunner/
```

Nginx does not need to be restarted for ordinary frontend file changes.

---

## Nginx

The repository contains a deployment template:

```text
deploy/nginx.conf
```

The live server configuration is maintained under:

```text
/etc/nginx/sites-available/
/etc/nginx/sites-enabled/
```

Before reloading Nginx:

```bash
sudo nginx -t
```

If the test succeeds:

```bash
sudo systemctl reload nginx
```

---

## PM2

The repository contains:

```text
deploy/ecosystem.config.cjs
```

The production backend process is:

```text
coderunner-api
```

Useful commands:

```bash
pm2 status
pm2 logs coderunner-api
pm2 restart coderunner-api
pm2 save
```

To inspect the running process:

```bash
pm2 show coderunner-api
```

---

# Updating Production

## Backend changes

After pushing changes to GitHub:

```bash
ssh ubuntu@<EC2_PUBLIC_IP>

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

---

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

Then refresh the browser with:

```text
Ctrl + Shift + R
```

to bypass cached frontend assets when necessary.

---

# Security

Never commit production secrets.

Keep these files local to the deployment environment:

```text
BACKEND/.env
FRONTEND/.env
```

Commit only:

```text
BACKEND/.env.example
FRONTEND/.env.example
```

Never commit:

- MongoDB credentials
- JWT secrets
- API keys
- AWS credentials
- SSH private keys
- `.pem` files
- TLS private keys
- Production `.env` files

Also remember that anything beginning with `VITE_` is exposed to the browser after the frontend is built.

---

# Git Workflow

Recommended workflow:

```bash
git status

git add .

git commit -m "Describe your changes"

git push origin main
```

Then update the EC2 instance:

```bash
cd ~/apps/url_shortner
git pull origin main
```

Deploy the part that changed:

```text
Backend changed  → npm ci + PM2 restart
Frontend changed → npm ci + npm run build + copy dist
```

---

# Troubleshooting

## Check backend

```bash
pm2 status
```

```bash
pm2 logs coderunner-api --lines 50
```

## Check backend port

```bash
sudo ss -ltnp | grep 3000
```

## Test backend directly

```bash
curl -i http://127.0.0.1:3000/health
```

## Test through HTTPS

```bash
curl -i https://coderunner.me/health
```

## Test a short URL

```bash
curl -I https://coderunner.me/<shortcode>
```

A working redirect should normally return a `301` or `302` response with a `Location` header.

## Check Nginx

```bash
sudo nginx -t
```

```bash
sudo systemctl status nginx
```

View recent Nginx errors:

```bash
sudo tail -n 50 /var/log/nginx/error.log
```

---

# License

This project is licensed under the **MIT License**.

See [`LICENSE`](LICENSE) for the complete license text.

---

## Author

**Harsh Verma**

- GitHub: https://github.com/HarshVerma2705
- Project: https://github.com/HarshVerma2705/url_shortner
- Live: https://coderunner.me

---

## Acknowledgements

Built as a full-stack learning and deployment project with a focus on:

- REST API development
- Authentication
- Database design
- React application architecture
- Production deployment
- Linux server administration
- Nginx reverse proxy configuration
- Process management with PM2
- HTTPS and SSL deployment