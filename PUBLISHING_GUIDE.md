# 🚀 React macOS Desktop - Publishing & Usage Guide

## 📦 Publishing to NPM

### 1. Prepare for Publishing

```bash
# Make sure you're logged into npm
npm login

# Verify your login
npm whoami
```

### 2. Test the Package Locally

```bash
# Build the package
npm run build

# Test the package structure
node test-package-structure.js

# Optional: Test in a local project using npm link
npm link
```

### 3. Publish to NPM

```bash
# Publish the package
npm publish

# For scoped packages (if needed)
npm publish --access public
```

### 4. Verify Publication

```bash
# Check if the package is published
npm view react-macos-desktop

# View specific information
npm view react-macos-desktop version
npm view react-macos-desktop dependencies
```

## 🔧 Using the Package in Other Projects

### Option 1: Create React App

```bash
# Create a new React app
npx create-react-app my-portfolio
cd my-portfolio

# Install the package
npm install react-macos-desktop

# Install required peer dependencies
npm install tailwindcss @tailwindcss/typography
npx tailwindcss init
```

**Configure Tailwind CSS** (`tailwind.config.js`):

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-macos-desktop/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**Use in your app** (`src/App.js`):

```jsx
import React from "react";
import MacosDesktop from "react-macos-desktop";
import "react-macos-desktop/dist/styles.css";
import "./App.css";

function App() {
  return (
    <div className="h-screen w-screen">
      <MacosDesktop theme="light" />
    </div>
  );
}

export default App;
```

### Option 2: Next.js

```bash
# Create a new Next.js app
npx create-next-app@latest my-portfolio
cd my-portfolio

# Install the package
npm install react-macos-desktop

# Install Tailwind CSS (if not already installed)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Configure Tailwind CSS** (`tailwind.config.js`):

```javascript
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-macos-desktop/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**Use in your app** (`pages/index.js` or `app/page.js`):

```jsx
import dynamic from "next/dynamic";

// Import dynamically to avoid SSR issues
const MacosDesktop = dynamic(() => import("react-macos-desktop"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <MacosDesktop theme="light" />
    </div>
  );
}
```

**Add global styles** (`styles/globals.css` or `app/globals.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import "react-macos-desktop/dist/styles.css";
```

### Option 3: Vite + React

```bash
# Create a new Vite React app
npm create vite@latest my-portfolio -- --template react
cd my-portfolio

# Install dependencies
npm install

# Install the package
npm install react-macos-desktop

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Configure Tailwind CSS** (`tailwind.config.js`):

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-macos-desktop/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**Use in your app** (`src/App.jsx`):

```jsx
import MacosDesktop from "react-macos-desktop";
import "react-macos-desktop/dist/styles.css";
import "./App.css";

function App() {
  return (
    <div className="h-screen w-screen">
      <MacosDesktop theme="light" />
    </div>
  );
}

export default App;
```

## 🎨 Advanced Usage Examples

### With Theme Toggle

```jsx
import { useState } from "react";
import MacosDesktop from "react-macos-desktop";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <div className="h-screen w-screen relative">
      <MacosDesktop theme={theme} />
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="absolute top-4 right-4 z-50 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Toggle Theme
      </button>
    </div>
  );
}
```

### With TypeScript

```tsx
import React, { useState } from "react";
import MacosDesktop, { type AppWindow } from "react-macos-desktop";

const App: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div className="h-screen w-screen">
      <MacosDesktop theme={theme} />
    </div>
  );
};

export default App;
```

## 🔍 Troubleshooting

### Common Issues

1. **Styles not applying**: Make sure Tailwind CSS is configured to scan the package files
2. **SSR errors in Next.js**: Use dynamic imports with `ssr: false`
3. **TypeScript errors**: Ensure peer dependencies are installed

### Support

- 📖 Documentation: Check the README.md
- 🐛 Issues: Report on GitHub
- 💬 Discussions: GitHub Discussions

## 🎯 Package Management

### Updating the Package

```bash
# Update version
npm version patch  # for bug fixes
npm version minor  # for new features
npm version major  # for breaking changes

# Build and publish
npm run build
npm publish
```

### Local Development

```bash
# Link for local development
npm link

# In your test project
npm link react-macos-desktop

# Unlink when done
npm unlink react-macos-desktop
```
