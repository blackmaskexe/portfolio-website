import { Desktop } from "./components/desktop/desktop";

// Main component export
const MacosDesktop = Desktop;

// Named exports for flexibility
export { Desktop as MacosDesktop };
export { Desktop };

// Type exports
export type { AppWindow } from "./components/desktop/desktop";

// Default export for easy import
export default MacosDesktop;
