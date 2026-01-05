export function updateProduct(productRepository) {
  return async function (data) {
    if (!data.id) {
      throw new Error('ID obligatorio')
    }

    if (!data.name || data.name.trim() === '') {
      throw new Error('Nombre obligatorio')
    }

    if (data.price <= 0) {
      throw new Error('Precio inválido')
    }

    return productRepository.update({
      id: data.id,
      name: data.name,
      price: data.price,
      category: data.category,
      active: data.active ?? true
    })
  }
}
