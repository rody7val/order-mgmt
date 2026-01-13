import { groupByCategory } from './groupByCategory'

export function groupAndSortProducts(products) {
  const grouped = groupByCategory(products)

  Object.keys(grouped).forEach(category => {
    grouped[category].sort((a, b) =>
      a.name.localeCompare(b.name)
    )
  })

  return grouped
}
