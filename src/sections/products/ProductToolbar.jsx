import { PRODUCT_CATEGORIES } from './categories'

export function ProductToolbar({
  search,
  setSearch,
  category,
  setCategory,
  showInactive,
  setShowInactive,
  onCreate
}) {
  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
      <input
        placeholder="🔍 Buscar producto..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        <option value="">☰ Todas</option>
        {PRODUCT_CATEGORIES.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <button onClick={onCreate}>+ Nuevo producto</button>

      <label>
        <input
          type="checkbox"
          checked={showInactive}
          onChange={e => setShowInactive(e.target.checked)}
        />
        Mostrar inactivos
      </label>
    </div>
  )
}
