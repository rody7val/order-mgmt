import { useState } from 'react'
import { PRODUCT_CATEGORIES } from './categories'

export function ProductForm({ initialData = {}, onSubmit }) {
  const [name, setName] = useState(initialData.name || '')
  const [price, setPrice] = useState(initialData.price || '')
  const [category, setCategory] = useState(initialData.category || '')

  function handleSubmit(e) {
    e.preventDefault()

    onSubmit({
      ...initialData,
      name,
      price: Number(price),
      category
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre
        <input
          autoFocus
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>

      <label>
        Precio
        <input
          required
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
      </label>

      <label>
        Categoría
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option key="0" value="">Sin categoría</option>
          {PRODUCT_CATEGORIES.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Guardar</button>
    </form>
  )
}
