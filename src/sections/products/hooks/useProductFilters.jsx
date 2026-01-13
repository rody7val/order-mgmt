import { useMemo, useState } from 'react'

export function useProductFilters(products) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [showInactive, setShowInactive] = useState(false)

  const filtered = useMemo(() => {
    return products
      //by active
      .filter(p => showInactive || p.active !== false)
      //by category
      .filter(p => {
        const matchesCategory =
          !category || p.category === category

        const matchesSearch =
          p.name.toLowerCase().includes(search.toLowerCase())

        return matchesCategory && matchesSearch
      })
  }, [products, search, category, showInactive])

  return {
    filtered,
    search, setSearch,
    category, setCategory,
    showInactive, setShowInactive
  }
}
