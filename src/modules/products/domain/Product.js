export class Product {
  constructor({
    id,
    name,
    price,
    category,
    active = true,
    createdAt,
    updatedAt
  }) {
    this.id = id
    this.name = name
    this.price = price
    this.category = category
    this.active = active
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

}
