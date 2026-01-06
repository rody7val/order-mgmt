const { app, ipcMain, BrowserWindow } = require('electron')
const fs = require('fs')
const path = require('path')

let win
console.log('DEV URL:', process.env.VITE_DEV_SERVER_URL)

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true
    }
  })

  win.webContents.openDevTools()

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

function registerIpc() {
  ipcMain.on('print-html-to-pdf', async (_event, htmlContent) => {
    try {
      const win = new BrowserWindow({ show: false })

      const templatePath = path.join(
        __dirname,
        '../src/modules/tickets/templates/ticket.html'
      )

      const template = fs.readFileSync(templatePath, 'utf8')

      const fullHtml = template.replace('{{CONTENT}}', htmlContent)

      await win.loadURL(
        'data:text/html;charset=utf-8,' +
          encodeURIComponent(fullHtml)
      )

      const pdf = await win.webContents.printToPDF({
        margins: { top: 0, bottom: 0, left: 0, right: 0 }
      })
      
      const outputPath = path.join(process.cwd(), 'productos.pdf')
      console.log(outputPath)
      fs.writeFileSync(outputPath, pdf)

      win.close()
    } catch (err) {
      console.error('PDF error:', err)
    }
  })
}

app.whenReady().then(() => {
  createWindow()
  registerIpc()
})
