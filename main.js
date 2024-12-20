// main.js

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')


// console.log('Hello from Electron 👋')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // Habilita esto para mayor seguridad
      nodeIntegration: false, // Deshabilita nodeIntegration para seguir buenas prácticas
    }
  })

  win.loadFile('index.html')
  // win.loadURL('https://web.whatsapp.com/')
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})