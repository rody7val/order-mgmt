export class Product {
  constructor({ id, name, price, category, active = true }) {
    this.id = id
    this.name = name
    this.price = price
    this.category = category
    this.active = active
  }
}
