const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Starting production build...");

try {
  // Clean previous builds
  console.log("🧹 Cleaning previous builds...");
  if (fs.existsSync("out")) {
    fs.rmSync("out", { recursive: true, force: true });
  }
  if (fs.existsSync("dist")) {
    fs.rmSync("dist", { recursive: true, force: true });
  }

  // Build Next.js app
  console.log("📦 Building Next.js application...");
  execSync("yarn build-next", { stdio: "inherit" });

  // Verify out directory exists
  if (!fs.existsSync("out")) {
    throw new Error("Next.js build failed - out directory not found");
  }

  // Build Electron app
  console.log("⚡ Building Electron application...");
  execSync("yarn build-electron", { stdio: "inherit" });

  console.log("✅ Build completed successfully!");
  console.log('📁 Check the "dist" folder for your built application');
} catch (error) {
  console.error("❌ Build failed:", error.message);
  process.exit(1);
}
