import { useEffect, useState } from 'react'
import { getCurrentOrder } from '@/modules/orders/app/current/getCurrentOrder'
import { on } from '@/shared/eventBus'

export function OrderModal({ onClose }) {
  const [order, setOrder] = useState(getCurrentOrder())

  useEffect(() => {
    const off = on('order:updated', () => {
      setOrder(getCurrentOrder())
    })

    return off
  }, [])

  if (!order || !order.items.length) {
    return (
      <div>
        <p>🛒 No hay productos en la comanda</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    )
  }

  return (

    <div>
      <ul>
        {order.items.map(item => (
          <li key={item.id}>
            {item.quantity} × {item.name} — ${item.unitPrice}
          </li>
        ))}
      </ul>{console.log(order.items)}

      <hr />

      <strong>Total: ${order.total}</strong>

      <div style={{ marginTop: 12 }}>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  )
}
