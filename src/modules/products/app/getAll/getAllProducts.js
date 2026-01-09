export function getAllProducts(productRepository) {
  return async function () {
    return productRepository.getAll()
  }
}
