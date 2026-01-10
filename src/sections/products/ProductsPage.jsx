import { useMemo } from 'react';
//db
import { DexieProductRepository } from '@/modules/products/infrastructure/DexieProductRepository'
//group & sort
import { groupAndSortProducts } from '@/modules/products/app/groupAndSort/groupAndSortProducts'
//order-item
import { addItemToOrder } from '@/modules/orders/app/current/addItemToOrder'
//hooks
import { useProducts } from '@/sections/products/hooks/useProducts'
import { useProductFilters } from '@/sections/products/hooks/useProductFilters'
import { useProductActions } from '@/sections/products/hooks/useProductActions'
import { useProductPdf } from '@/sections/products/hooks/useProductPdf'
import { useModal } from '@/sections/modal/ModalContext'
//component
import { ProductToolbar } from '@/sections/products/ProductToolbar'
import { ProductList } from '@/sections/products/ProductList'
import { OrderButton } from '@/sections/orders/OrderButton'


export function ProductsPage() {
  const repo = useMemo(() => new DexieProductRepository(), [])
  const modal = useModal()

  const { products, reload } = useProducts(repo)
  const filters = useProductFilters(products)
  const actions = useProductActions(repo, reload, modal)

  const pdf = useProductPdf()
  const grouped = groupAndSortProducts(filters.filtered)

  function openOrderModal() {
    //openModal(<p>PI</p>)
    console.log("openOrderModal")
  }

  return (
    <>
      <h2>🛍️ Productos </h2>

      <ProductToolbar {...filters} onCreate={actions.openCreate} />
      <OrderButton openOrder={openOrderModal} />

      <ProductList
        groupedProducts={grouped}
        onAdd={addItemToOrder}
        {...actions}
      />

      <button onClick={() => pdf.preview(filters.filtered)}>
        👀 Ver / Imprimir catálogo
      </button>

    </>
  )
}
