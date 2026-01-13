import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/sections/layout/AppLayout'
import { ProductsPage } from '@/sections/products/ProductsPage'
import { OrdersPage } from '@/sections/orders/OrdersPage'
import { ClientsPage } from '@/sections/clients/ClientsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <ProductsPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'clients', element: <ClientsPage /> }
    ]
  }
])
