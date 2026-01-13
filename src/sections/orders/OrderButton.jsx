import { useEffect, useState } from 'react'
import { getActiveItemCount } from '@/modules/orders/app/current/getActiveItemCount'
import { on } from '@/shared/eventBus'
import { useModal } from '@/sections/modal/ModalContext'
import { useOrderActions } from '@/modules/orders/app/current/useOrderActions'

export function OrderButton() {
  const modal = useModal()
  const { openOrder } = useOrderActions(modal)

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
