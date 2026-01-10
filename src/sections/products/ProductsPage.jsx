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
import { useModal } from '@/sections/modal/ModalContext'
//component
import { ProductCard } from '@/sections/products/ProductCard'
import { ProductToolbar } from '@/sections/products/ProductToolbar'
import { OrderButton } from '@/sections/orders/OrderButton'


export function ProductsPage() {
  const repo = useMemo(() => new DexieProductRepository(), [])
  const modal = useModal()

  const { products, reload } = useProducts(repo)
  const filters = useProductFilters(products)
  const actions = useProductActions(repo, reload, modal)

  //const pdf = useProductPdf
  const grouped = groupAndSortProducts(filters.filtered)

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

  return (
    <div>
      <h2>🛍️ Productos </h2>
      <OrderButton openOrder={openOrderModal}></OrderButton>

      <ProductToolbar {...filters} onCreate={actions.openCreate} />

      {filters.filtered.length ? Object.entries(grouped).map(([category, _products]) => (
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
      
      <br />
      <button onClick={openViewPdf}>
        👀 Ver / Imprimir catálogo
      </button>

    </div>
  )
}
