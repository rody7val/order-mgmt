import { useMemo } from 'react';
//db
import { DexieProductRepository } from '@/modules/products/infrastructure/DexieProductRepository'
//group & sort
import { groupAndSortProducts } from '@/modules/products/app/groupAndSort/groupAndSortProducts'
//electron pdf
import { generateTicket } from '@/modules/tickets/app/generateTicket'
//order-item
import { addItemToOrder } from '@/modules/orders/app/current/addItemToOrder'
//hooks
import { useProducts } from '@/sections/products/hooks/useProducts'
import { useProductFilters } from '@/sections/products/hooks/useProductFilters'
import { useProductActions } from '@/sections/products/hooks/useProductActions'
import { PRODUCT_CATEGORIES } from './categories'
import { OrderButton } from '@/sections/orders/OrderButton'
import { useModal } from '@/sections/modal/ModalContext'
//component
import { ProductCard } from '@/sections/products/ProductCard'

export function ProductsPage() {
  const repo = useMemo(() => new DexieProductRepository(), [])
  const modal = useModal()

  const { products, reload } = useProducts(repo)
  const filters = useProductFilters(products)
  const actions = useProductActions(repo, reload, modal)
  
  
  async function printProductsPdf(items) {
    const html = generateTicket(items)
    return window.electron.printHtmlToPdf(html)
  }

  function openOrderModal() {
    //openModal(<p>PI</p>)
    console.log("openOrderModal")
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

        <button onClick={actions.openCreate}>+ Nuevo producto</button>

        <label style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={filters.showInactive}
            onChange={e => filters.setShowInactive(e.target.checked)}
          />
          Mostrar inactivos
        </label>
      </div>

      {filters.filtered.length ? Object.entries(groupedProducts).map(([category, _products]) => (
        <div key={category} className="category-group">
          <h3 className="category-title">{category}</h3>

          <div className="ps-grid">
            {_products.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onEdit={() => actions.openEdit(p)}
                onDelete={() => actions.confirmDelete(p)}
                onBan={() => actions.confirmBan(p)}
                onActive={() => actions.activate(p)}
                //new to order
                onAdd={() => addProduct(p)}
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
