export function getProduct(productRepository) {
  return async function (id) {
    if (!id) {
      throw new Error('ID requerido')
    }

    return productRepository.getById(id)
  }
}
