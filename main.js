// Vỏ máy tính cho MAS: mở app/index.html trong một cửa sổ riêng, dữ liệu lưu ngay trên máy.
const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

if (!app.requestSingleInstanceLock()) app.quit();

function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 800, minWidth: 380, minHeight: 560,
    backgroundColor: '#0F172A', autoHideMenuBar: true, title: 'MAS',
    icon: path.join(__dirname, 'build', 'icon.png')
  });
  win.loadFile(path.join(__dirname, 'app', 'index.html'));
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  return win;
}

app.whenReady().then(() => {
  // Menu tối thiểu: giữ phím tắt sao chép, dán, phóng to (cần cho macOS)
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    ...(process.platform === 'darwin' ? [{ role: 'appMenu' }] : []),
    { role: 'editMenu' }, { role: 'viewMenu' }, { role: 'windowMenu' }
  ]));
  let win = createWindow();
  app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
  app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) win = createWindow(); });
});
app.on('window-all-closed', () => app.quit());
