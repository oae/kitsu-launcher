const electron = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

const { BrowserWindow, app, globalShortcut } = electron;

let mainWindow;
let screen;

function createWindow() {
  screen = electron.screen;

  mainWindow = new BrowserWindow({
    frame: false,
    resizable: false,
    show: false,
    transparent: true,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
    // skipTaskbar: true,
    fullscreenable: false,
    autoResize: true,
    useContentSize: true,
    hasShadow: false,
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  mainWindow.on('closed', () => {
    app.quit();
  });
}

function toggleWindowVisibility() {
  if (mainWindow.isVisible()) {
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
  }
}

app.on('ready', () => {
  setTimeout(() => {
    createWindow();
    globalShortcut.register('Alt+Space', () => toggleWindowVisibility());
  }, 500);
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  } else {
    mainWindow.show();
  }
});

app.on('will-quit', () => {
  // Unregister a shortcut.
  globalShortcut.unregister('Alt+Space');

  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});
