import { useMemo, useState } from 'react'

export function useProductFilters(products) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [showInactive, setShowInactive] = useState(false)

  const filtered = useMemo(() => {
    return products
      .filter(p => showInactive || p.active !== false)
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
