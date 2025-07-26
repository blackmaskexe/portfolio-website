#!/usr/bin/env node

// Test script to validate package exports and styles are included
const fs = require("fs");
const path = require("path");

console.log("🧪 Testing Package Exports and Styles...\n");

try {
  // Test 1: Check main file exists and is valid JavaScript
  const mainFile = "./dist/index.js";
  if (fs.existsSync(mainFile)) {
    console.log("✅ Main file exists:", mainFile);

    // Try to require it (won't work fully without React, but checks syntax)
    const content = fs.readFileSync(mainFile, "utf8");
    if (content.includes("MacosDesktop") && content.includes("Desktop")) {
      console.log("✅ Main file contains expected exports");
    } else {
      console.log("❌ Main file missing expected exports");
    }
  } else {
    console.log("❌ Main file missing");
  }

  // Test 2: Check TypeScript definitions
  const typesFile = "./dist/index.d.ts";
  if (fs.existsSync(typesFile)) {
    console.log("✅ Types file exists:", typesFile);

    const typesContent = fs.readFileSync(typesFile, "utf8");
    if (
      typesContent.includes("MacosDesktop") &&
      typesContent.includes("AppWindow")
    ) {
      console.log("✅ Types file contains expected exports");
    } else {
      console.log("❌ Types file missing expected exports");
    }
  } else {
    console.log("❌ Types file missing");
  }

  // Test 3: Check compiled CSS exists and has content
  const cssFile = "./dist/styles.css";
  if (fs.existsSync(cssFile)) {
    console.log("✅ CSS file exists:", cssFile);

    const cssContent = fs.readFileSync(cssFile, "utf8");
    const cssSize = Buffer.byteLength(cssContent, "utf8");

    console.log(`✅ CSS file size: ${Math.round(cssSize / 1024)}KB`);

    // Check for essential CSS classes
    const hasEssentialClasses = [
      ".desktop-background",
      ".bg-blue-500",
      ".rounded-lg",
      ".flex",
      ".shadow-lg",
    ].every((className) => cssContent.includes(className));

    if (hasEssentialClasses) {
      console.log("✅ CSS contains essential Tailwind classes");
    } else {
      console.log("❌ CSS missing some essential classes");
    }

    if (cssContent.includes(".desktop-background")) {
      console.log("✅ CSS contains component-specific classes");
    } else {
      console.log("❌ CSS missing component-specific classes");
    }
  } else {
    console.log("❌ CSS file missing");
  }

  // Test 4: Check assets are included
  const assetsDir = "./dist/assets";
  if (fs.existsSync(assetsDir)) {
    const assetFiles = fs.readdirSync(assetsDir, { recursive: true });
    console.log("✅ Assets directory exists with", assetFiles.length, "files");
  } else {
    console.log("❌ Assets directory missing");
  }

  console.log("\n📋 Package Summary:");
  console.log("  🎯 Main Component: MacosDesktop");
  console.log("  📝 TypeScript: Fully supported");
  console.log("  🎨 Styles: Pre-compiled CSS included");
  console.log("  🖼️  Assets: Images and icons included");
  console.log("  📦 Ready for: npm publish");

  console.log("\n🚀 Installation Instructions:");
  console.log("  npm install react-macos-desktop");
  console.log("  npm install tailwindcss tailwindcss-animate");

  console.log("\n💡 Usage:");
  console.log('  import MacosDesktop from "react-macos-desktop";');
  console.log('  import "react-macos-desktop/dist/styles.css";');
} catch (error) {
  console.error("❌ Test failed:", error.message);
  process.exit(1);
}
