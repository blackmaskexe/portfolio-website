# Example Usage

This directory contains example implementations of the react-macos-desktop package.

## Quick Test

To quickly test the package locally:

1. **Link the package** (from the root directory):

```bash
npm run link-local
```

2. **Create a test project**:

```bash
npx create-react-app test-macos-desktop
cd test-macos-desktop
```

3. **Install dependencies**:

```bash
npm install tailwindcss
npm link react-macos-desktop
```

4. **Configure Tailwind** (`tailwind.config.js`):

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

5. **Update App.js**:

```jsx
import MacosDesktop from "react-macos-desktop";
import "react-macos-desktop/dist/styles.css";

function App() {
  return (
    <div className="h-screen w-screen">
      <MacosDesktop theme="light" />
    </div>
  );
}

export default App;
```

6. **Add Tailwind to CSS** (`src/index.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

7. **Start the app**:

```bash
npm start
```
