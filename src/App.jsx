import { ProductsPage } from '@/sections/products/ProductsPage'
import { ModalProvider } from '@/sections/modal/ModalContext'
import '@/assets/global.css'

export default function App() {
  return (
    <ModalProvider>
      <ProductsPage />
    </ModalProvider>
  )
}
