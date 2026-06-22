const { app, BrowserWindow, Menu } = require('electron');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, 
    }
  });

  mainWindow.loadFile('main/index.html');

  // Top menu bar
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Back to Main Page',
          accelerator: 'CmdOrCtrl+B',
          click: () => {
            mainWindow.loadFile('main/logout.html');
          }
        },
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: () => {
            const { dialog } = require('electron');
            dialog.showMessageBox({
              type: 'info',
              title: 'About This App',
              message: 'This is a custom Electron app.\nCreated with Electron!',
              buttons: ['OK']
            });
          }
        }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);

  // Context menu (right-click)
  const contextMenu = Menu.buildFromTemplate([
    { role: 'cut' },
    { role: 'copy' },
    { role: 'paste' },
    { type: 'separator' },
    {
      label: 'Back to Main Page',
      click: () => {
        mainWindow.loadFile('main/logout.html');
      }
    },
    { type: 'separator' },
    { role: 'reload' }
  ]);

  // Listen for right-click in the window
  mainWindow.webContents.on('context-menu', () => {
    contextMenu.popup();
  });
}

app.whenReady().then(createWindow);