const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    center: true,
    frame: false,
    fullscreenable: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // TODO: Prevent zooming
  win.webContents.setZoomFactor(1.0);
  win.webContents.setVisualZoomLevelLimits(1, 1);

  win.setFullScreen(true);

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
}

app.whenReady().then(createWindow);

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
