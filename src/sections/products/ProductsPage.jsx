import { useEffect, useState } from 'react'
import { PRODUCT_CATEGORIES } from './categories'
//electron
import { generatePdfFromProducts } from '@/modules/tickets/application/generatePdf'
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
import { ConfirmModal } from '@/sections/modal/ConfirmModal'
import { PdfPreviewModal } from './PdfPreviewModal'

const repo = new DexieProductRepository()

export function ProductsPage() {
  const [showInactive, setShowInactive] = useState(false)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [products, setProducts] = useState([])
  const { openModal, closeModal } = useModal()
  //tickets notifications
  const [pdfInfo, setPdfInfo] = useState(null)

  async function load() {
    setProducts(await getAllProducts(repo)())
  }

  useEffect(() => {
    load()
  }, [])

  async function printProductsPdf(items) {
    const html = generatePdfFromProducts(items)
    return window.electron.printHtmlToPdf(html)
  }
  
  async function activeProduct(product) {
    product.active = true
    product.updatedAt = Date.now()
    await repo.update(product)
    load()
  }
  
  function openCreate() {
    openModal(
      <ProductForm
        key={Date.now()}
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

  function confirmDelete(product) {
    openModal(
      <ConfirmModal
        key={product.id}
        title='Eliminar producto'
        message={`Eliminar ${product.name}?`}
        onCancel={closeModal}
        onConfirm={async () => {
          await remove(product.id)
          closeModal()
        }}
      />
    )
  }

  function confirmBan(product) {
    openModal(
      <ConfirmModal
        key={product.id}
        title='Quitar producto'
        message={`Quitar  ${product.name}?`}
        onCancel={closeModal}
        onConfirm={async () => {
          product.active = false
          await ban(product)
          closeModal()
        }}
      />
    )
  }

  function confirmExportPdf() {
    openModal(
      <ConfirmModal
        key={Date.now()}
        title='¿Generar PDF?'
        message='Se creará un archivo con los productos actuales'
        onCancel={closeModal}
        onConfirm={async () => {
          await printProductsPdf(filteredProducts)
          closeModal()
        }}
      />
    )
  }
  
  async function openViewPdf() {
    let result = await printProductsPdf(filteredProducts)
    await window.electron.previewPdf(result.path)
  /*console.log(result.path)
    openModal(
      <PdfPreviewModal
        key={Date.now()}
        path={result.path}
        onClose={() => {
          closeModal()
        }}
      />,
      'Vista PDF'
    )*/
  }

  async function remove(id) {
    await deleteProduct(repo)(id)
    load()
  }
  async function ban(product) {
    await updateProduct(repo)(product)
    load()
  }

  //filters
  const filteredProducts = products
    .filter(product => {
      if (!showInactive) return product.active !== false
      return true
    })
    .filter(p => { //by category
      const matchesCategory =
        !categoryFilter || p.category === categoryFilter

      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase())

      return matchesCategory && matchesSearch
  })


  return (
    <div>
      <h2>🛒 Productos </h2>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <input
          placeholder="🔍 Buscar producto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="">☰ Todas</option>
          {PRODUCT_CATEGORIES.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button onClick={openCreate}>+ Nuevo producto</button>

        <label style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={showInactive}
            onChange={e => setShowInactive(e.target.checked)}
          />
          Mostrar inactivos
        </label>
      </div>

      {filteredProducts.length ? filteredProducts.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={() => openEdit(product)}
          onDelete={() => confirmDelete(product)}
          onBan={() => confirmBan(product)}
          onActive={() => activeProduct(product)}
        />
      )): "🧩 Ningun elemento aún..."}

      <br/>
      <button onClick={confirmExportPdf}>
        ⬇️ Exportar a PDF
      </button>
      <button onClick={openViewPdf}>
        👀 Vista impresión
      </button>

    </div>
  )
}
