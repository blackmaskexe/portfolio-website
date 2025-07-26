#!/usr/bin/env node

// Simple test script to verify the package exports work correctly
try {
  const pkg = require("./dist/index.js");

  console.log("✅ Package exports test:");
  console.log("  - Default export:", typeof pkg.default);
  console.log("  - Named Desktop export:", typeof pkg.Desktop);
  console.log("  - Named MacosDesktop export:", typeof pkg.MacosDesktop);

  // Check if it's a React component
  if (typeof pkg.default === "function") {
    console.log("  ✅ Default export is a function (React component)");
  } else {
    console.log("  ❌ Default export is not a function");
  }

  if (pkg.Desktop === pkg.MacosDesktop) {
    console.log("  ✅ Desktop and MacosDesktop are the same component");
  } else {
    console.log("  ❌ Desktop and MacosDesktop are different");
  }

  console.log("\n🎉 Package exports are working correctly!");
} catch (error) {
  console.error("❌ Package test failed:", error.message);
  process.exit(1);
}
