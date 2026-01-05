import { useEffect, useState } from 'react'
import { PRODUCT_CATEGORIES } from './categories'
//db
import { DexieProductRepository } from '@/modules/products/infrastructure/DexieProductRepository'
//crud
import { getAllProducts } from '@/modules/products/application/getAll/getAllProducts'
import { createProduct } from '@/modules/products/application/create/createProduct'
import { deleteProduct } from '@/modules/products/application/delete/deleteProduct'
import { updateProduct } from '@/modules/products/application/update/updateProduct'
//components
import { ProductForm } from '@/sections/products/ProductForm'
import { ProductCard } from '@/sections/products/ProductCard'
import { useModal } from '@/sections/modal/ModalContext'

const repo = new DexieProductRepository()

export function ProductsPage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [products, setProducts] = useState([])
  const { openModal, closeModal } = useModal()

  async function load() {
    setProducts(await getAllProducts(repo)())
  }

  useEffect(() => {
    load()
  }, [])

  function openCreate() {
    openModal(
      <ProductForm
        key='new'
        onSubmit={async data => {
          await createProduct(repo)(data)
          closeModal()
          load()
        }}
      />,
      'Nuevo producto'
    )
  }

  function openEdit(product) {
    openModal(
      <ProductForm
        key={product?.id || 'new'}
        initialData={product}
        onSubmit={async data => {
          await updateProduct(repo)(data)
          closeModal()
          load()
        }}
      />,
      'Editar producto'
    )
  }

  async function remove(id) {
    await deleteProduct(repo)(id)
    load()
  }

  //filters
  const filteredProducts = products.filter(product => {
    const matchesCategory =
      !categoryFilter || product.category === categoryFilter

    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <div>
      <h2>Productos</h2>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <input
          placeholder="Buscar producto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="">Todas</option>
          {PRODUCT_CATEGORIES.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button onClick={openCreate}>+ Nuevo producto</button>
      </div>

      {filteredProducts.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={() => openEdit(product)}
          onDelete={() => remove(product.id)}
        />
      ))}

      {/*products.map(p => (
        <div key={p.id}>
          {p.name} - ${p.price} {p.category}
          <button onClick={() => openEdit(p)}>Editar</button>  
          <button onClick={() => remove(p.id)}>Eliminar</button>
        </div>
      ))*/}
    </div>
  )
}
