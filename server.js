// server.js
const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "./" }); // specify your Next.js directory
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use((req, res, next) => {
    console.log("Incoming request:", req.url);
    next();
  });

  // All requests handled by Next
  server.get("/*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, () => {
    console.log("> Ready on http://localhost:3000");
  });
});
