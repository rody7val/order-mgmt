export function deleteProduct(productRepository) {
  return async function (id) {
    if (!id) {
      throw new Error('ID requerido para eliminar')
    }

    return productRepository.delete(id)
  }
}
