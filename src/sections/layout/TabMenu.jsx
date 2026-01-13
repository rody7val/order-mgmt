import { NavLink } from 'react-router-dom'

export function TabMenu() {
  return (
    <nav style={{ display: 'flex', gap: '24px', padding: '20px', 'font-size': '24px'  }}>
      <NavLink to="/products">🛍️ Productos</NavLink>
      <NavLink to="/orders">🧾 Órdenes</NavLink>
      <NavLink to="/clients">👤 Clientes</NavLink>
    </nav>
  )
}
