// electron/express-server.js
const express = require("express");
const path = require("path");
const compression = require("compression");
const expressStaticGzip = require("express-static-gzip");

function createServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Enable compression
  app.use(compression());

  // Explicitly set Content-Type for CSS files
  app.use("/_next/static/css", (req, res, next) => {
    if (req.path.endsWith(".css")) {
      res.type("text/css");
    }
    next();
  });

  // Serve static files with gzip/brotli support if available
  app.use(
    "/_next",
    expressStaticGzip(path.join(__dirname, "../out/_next"), {
      enableBrotli: true,
      orderPreference: ["br", "gz"],
      serveStatic: {
        maxAge: "1y",
        cacheControl: true,
      },
    })
  );

  // Serve other static files
  app.use(
    express.static(path.join(__dirname, "../out"), {
      maxAge: "1d",
      cacheControl: true,
    })
  );

  // Handle all other routes by serving index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../out/index.html"));
  });

  // Start the server
  const server = app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}`);

    // Debug CSS files
    const cssDir = path.join(__dirname, "../out/_next/static/css");
    if (fs.existsSync(cssDir)) {
      console.log("CSS directory exists, contents:");
      fs.readdirSync(cssDir).forEach((file) => {
        console.log(` - ${file}`);
      });
    } else {
      console.log("CSS directory does not exist at:", cssDir);
    }
  });

  return { app, server };
}

module.exports = { createServer };
