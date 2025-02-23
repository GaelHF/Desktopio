const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');

const sizes = {
    width: 1280,
    height: 720
}

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'icon.ico'),
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('src/index.html');

    ipcMain.on('open-game', (event, url, icon_name) => {
        let gameWindow = new BrowserWindow({
            width: sizes.width,
            height: sizes.height,
            icon: path.join(__dirname, 'src/assets/', icon_name),
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: false
            }
        });
        gameWindow.loadURL(url);
    });

    ipcMain.on('open-author-page', (event, url) => {
        shell.openExternal(url);
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});