const electron = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

const { BrowserWindow, app } = electron;

let bgWindow;
let mainWindow;

function createWindow() {
  bgWindow = new BrowserWindow({
    width: 0,
    height: 0,
    frame: false,
    resizable: false,
    transparent: true,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    focusable: false,
    fullscreenable: false,
    title: 'Kitsu Launcher',
    autoResize: true,
  });
  mainWindow = new BrowserWindow({
    width: 600,
    height: 500,
    frame: false,
    resizable: false,
    transparent: true,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    fullscreenable: false,
    title: 'Kitsu Launcher',
    autoResize: true,
    parent: bgWindow,
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => setTimeout(createWindow, 500));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
