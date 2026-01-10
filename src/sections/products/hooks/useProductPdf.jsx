import { generateTicket } from '@/modules/tickets/app/generateTicket'

export function useProductPdf() {
  async function preview(products) {
    if (!products?.length) return

    const html = generateTicket(products)
    // create pdf file
    const result = await window.electron.printHtmlToPdf(html)
    // view pdf file
    await window.electron.previewPdf(result.path)
  }

  return {
    preview
  }
}
