export class OrderItem {
  constructor({
    productId,
    name,
    unitPrice,
    quantity = 1,
    active = true
  }) {
    this.productId = productId
    this.name = name
    this.unitPrice = unitPrice
    this.quantity = quantity
    this.active = active
  }

  increment() {
    this.quantity += 1
  }

  deactivate() {
    this.active = false
  }

  get total() {
    return this.unitPrice * this.quantity
  }
}
