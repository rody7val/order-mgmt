const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  printHtmlToPdf: html =>
    ipcRenderer.send('print-html-to-pdf', html)
})
