const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  ping: () => "pong",
  sendMessage: (message) => ipcRenderer.send("message", message),
  onMessage: (callback) =>
    ipcRenderer.on("message", (event, message) => callback(message)),

  // mutations
  addCase: (data) => ipcRenderer.invoke("case-add", data),

  // query
  findCases: (query) => ipcRenderer.invoke("cases-find", query),
  findCasesGrouped: (query) => ipcRenderer.invoke("cases-filter", query),
  getStatsSummary: (query) => ipcRenderer.invoke("cases-summary", query),
});
