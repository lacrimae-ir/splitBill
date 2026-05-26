import { app, BrowserWindow } from "electron";
import path from "path";
import url from "url";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createMainWindow() {
  console.log("Membuat jendela...");

  const mainWindow = new BrowserWindow({
    title: "Split Bill",
    width: 400,
    height: 480,
    transparent: true,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL("http://localhost:5175");
}

app.whenReady().then(createMainWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
