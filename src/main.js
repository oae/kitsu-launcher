const electron = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

const { BrowserWindow, app, globalShortcut } = electron;

let bgWindow;
let mainWindow;
let screen;

function createWindow() {
  screen = electron.screen;

  bgWindow = new BrowserWindow({
    width: 0,
    height: 0,
    frame: false,
    show: false,
    resizable: false,
    transparent: true,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    focusable: false,
    fullscreenable: false,
    useContentSize: true,
    autoResize: true,
  });

  mainWindow = new BrowserWindow({
    frame: false,
    resizable: false,
    show: false,
    transparent: true,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    fullscreenable: false,
    autoResize: true,
    useContentSize: true,
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

  bgWindow.on('closed', () => {
    bgWindow = null;
    mainWindow = null;
  });
}

function toggleWindowVisibility() {
  if (mainWindow.isVisible()) {
    bgWindow.hide();
    mainWindow.hide();
  } else {
    const currentDisplay = screen.getDisplayNearestPoint(
      screen.getCursorScreenPoint()
    );
    mainWindow.setPosition(
      currentDisplay.bounds.x + 50,
      currentDisplay.bounds.y + 50
    );
    mainWindow.center();
    mainWindow.setAlwaysOnTop(true);
    mainWindow.show();
    bgWindow.show();
  }
}

app.on('ready', () => {
  setTimeout(() => {
    createWindow();
    globalShortcut.register('Alt+Space', () => toggleWindowVisibility());
  }, 500);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null || bgWindow === null) {
    createWindow();
  } else {
    mainWindow.show();
    bgWindow.show();
  }
});

app.on('will-quit', () => {
  // Unregister a shortcut.
  globalShortcut.unregister('Alt+Space');

  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});
