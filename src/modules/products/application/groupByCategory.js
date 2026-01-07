export function groupByCategory(products) {
  return products.reduce((acc, product) => {
    const category = product.category || 'Otros'

    if (!acc[category]) {
      acc[category] = []
    }

    acc[category].push(product)
    return acc
  }, {})
}
