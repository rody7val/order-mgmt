import { getCurrentOrder } from './currentOrderStore'

export function getActiveItemCount() {
  const order = getCurrentOrder()

  return order.activeItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  )
}
