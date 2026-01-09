//import { addItemToOrder } from '@/modules/orders/app/current/addItemToOrder'
//import { getActiveItemCount } from '@/modules/orders/app/current/getActiveItemCount'

export function ProductCard({ product, onEdit, onDelete, onBan, onActive, onAdd }) {

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
      <div style={{display: "contents"}}>
        <span>{product.name}</span>
        <span>${product.price}</span>
      </div>

      <div style={{ display: 'flex', gap: '6px' }}>
        <button onClick={onEdit}>Editar</button>
        {product.active ?
          <>
            <button onClick={onAdd}>Añadir +1</button>
            <button onClick={onBan}>Quitar</button>
          </>
         : <>
            <button onClick={onActive}>Activar</button>
            <button onClick={onDelete}>Eliminar</button>
          </>
        }
      </div>
    </div>
  )
}
