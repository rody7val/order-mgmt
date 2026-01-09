export class Order {
  constructor() {
    this.items = []
    this.status = 'open'
    this.createdAt = new Date()
  }

  addItem(orderItem) {
    const existing = this.items.find(
      i => i.productId === orderItem.productId && i.active
    )

    if (existing) {
      existing.increment()
    } else {
      this.items.push(orderItem)
    }
  }

  get activeItems() {
    return this.items.filter(i => i.active)
  }

  get total() {
    return this.activeItems.reduce(
      (sum, item) => sum + item.total,
      0
    )
  }
}
