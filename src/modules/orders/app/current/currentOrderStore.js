import { Order } from '@/modules/orders/domain/Order'

let currentOrder = new Order()

export function getCurrentOrder() {
  return currentOrder
}

export function resetCurrentOrder() {
  currentOrder = new Order()
}
