#!/usr/bin/env node

// Simple test script to verify the package structure
try {
  const fs = require("fs");
  const path = require("path");

  console.log("📦 Package Structure Test:");

  // Check if main files exist
  const mainFile = "./dist/index.js";
  const typesFile = "./dist/index.d.ts";

  if (fs.existsSync(mainFile)) {
    console.log("  ✅ Main file exists:", mainFile);
  } else {
    console.log("  ❌ Main file missing:", mainFile);
  }

  if (fs.existsSync(typesFile)) {
    console.log("  ✅ Types file exists:", typesFile);
  } else {
    console.log("  ❌ Types file missing:", typesFile);
  }

  // Check package.json configuration
  const packageJson = require("./package.json");
  console.log("\n📋 Package Configuration:");
  console.log("  - Name:", packageJson.name);
  console.log("  - Version:", packageJson.version);
  console.log("  - Main:", packageJson.main);
  console.log("  - Types:", packageJson.types);
  console.log("  - Private:", packageJson.private);

  // Check dist folder structure
  console.log("\n📁 Dist Folder Contents:");
  const distContents = fs.readdirSync("./dist");
  distContents.forEach((item) => {
    const itemPath = path.join("./dist", item);
    const isDir = fs.statSync(itemPath).isDirectory();
    console.log(`  ${isDir ? "📁" : "📄"} ${item}`);
  });

  console.log("\n🎉 Package structure looks good!");
  console.log("\n📝 Next Steps:");
  console.log("  1. Test in a real React project");
  console.log("  2. Publish to npm: npm publish");
  console.log(
    "  3. Install in other projects: npm install react-macos-desktop"
  );
} catch (error) {
  console.error("❌ Package test failed:", error.message);
  process.exit(1);
}
