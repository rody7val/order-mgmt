import Dexie from 'dexie'

export const db = new Dexie('pos-db')

db.version(1).stores({
  products: '++id, name, category, price, active'
})
