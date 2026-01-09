import { OrderItem } from '@/modules/orders/domain/OrderItem'
import { getCurrentOrder } from './currentOrderStore'
import { emit } from '@/shared/eventBus'

export function addItemToOrder(product) {
  const order = getCurrentOrder()

  const item = new OrderItem({
    productId: product.id,
    name: product.name,
    unitPrice: product.price
  })

  order.addItem(item)
  emit('order:updated')
}
