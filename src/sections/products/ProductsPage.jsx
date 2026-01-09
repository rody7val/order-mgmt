import { useProducts } from '@/sections/products/hooks/useProducts'
import { useProductFilters } from '@/sections/products/hooks/useProductFilters'
import { PRODUCT_CATEGORIES } from './categories'
import { groupAndSortProducts } from '@/modules/products/app/groupAndSort/groupAndSortProducts'

//electron
import { generateTicket } from '@/modules/tickets/app/generateTicket'
//db
import { DexieProductRepository } from '@/modules/products/infrastructure/DexieProductRepository'
//crud
import { createProduct } from '@/modules/products/app/create/createProduct'
import { deleteProduct } from '@/modules/products/app/delete/deleteProduct'
import { updateProduct } from '@/modules/products/app/update/updateProduct'
//components
import { ProductForm } from '@/sections/products/ProductForm'
import { ProductCard } from '@/sections/products/ProductCard'

import { OrderButton } from '@/sections/orders/OrderButton'
import { useModal } from '@/sections/modal/ModalContext'
import { ConfirmModal } from '@/sections/modal/ConfirmModal'

import { addItemToOrder } from '@/modules/orders/app/current/addItemToOrder'

const repo = new DexieProductRepository()

export function ProductsPage() {
  const { products, reload } = useProducts(repo)
  const filters = useProductFilters(products)
  const { openModal, closeModal } = useModal()

  async function printProductsPdf(items) {
    const html = generateTicket(items)
    return window.electron.printHtmlToPdf(html)
  }
  
  async function activeProduct(product) {
    product.active = true
    product.updatedAt = Date.now()
    await repo.update(product)
    reload()
  }
  
  function openCreate() {
    openModal(
      <ProductForm
        key={Date.now()}
        onSubmit={async data => {
          await createProduct(repo)(data)
          closeModal()
          reload()
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
          reload()
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
  
  function openOrderModal() {
    openModal(<p>PI</p>)
  }

  // order
  async function addProduct (p) {
    return await addItemToOrder(p)
  }

  // pdf
  async function openViewPdf() {
    let result = await printProductsPdf(filters.filtered)
    await window.electron.previewPdf(result.path)
  }

  async function remove(id) {
    await deleteProduct(repo)(id)
    reload()
  }
  async function ban(product) {
    await updateProduct(repo)(product)
    reload()
  }

  const groupedProducts = groupAndSortProducts(filters.filtered)

  return (
    <div>
      <h2>🛍️ Productos </h2>
      <OrderButton
        openOrder={openOrderModal}
      >
      </OrderButton>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <input
          placeholder="🔍 Buscar producto..."
          value={filters.search}
          onChange={e => filters.setSearch(e.target.value)}
        />

        <select
          value={filters.categoryFilter}
          onChange={e => filters.setCategory(e.target.value)}
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
            checked={filters.showInactive}
            onChange={e => filters.setShowInactive(e.target.checked)}
          />
          Mostrar inactivos
        </label>
      </div>

      {filters.filtered.length ? Object.entries(groupedProducts).map(([category, ps]) => (
        <div key={category} className="category-group">
          <h3 className="category-title">{category}</h3>

          <div className="ps-grid">
            {ps.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={() => openEdit(product)}
                onDelete={() => confirmDelete(product)}
                onBan={() => confirmBan(product)}
                onActive={() => activeProduct(product)}
                onAdd={() => addProduct(product)}
              />
            ))}
          </div>
        </div>
      )): "🧩 Ningun elemento aún..."}

      <br/>
      <button onClick={openViewPdf}>
        👀 Ver / Imprimir catálogo
      </button>

    </div>
  )
}
