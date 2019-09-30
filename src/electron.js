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
    autoResize: true,
  });

  mainWindow = new BrowserWindow({
    width: 600,
    height: 500,
    frame: false,
    resizable: false,
    show: false,
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
    mainWindow.show();
    mainWindow.setAlwaysOnTop(true);
  }
}

app.on('ready', () => {
  setTimeout(createWindow, 500);
});

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

app.on('ready', () => {
  // Register a 'Alt+Space' shortcut listener.
  globalShortcut.register('Alt+Space', () => toggleWindowVisibility());
});

app.on('will-quit', () => {
  // Unregister a shortcut.
  globalShortcut.unregister('Alt+Space');

  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});
