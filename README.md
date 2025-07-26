# React macOS Desktop 🖥️

A beautifully crafted macOS-style desktop simulator component for React. Perfect for showcasing applications in portfolio websites with authentic macOS window management, dock, and iOS simulator capabilities.

![React macOS Desktop Demo](./public/aurora-wallpaper.jpeg)

## ✨ Features

- 🖥️ **Authentic macOS Desktop Environment**
- 🪟 **Window Management** - Drag, resize, minimize, and close windows
- 📱 **iOS Simulator Integration** - Display mobile apps within the desktop
- 🎯 **Dock with App Icons** - Interactive dock with app launching
- 🎨 **Control Center** - macOS-style system controls
- 🌓 **Light/Dark Theme Support**
- ⚡ **TypeScript Support** - Full type safety
- 🎭 **Smooth Animations** - Fluid window transitions and interactions

## 📦 Installation

```bash
npm install react-macos-desktop
```

### Peer Dependencies

Make sure you have these peer dependencies installed:

```bash
npm install react react-dom next tailwindcss
```

## 🚀 Quick Start

### 1. Basic Usage

```tsx
import MacosDesktop from "react-macos-desktop";
// or
import { MacosDesktop } from "react-macos-desktop";

function App() {
  return (
    <div className="h-screen w-screen">
      <MacosDesktop theme="light" />
    </div>
  );
}
```

### 2. Tailwind CSS Configuration

**Important:** This component requires Tailwind CSS. Update your `tailwind.config.js`:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-macos-desktop/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

### 3. CSS Imports

Import the component styles in your main CSS file:

```css
/* globals.css or main.css */
@import "react-macos-desktop/dist/styles.css";

/* Add CSS variables for theming */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
}
```

## 🎯 Usage Examples

### With Theme Support

```tsx
import { useState } from "react";
import MacosDesktop from "react-macos-desktop";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div className="h-screen w-screen">
      <MacosDesktop theme={theme} />
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="absolute top-4 right-4 z-50"
      >
        Toggle Theme
      </button>
    </div>
  );
}
```

### In Next.js

```tsx
// pages/index.tsx
import dynamic from "next/dynamic";

const MacosDesktop = dynamic(() => import("react-macos-desktop"), {
  ssr: false, // Disable SSR for this component
});

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <MacosDesktop theme="light" />
    </div>
  );
}
```

## 📚 API Reference

### Props

| Prop    | Type                | Default   | Description                |
| ------- | ------------------- | --------- | -------------------------- |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme mode for the desktop |

### TypeScript Support

The package includes TypeScript definitions:

```tsx
import MacosDesktop, { type AppWindow } from "react-macos-desktop";

// AppWindow interface for custom integrations
const myWindow: AppWindow = {
  id: "custom-app",
  appId: "my-app",
  title: "My Application",
  isMinimized: false,
  zIndex: 1,
  position: { x: 100, y: 100 },
  size: { width: 800, height: 600 },
};
```

## 🛠️ Development

### Local Development

```bash
# Clone the repository
git clone https://github.com/blackmaskexe/react-macos-desktop.git

# Install dependencies
cd react-macos-desktop
npm install

# Start development server
npm run dev

# Build the package
npm run build
```

### Project Structure

```
lib/
├── components/           # Core components
│   ├── desktop/         # Main desktop environment
│   ├── dock/           # macOS-style dock
│   ├── menu-bar/       # Top menu bar
│   ├── window-manager/ # Window management
│   ├── ios-simulator/  # iOS app simulator
│   ├── control-center/ # System controls
│   └── ui/            # Shared UI components
├── assets/             # Images and static files
├── hooks/             # Custom React hooks
├── styles/            # Component styles
└── utils/             # Utility functions
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the beautiful macOS interface design
- Built with React, TypeScript, and Tailwind CSS
- Icons provided by Lucide React

---

**Made with ❤️ by [blackmaskexe](https://github.com/blackmaskexe)**
