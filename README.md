Hello world. Documentation coming soon

Peer Dependencies & Setup

This component library is styled with Tailwind CSS. For the styles to apply correctly, your project must also have Tailwind CSS installed and configured.

Please ensure your project's tailwind.config.js is set up to scan this package's files for classes:

```Javascript
// tailwind.config.js
module.exports = {
  content: [
    // ...your other paths
    './node_modules/react-macos-desktop/dist/**/*.{js,ts,jsx,tsx}',
  ],
  // ...
}
```
