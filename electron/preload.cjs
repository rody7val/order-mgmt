const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  printHtmlToPdf: (html) =>
    ipcRenderer.invoke('print-html-to-pdf', html),

  previewPdf: (path) =>
    ipcRenderer.invoke('preview-pdf', path),
  
  openPath: (path) =>
    shell.openPath(path)
})

