import { formatDate } from '@/shared/date'

export function buildProductsTicketHtml(products) {
  const activeProducts = products.filter(p => p.active !== false)

  const itemsHtml = activeProducts
    .map(
      p => `
        <div class="item">
          <span>${p.name}</span>
          <span>$${p.price}</span>
        </div>
      `
    )
    .join('')

  return `
    <h1>LISTA DE PRODUCTOS</h1>

    <div>${formatDate(Date.now())}</div>
    <hr />

    ${itemsHtml}

    <hr />
    <div class="footer">
      Total productos: ${activeProducts.length}
    </div>
  `
}
