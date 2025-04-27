const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false, // ✅ Turn off direct Node.js
      contextIsolation: true, // ✅ Turn on context isolation
    },
  });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    `file://${path.join(__dirname, "/out/index.html")}`;
  win.loadURL(startUrl);

  // Open dev tools in dev mode
  if (process.env.NODE_ENV === "development") {
    win.webContents.openDevTools();
  }

  win.on("closed", () => {
    win = null;
  });
}

// Example of main process listening
ipcMain.on("message", (event, message) => {
  console.log("Received message from Renderer:", message);
  // You can reply if needed
  event.reply("message", "Hello from Main Process");
});

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
