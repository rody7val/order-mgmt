import { db } from '@/modules/products/infrastructure/dexie'

export class DexieProductRepository {
  async getAll() {
    return db.products.toArray()
  }

  async getById(id) {
    return db.products.get(id)
  }

  async create(product) {
    return db.products.add({
      ...product,
      active: product.active ?? true
    })
  }

  async update(product) {
    if (!product.id) {
      throw new Error('Product id requerido para update')
    }

    return db.products.put(product)
  }

  async delete(id) {
    return db.products.delete(id)
  }
}
