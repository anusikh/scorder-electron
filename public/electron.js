const {
  app,
  BrowserWindow,
  ipcMain,
  desktopCapturer,
  dialog,
  shell,
  session,
} = require("electron");
const path = require("path");
const url = require("url");
const { writeFile } = require("fs");

let window = null;

const createWindow = () => {
  // Here, we are grabbing the React url from the env (which is on the start script)
  // const startUrl = "http://localhost:3000";
  // NOTE: DURING BUILD
  const startUrl = url.format({
    // we have included the build folder in "files" in package.json
    pathname: path.join(__dirname, "../build/index.html"),
    protocol: "file:",
    slashes: true,
  });
  window = new BrowserWindow({
    width: 400,
    height: 600,
    autoHideMenuBar: true,
    icon: path.join(__dirname, "../build/scorder.png"),
    webPreferences: {
      nodeIntegration: true,
      // Necessary because by default its true in latest versions of electron
      contextIsolation: false,
    },
  });

  window.loadURL(startUrl);
  window.show();
};

app.on("ready", () => {
  createWindow();
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

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient("electron-fiddle", process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient("electron-fiddle");
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (window) {
      const access_token =
        commandLine[commandLine.length - 1].split("access_token=")[1];

      session.defaultSession.cookies
        .set({
          url: "https://scdr-be-v1.netlify.app",
          name: "access_token",
          value: access_token,
          domain: "scdr-be-v1.netlify.app",
        })
        .then(
          () => {
            console.log("done");
          },
          (err) => {
            console.error(err);
          }
        );
      if (window.isMinimized()) window.restore();
      window.focus();
    }
  });

  app.on("open-url", (event, url) => {
    dialog.showErrorBox("Welcome Back", `You arrived from: ${url}`);
  });
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// Recieve Get Data Event from React code (renderer)
ipcMain.on("GET_SOURCES", async (event, arg) => {
  const sources = await desktopCapturer.getSources({
    types: ["window", "screen"],
  });
  event.sender.send("GET_SOURCES", sources);
});

ipcMain.on("SAVE_FILE", async (event, arg) => {
  const { buffer } = arg;
  const { filePath } = await dialog.showSaveDialog({
    buttonLabel: "Save",
    defaultPath: `scrd-${Date.now()}.mkv`,
  });
  writeFile(filePath, buffer, () => console.log("video saved successfully!"));
});

ipcMain.on("OPEN_AUTH_TAB", (event, arg) => {
  const { authUrl } = arg;
  shell.openExternal(authUrl);
});

ipcMain.on("GET_COOKIES", (event, arg) => {
  const { name } = arg;
  session.defaultSession.cookies
    .get({
      name: name,
    })
    .then((cookies) => {
      event.sender.send("GET_COOKIES", cookies);
    })
    .catch((err) => {
      console.log(err);
    });
});

ipcMain.on("CLOSE_WIN", (event, arg) => {
  app.quit();
});
