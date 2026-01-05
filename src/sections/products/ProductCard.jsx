export function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        padding: '8px',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div>
        <strong>{product.name}</strong>
        <div style={{ fontSize: '0.9em', color: '#666' }}>
          {product.category || 'Sin categoría'} · ${product.price}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '6px' }}>
        <button onClick={onEdit}>Editar</button>
        <button onClick={onDelete}>Eliminar</button>
      </div>
    </div>
  )
}
