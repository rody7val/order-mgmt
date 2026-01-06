export function ProductCard({ product, onEdit, onDelete, onBan, onActive }) {
  return (
    <div
      style={{
        background: `${product.active ? "#fff" : "#ddd"}`,
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
        {product.active ? 
          <button onClick={onBan}>Quitar</button>
         : <div>
            <button onClick={onActive}>Activar</button>
            <button onClick={onDelete}>Eliminar</button>
          </div>
        }
      </div>
    </div>
  )
}
