const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const { spawn } = require("child_process");
const net = require("net");
const fs = require("fs");

const {
  insertRecord,
  findRecords,
  groupByField,
  getStatsSummary,
} = require("./database");

let mainWindow;
let serverProcess;

const port = 3000;
const isDev = !app.isPackaged;
const preloadPath = path.join(__dirname, "preload.js");

// Enable logging
function log(message, ...args) {
  console.log(`[${new Date().toISOString()}] ${message}`, ...args);
}

function logError(message, ...args) {
  console.error(`[${new Date().toISOString()}] ERROR: ${message}`, ...args);
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: !isDev,
      preload: preloadPath,
    },
    show: false,
    icon: path.join(__dirname, "assets/icon.png"),
  });

  mainWindow.once("ready-to-show", () => {
    log("Window ready to show");
    mainWindow.show();
    mainWindow.focus();

    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.webContents.on(
    "did-fail-load",
    (event, errorCode, errorDescription, validatedURL) => {
      logError(
        `Failed to load URL: ${validatedURL}, Error: ${errorCode} - ${errorDescription}`
      );
    }
  );

  const startUrl = isDev
    ? "http://localhost:3000" // Use dev server during development
    : `file://${path.join(__dirname, "../out/index.html")}`; // Load static file in production

  mainWindow.loadURL(startUrl);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// =================== IPC (keeping your existing IPC handlers) ============================================
{
  ipcMain.on("message", (event, message) => {
    console.log("Received message from Renderer:", message);
    event.reply("message", "Hello from Main Process");
  });

  ipcMain.handle("case-add", async (event, data) => {
    try {
      const newRecord = await insertRecord(data);
      return { success: true, data: newRecord };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle("cases-import", async (event, data) => {
    try {
      const newRecord = await insertRecord(data);
      return { success: true, data: newRecord };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle("cases-find", async (event, query = {}) => {
    try {
      const result = await findRecords(query);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle("cases-filter", async (event, query = {}) => {
    try {
      const result = await groupByField(query);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle("cases-summary", async (event, query = {}) => {
    try {
      const result = await getStatsSummary(query);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  ipcMain.on("app/close", () => {
    if (serverProcess && !serverProcess.killed) {
      console.log("Terminating server process...");
      serverProcess.kill("SIGTERM");
    }
    if (mainWindow) {
      mainWindow.close();
    }
    app.quit();
  });
}

// =================== SERVER STARTUP (MAIN FIX) ============================================
function showError(title, message) {
  try {
    dialog.showErrorBox(title, message);
  } catch (error) {
    logError("Failed to show error dialog:", error);
    console.error(`${title}: ${message}`);
  }
}

// =================== APP EVENT HANDLERS ============================================

app.on("ready", async () => {
  try {
    log("App is ready");
    createWindow();
    log("Creating main window...");
  } catch (error) {
    logError("Failed to start application:", error);
    showError(
      "Startup Error",
      `Failed to start application: ${error.message}\n\n` +
        `This could be due to:\n` +
        `• Missing Node.js runtime\n` +
        `• Corrupted installation files\n` +
        `• Port ${port} already in use\n` +
        `• Missing dependencies\n\n` +
        `Try restarting the application or contact support.`
    );
    app.quit();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("before-quit", () => {
  if (serverProcess && !serverProcess.killed) {
    log("Terminating server process...");
    serverProcess.kill("SIGTERM");
  }
});

app.on("will-quit", (event) => {
  if (serverProcess && !serverProcess.killed) {
    event.preventDefault();
    serverProcess.kill("SIGTERM");
    setTimeout(() => {
      if (serverProcess && !serverProcess.killed) {
        serverProcess.kill("SIGKILL");
      }
      app.quit();
    }, 2000);
  }
});

process.on("uncaughtException", (error) => {
  logError("Uncaught Exception:", error);
  if (!isDev) {
    showError(
      "Application Error",
      `An unexpected error occurred: ${error.message}`
    );
  }
  app.quit();
});

process.on("unhandledRejection", (reason, promise) => {
  logError("Unhandled Rejection:", reason);
});
