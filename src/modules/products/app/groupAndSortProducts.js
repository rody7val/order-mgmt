import { groupByCategory } from '@/modules/products/app/groupByCategory'

export function groupAndSortProducts(products) {
  const grouped = groupByCategory(products.reverse())

  Object.keys(grouped).forEach(category => {
    grouped[category].sort((a, b) =>
      a.name.localeCompare(b.name)
    )
  })

  return grouped
}
