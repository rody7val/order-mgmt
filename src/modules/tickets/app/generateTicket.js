import { formatDate } from '@/shared/date'

export function generateTicket(grouped) {
  let html = `
  <div class="ticket">
    <div class="header">${formatDate(Date.now())}</div>
    <hr/>
    <br/>
  `

  for (const category in grouped) {
    html += `<div class="category">${category}</div>`

    grouped[category].forEach(product => {
      html += `
        <div class="item">
          <span class="item-name">${product.name}</span>
          <span class="item-price">$${product.price}</span>
        </div>
      `
    })
  }

  html += `</div>`
  return html
}
