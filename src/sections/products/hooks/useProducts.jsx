import { useEffect, useState } from 'react'
import { getAllProducts } from '@/modules/products/app/getAll/getAllProducts'

export function useProducts(repo) {
  const [products, setProducts] = useState([])

  async function load() {
    const result = await getAllProducts(repo)()
    setProducts(result)
  }

  useEffect(() => {
    load()
  }, [])

  return {
    products,
    reload: load
  }
}
