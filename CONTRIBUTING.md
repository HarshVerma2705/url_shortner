# Contributing to Shortly

Thank you for your interest in contributing to **Shortly**! We welcome contributions from everyone. This document provides guidelines and best practices to help you get started and ensure your contributions are smooth and effective.

---

## 🚀 Getting Started

### 1. Fork & Clone
1. **Fork** the repository on GitHub: `https://github.com/HarshVerma2705/url_shortner`
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/url_shortner.git
   cd url_shortner
   ```

### 2. Branching Strategy
Create a descriptive feature branch off of `main`:
```bash
git checkout -b feature/short-description
```

Use the following branch naming prefixes:
- `feature/` — New feature or functionality
- `fix/` — Bug fix or patch
- `docs/` — Documentation changes
- `refactor/` — Code refactoring without changing functionality
- `chore/` — Build system, dependencies, or maintenance tasks

### 3. Local Environment Setup

Ensure you have **Node.js ≥ 18** and **Git** installed.

#### Backend Setup (`/BACKEND`)
```bash
cd BACKEND
cp .env.example .env
npm install
npm run dev
```
- Backend starts at: `http://localhost:3000`
- Make sure to set `MONGO_URI` and `JWT_SECRET` in `BACKEND/.env`.

#### Frontend Setup (`/FRONTEND`)
```bash
cd ../FRONTEND
cp .env.example .env
npm install
npm run dev
```
- Frontend starts at: `http://localhost:5173`
- API target default in `.env`: `VITE_API_URL=http://localhost:3000`

---

## 📋 Architecture & Coding Standards

### Backend Architecture (4-Layer Pattern)
The Express backend follows a strict 4-layer architecture:
`Routes → Controllers → Services → DAO → Models`

1. **Routes (`/src/routes`)**: Define API endpoints and apply middleware. Keep routes concise.
2. **Controllers (`/src/controllers`)**: Handle HTTP request/response parsing.
   - Wrap all async controller functions using `wrapAsync` from `src/utils/tryCatchWrapper.js`:
     ```javascript
     import wrapAsync from "../utils/tryCatchWrapper.js";
     export const myController = wrapAsync(async (req, res) => { ... });
     ```
3. **Services (`/src/services`)**: Encapsulate core business logic and validations.
4. **DAO / Models (`/src/dao`, `/src/models`)**: Database interaction layer and Mongoose schemas.

#### Backend Guidelines:
- Use **ES Modules** (`import` / `export`).
- Always use `ExpressError` for throwing structured HTTP error responses with status codes.
- Ensure authentication cookies use `httpOnly`, `sameSite: "lax"`, and `secure` in production.

---

### Frontend Architecture (4-Layer Pattern)
The React SPA follows a 4-layer UI pattern:
`Presentation Components → Custom Hooks → Service Layer → State Store`

1. **Presentation (`/src/components`, `/src/pages`)**: Pure UI rendering components.
2. **Custom Hooks (`/src/hooks`)**: State logic and handler hooks. Keep business logic out of components.
3. **Services (`/src/services`)**: API communication using `apiClient` (`axios` instance with `withCredentials: true`).
4. **State Store (`/src/store`)**: Application-wide state using React Context API (`AuthContext`, `UrlContext`).

#### Frontend Guidelines:
- Use **Tailwind CSS v4** utility classes for styling. Avoid inline styles or custom CSS files.
- Use **Lucide React** icons for UI iconography.
- Handle loading, error, and empty states gracefully in all views.

---

## 📝 Commit Messages

Follow the **Conventional Commits** specification to keep commit history clean and searchable:

```
<type>: <short imperative summary>
```

### Commit Types:
- `feat:` — A new feature
- `fix:` — A bug fix
- `docs:` — Documentation only changes
- `style:` — Formatting, missing semi-colons, code style changes
- `refactor:` — Code change that neither fixes a bug nor adds a feature
- `perf:` — Code change that improves performance
- `test:` — Adding or updating tests
- `chore:` — Maintenance tasks, dependency updates, configuration

### Examples:
```bash
git commit -m "feat: add user url deletion endpoint"
git commit -m "fix: resolve cookie parsing in production environment"
git commit -m "docs: align README and CONTRIBUTING guidelines"
```

---

## ✅ Pre-Submission Checklist

Before pushing your branch and opening a Pull Request, verify:

- [ ] **Frontend Build**: `cd FRONTEND && npm run build` completes with zero errors.
- [ ] **Frontend Linting**: `cd FRONTEND && npm run lint` passes without errors.
- [ ] **Backend Run**: `cd BACKEND && npm run dev` starts up cleanly.
- [ ] **Clean Code**: Removed all temporary `console.log` statements and commented-out code blocks.
- [ ] **Environment Variables**: New environment variables (if any) are added to both `BACKEND/.env.example` and `FRONTEND/.env.example`.
- [ ] **Feature Testing**: Verified feature functionality in both authenticated and guest modes (where applicable).

---

## 📩 Submitting a Pull Request (PR)

1. Push your branch to your GitHub fork:
   ```bash
   git push origin feature/short-description
   ```
2. Open a Pull Request against the `main` branch of `HarshVerma2705/url_shortner`.
3. Provide a clear summary in your PR description:
   - What changes were made and why.
   - Related issues closed (e.g. `Closes #12`).
   - Steps to test your changes manually.

---

## 🐛 Reporting Bugs

If you find a bug, please open an issue with:
- **Title**: Short, descriptive summary of the bug.
- **Steps to Reproduce**: Detailed list of steps to reproduce the issue.
- **Expected vs Actual Behavior**: Clear description of what should happen vs what actually happened.
- **Environment Details**: Node version, OS, browser version.

---

## 💡 Requesting Features

To suggest a new feature or improvement:
- Open an issue using the `enhancement` label.
- Explain the motivation behind the feature and why it would benefit users.
- Outline your proposed solution or design approach.

