export function createProduct(productRepository) {
  return async function (data) {
    if (!data.name || data.name.trim() === '') {
      throw new Error('El nombre es obligatorio')
    }

    if (data.price == null || data.price <= 0) {
      throw new Error('El precio debe ser mayor a cero')
    }

    return productRepository.create({
      name: data.name.trim(),
      price: data.price,
      category: data.category ?? '',
      active: true,
      createdAt: Date.now(),
      updatedAt: Date.now()
    })
  }
}
