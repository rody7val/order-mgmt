import { ProductCard } from '@/sections/products/ProductCard'

export function ProductList({
  groupedProducts,
  onAdd, //add item to order
  openEdit,
  confirmDelete,
  confirmBan,
  activate
}) {
  if (!Object.keys(groupedProducts).length) {
    return <p>🧩 Ningún elemento aún...</p>
  }

  return (
    <>
      {Object.entries(groupedProducts).map(([category, products]) => (
        <div key={category} className="category-group">
          <h3 className="category-title">{category}</h3>

          <div className="products-grid">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={() => onAdd(product)}//add item +1
                onEdit={() => openEdit(product)}
                onDelete={() => confirmDelete(product)}
                onBan={() => confirmBan(product)}
                onActive={() => activate(product)}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
