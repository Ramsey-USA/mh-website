# Development Setup Guide

## Complete Development Environment Setup for MH Construction Website

This guide provides detailed instructions for setting up the development environment for the MH Construction website platform.

---

## 🛠️ System Requirements

### Hardware Requirements

**Minimum:**

- **RAM**: 8GB (16GB recommended)
- **Storage**: 5GB free disk space
- **Processor**: Intel i5 or AMD Ryzen 5 equivalent

**Recommended:**

- **RAM**: 16GB or higher
- **Storage**: SSD with 10GB+ free space
- **Processor**: Intel i7/i9 or AMD Ryzen 7/9
- **Network**: Stable internet connection for Firebase services

### Operating System Support

- **Windows**: Windows 10/11 (WSL2 recommended for development)
- **macOS**: macOS 10.15 Catalina or later
- **Linux**: Ubuntu 18.04+, Debian 10+, or equivalent distributions

---

## 📋 Prerequisites Installation

### 1. Node.js & npm

**Install Node.js 18 or later:**

**Using Node Version Manager (Recommended):**

```bash
# Install nvm (macOS/Linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# For Windows, install nvm-windows from GitHub releases
# Then restart terminal and run:

# Install and use Node.js 18
nvm install 18
nvm use 18
nvm alias default 18

# Verify installation
node --version    # Should show v18.x.x
npm --version     # Should show 8.x.x or higher
```text

**Direct Installation:**

- Download from [nodejs.org](https://nodejs.org/)
- Choose LTS version (18.x or later)
- Follow installer instructions

### 2. Git

**Installation:**

```bash
# macOS (with Homebrew)
brew install git

# Ubuntu/Debian
sudo apt update && sudo apt install git

# Windows
# Download from https://git-scm.com/download/win
```text

**Configuration:**

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global init.defaultBranch main
```text

### 3. Code Editor

**Visual Studio Code (Recommended):**

- Download from [code.visualstudio.com](https://code.visualstudio.com/)
- Install recommended extensions (see Extensions section below)

**Alternative Editors:**

- WebStorm/IntelliJ IDEA
- Sublime Text
- Vim/Neovim with appropriate plugins

---

## 🚀 Project Setup

### 1. Repository Setup

**Clone the repository:**

```bash
# HTTPS (recommended for most users)
git clone https://github.com/Ramsey-USA/mh-website.git

# SSH (if you have SSH keys configured)
git clone git@github.com:Ramsey-USA/mh-website.git

# Navigate to project directory
cd mh-website
```text

**Verify repository structure:**

```bash
ls -la
# Should show: package.json, src/, docs/, public/, etc.
```text

### 2. Environment Configuration

**Create environment file:**

```bash
# Copy example environment file
cp .env.example .env.local

# Open for editing
code .env.local
# or
nano .env.local
```text

**Required environment variables:**

```env
# Firebase Configuration (Required)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ENVIRONMENT=development

# Optional: Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_measurement_id
```text

### 3. Dependencies Installation

**Install project dependencies:**

```bash
# Install all dependencies
npm install

# Verify installation
npm list --depth=0
```text

**Common installation issues:**

```bash
# Clear npm cache if installation fails
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# For permission issues on macOS/Linux
sudo chown -R $(whoami) ~/.npm
```text

### 4. Development Server

**Start development server:**

```bash
# Start development server
npm run dev

# Server should start at http://localhost:3000
# Open browser and navigate to the URL
```text

**Verify development setup:**

```bash
# Run build test
npm run build

# Run linting
npm run lint

# Run type checking
npm run type-check
```text

---

## 🔥 Firebase Setup

### 1. Firebase Account & Project

**Create Firebase project:**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `mh-construction-dev` (or similar)
4. Choose analytics settings
5. Wait for project creation

### 2. Firebase CLI Installation

**Install Firebase CLI:**

```bash
# Install globally
npm install -g firebase-tools

# Verify installation
firebase --version

# Login to Firebase
firebase login

# Test authentication
firebase projects:list
```text

### 3. Firebase Configuration

**Initialize Firebase in project:**

```bash
# In project root directory
firebase init

# Select features:
# - Firestore: Configure Cloud Firestore
# - Hosting: Configure Firebase Hosting
# - Functions: Configure Cloud Functions (optional)

# Follow prompts:
# - Select existing project
# - Use default Firestore rules
# - Choose 'out' as public directory for hosting
# - Don't rewrite all URLs to index.html
```text

### 4. Environment Variables

**Get Firebase configuration:**

1. Go to Firebase Console → Project Settings
2. Scroll to "Your apps" section
3. Click web app icon or "Add app"
4. Copy configuration values to `.env.local`

**Test Firebase connection:**

```bash
# Test Firestore emulator
firebase emulators:start --only firestore

# Test hosting emulator
npm run build
firebase serve
```text

---

## 🧩 VSCode Extensions

### Required Extensions

**Install via VSCode Extensions panel:**

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-json",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```text

### Recommended Extensions

```json
{
  "optional": [
    "ms-vscode.vscode-typescript-next",
    "Gruntfuggly.todo-tree",
    "aaron-bond.better-comments",
    "alefragnani.project-manager",
    "ms-vscode-remote.remote-wsl",
    "github.copilot"
  ]
}
```text

### VSCode Settings

**Create `.vscode/settings.json`:**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```text

---

## 🛠️ Development Tools

### 1. Package Scripts

**Available npm scripts:**

```bash
# Development
npm run dev              # Start development server
npm run build           # Production build
npm run start           # Start production server

# Code Quality
npm run lint            # ESLint check
npm run lint:fix        # Fix ESLint issues
npm run type-check      # TypeScript validation

# Firebase
npm run firebase:serve  # Local Firebase hosting
npm run firebase:deploy # Deploy to Firebase
```text

### 2. Debugging Setup

**Browser DevTools:**

- Install React Developer Tools
- Install Redux DevTools (if using Redux)

**VSCode Debugging:**

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "console": "integratedTerminal",
      "skipFiles": [
        "${workspaceFolder}/node_modules/**"
      ]
    },
    {
      "name": "Next.js: debug client-side",
      "type": "pwa-chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```text

### 3. Git Hooks (Optional)

**Install Husky for git hooks:**

```bash
# Install husky
npm install --save-dev husky

# Initialize husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run lint && npm run type-check"
```text

---

## 🧪 Testing Setup

### Testing Tools Installation

```bash
# Install testing dependencies (when implemented)
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```text

### Test Configuration

**Create `jest.config.js`:**

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```text

---

## 🚀 Performance Optimization

### Development Performance

**Enable faster refresh:**

```javascript
// next.config.js additions
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
}

module.exports = nextConfig
```text

### Build Performance

**Monitor build times:**

```bash
# Analyze bundle
npm run build -- --analyze

# Check build performance
time npm run build
```text

---

## 🔧 Troubleshooting

### Common Issues

**1. Port already in use:**

```bash
# Find process using port 3000
lsof -ti:3000

# Kill process
kill $(lsof -ti:3000)

# Or use different port
npm run dev -- -p 3001
```text

**2. Node version issues:**

```bash
# Check Node version
node --version

# Switch to correct version
nvm use 18

# Set as default
nvm alias default 18
```text

**3. Permission errors:**

```bash
# Fix npm permissions (macOS/Linux)
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Or use npm prefix
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile
```text

**4. Firebase connection issues:**

```bash
# Re-authenticate
firebase logout
firebase login

# Check project selection
firebase use --add

# Test connection
firebase projects:list
```text

**5. TypeScript errors:**

```bash
# Clear TypeScript cache
rm -rf .next
npx tsc --build --clean

# Restart TypeScript server in VSCode
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```text

### Performance Issues

**1. Slow builds:**

```bash
# Clear all caches
rm -rf .next node_modules package-lock.json
npm install

# Check for large dependencies
npm ls --depth=0 --long
```text

**2. Memory issues:**

```bash
# Increase Node memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```text

### Network Issues

**1. Proxy/Corporate firewall:**

```bash
# Configure npm proxy
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080

# Use different registry
npm config set registry https://registry.npmmirror.com/
```text

---

## ✅ Verification Checklist

After completing setup, verify everything works:

- [ ] **Node.js**: `node --version` shows 18.x or higher
- [ ] **npm**: `npm --version` shows 8.x or higher
- [ ] **Git**: `git --version` shows installation
- [ ] **Repository**: Project cloned and accessible
- [ ] **Dependencies**: `npm install` completes successfully
- [ ] **Environment**: `.env.local` file configured
- [ ] **Development Server**: `npm run dev` starts at localhost:3000
- [ ] **Build**: `npm run build` completes without errors
- [ ] **Linting**: `npm run lint` passes
- [ ] **Type Checking**: `npm run type-check` passes
- [ ] **Firebase**: `firebase projects:list` shows your project
- [ ] **VSCode**: Extensions installed and configured
- [ ] **Browser**: Can access <http://localhost:3000>

### Success Indicators

**Terminal output should show:**

```bash
$ npm run dev
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
event - compiled client and server successfully
```text

**Browser should display:**

- MH Construction homepage
- No console errors
- Responsive design working
- Theme toggle functional

---

## 📞 Getting Help

### Documentation Resources

- **Project Documentation**: `/docs` directory
- **Contributing Guide**: `CONTRIBUTING.md`
- **API Reference**: `docs/technical/API_REFERENCE.md`
- **Design System**: `docs/technical/DESIGN_SYSTEM.md`

### Support Channels

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and community support
- **Development Team**: <developers@mhconstruction.com>
- **Emergency Support**: <support@mhconstruction.com>

### External Resources

- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **TypeScript Handbook**: [typescriptlang.org/docs](https://www.typescriptlang.org/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Firebase Documentation**: [firebase.google.com/docs](https://firebase.google.com/docs)

---

**Setup complete! You're ready to contribute to the MH Construction website platform.**

## Last updated: October 2025 | MH Construction Development Team
