import { app, BrowserWindow, Menu, ipcMain } from 'electron';
import path from 'node:path'
import Store from 'electron-store';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import {path as jpath }from 'path';

const store = new Store();

// IPC listener
ipcMain.on('electron-store-get', async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on('electron-store-set', async (event, key, val) => {
  store.set(key, val);
});

ipcMain.on('electron-store-clear', async (event) => {
  store.clear();
});

ipcMain.on('change-avatar', async (event, e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const dataUrl = reader.result;
    const base64Data = dataUrl.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    const fileName = `${uuid()}.${file.name.split('.').pop()}`;
    const avatarDir = jpath.join(__dirname, 'avatar');
    if (!fs.existsSync(avatarDir)) {
      fs.mkdirSync(avatarDir);
    }
    const filePath = jpath.join(avatarDir, fileName);
    const writeStream = fs.createWriteStream(filePath);
    writeStream.write(buffer);
    writeStream.end();
    store.set('user.avatar',filePath)
  };
});

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')



let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  console.log('createWindow')
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    minWidth:300,
    minHeight:300,
    width:1000,
    height:700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  let template = [
    {
      label: '帮助',
      submenu: [
        {
          label: '控制台',
          click: () => {
            win?.webContents.openDevTools({ mode: 'right' })
          }
        },
        {label: '关于'}
      ]
    }
  ]

  let m= Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(m)
  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
  console.log('createWindow end')
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// module.exports={
//   store
// }  
app.whenReady().then(createWindow)

