import { useEffect, useState } from 'react'
import { getActiveItemCount } from '@/modules/orders/app/current/getActiveItemCount'
import { on } from '@/shared/eventBus'

export function OrderButton({ openOrder }) {
  const [count, setCount] = useState(getActiveItemCount())

  useEffect(() => {
    const off = on('order:updated', () => {
      setCount(getActiveItemCount())
    })

    return off
  }, [])

  return (
    <button onClick={openOrder}>
      🛒 {count}
    </button>
  )
}
