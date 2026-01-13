import { generateTicket } from '@/modules/tickets/app/generateTicket'

export function useProductPdf() {
  async function preview(groupedProducts) {
    if (!Object.keys(groupedProducts).length) {
      return alert("ningun elemento")
    }

    const html = generateTicket(groupedProducts)
    // create pdf file
    const result = await window.electron.printHtmlToPdf(html)
    // view pdf file
    await window.electron.previewPdf(result.path)
  }

  return {
    preview
  }
}
