
const { app, BrowserWindow } = require('electron');
const path = require('path');
const child_process = require('child_process');

let backendProcess = null;

function startBackend() {
  const backend = path.join(__dirname, 'app', 'backend');
  backendProcess = child_process.spawn(
    process.platform === 'win32' ? 'cmd' : 'bash',
    [process.platform === 'win32' ? '/c' : '-c', 'node src/index.js'],
    { cwd: backend, detached: false, stdio: 'ignore' }
  );
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 850,
    webPreferences: { contextIsolation: true }
  });
  win.loadURL("http://localhost:3000");
}

app.whenReady().then(() => {
  startBackend();
  createWindow();
});
