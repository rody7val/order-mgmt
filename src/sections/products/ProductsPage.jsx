import { useEffect, useState } from 'react'
import { DexieProductRepository } from '@/modules/products/infrastructure/DexieProductRepository'
//crud
import { getAllProducts } from '@/modules/products/application/getAll/getAllProducts'
import { createProduct } from '@/modules/products/application/create/createProduct'
import { deleteProduct } from '@/modules/products/application/delete/deleteProduct'
import { updateProduct } from '@/modules/products/application/update/updateProduct'
//react component
import { ProductForm } from '@/sections/products/ProductForm'
import { useModal } from '@/sections/modal/ModalContext'

const repo = new DexieProductRepository()

export function ProductsPage() {
  const [products, setProducts] = useState([])
  const { openModal, closeModal } = useModal()

  async function load() {
    console.log("now")
    setProducts(await getAllProducts(repo)())
  }

  useEffect(() => {
    load()
  }, [])

  function openCreate() {
    openModal(
      <ProductForm
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

  return (
    <div>
      <h2>Productos</h2>
      <button onClick={openCreate}>Nuevo</button>

      {products.map(p => (
        <div key={p.id}>
          {p.name} - ${p.price} {p.category}
          <button onClick={() => openEdit(p)}>Editar</button>  
          <button onClick={() => remove(p.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  )
}
