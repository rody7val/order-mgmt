export function groupAndSortProducts(products) {
  const grouped = {}

  products.reverse().forEach(product => {
    const category = product.category || 'Otros'
    if (!grouped[category]) grouped[category] = []
    grouped[category].push(product)
  })

  Object.keys(grouped).forEach(category => {
    grouped[category].sort((a, b) =>
      a.name.localeCompare(b.name)
    )
  })

  return grouped
}
