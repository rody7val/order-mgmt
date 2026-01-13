import { getCurrentOrder } from './getCurrentOrder'

export function getActiveItemCount() {
  const order = getCurrentOrder()

  return order.activeItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  )
}
