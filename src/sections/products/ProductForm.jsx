import { useState } from 'react'

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
        <input value={category} onChange={e => setCategory(e.target.value)} />
      </label>

      <button type="submit">Guardar</button>
    </form>
  )
}
