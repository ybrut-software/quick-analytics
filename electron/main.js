const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const {
  insertRecord,
  findRecords,
  groupByField,
  getStatsSummary,
} = require("./database");

const preloadPath = path.join(__dirname, "preload.js");

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    fullscreen: true,
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false,
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

// IPC handling
ipcMain.handle("case-add", async (event, data) => {
  try {
    console.log("main insert record", data);
    const newRecord = await insertRecord(data);
    return { success: true, data: newRecord };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle("cases-find", async (event, query = {}) => {
  try {
    const result = await findRecords(query);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle("cases-filter", async (event, query = {}) => {
  try {
    const result = await groupByField(query);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle("cases-summary", async (event, query = {}) => {
  try {
    const result = await getStatsSummary(query);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
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
