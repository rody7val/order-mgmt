const { app, ipcMain, BrowserWindow } = require('electron')
const fs = require('fs')
const path = require('path')

let win

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
  
  //load server
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {//or file
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

function registerIpc() {
  ipcMain.handle('print-html-to-pdf', async (_event, htmlContent) => {
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

      let now = Date.now()
      let pathName = new Date(now).toLocaleString().split(", ")[0].replaceAll("/", "-")
      const outputPath = path.join(app.getAppPath('temp'), `files/${pathName}-productos-${now}.pdf`)
      
      fs.writeFileSync(outputPath, pdf)

      win.close()

      return {//catch path needs to preview and download
        path: outputPath, 
        createdAt: Date.now()
      }
    } catch (err) {
      console.error('PDF error:', err)
    }
  })
}

function registerView() {
  ipcMain.handle('preview-pdf', async (_e, pdfPath) => {
    const previewWin = new BrowserWindow({
      width: 420,
      height: 600,
      webPreferences: {
        plugins: true
      }
    })

    await previewWin.loadURL(`file://${pdfPath}`)
  })
}

app.whenReady().then(() => {
  registerIpc()
  registerView()
  createWindow()
})
