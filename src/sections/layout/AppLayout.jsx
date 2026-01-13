import { Outlet } from 'react-router-dom'
import { TabMenu } from './TabMenu'
import { ModalProvider } from '@/sections/modal/ModalContext'
import '@/assets/global.css'

export function AppLayout() {
  return (
    <ModalProvider>
      <TabMenu />
      <main style={{padding: '20px'}}>
          <Outlet />
      </main>
    </ModalProvider>
  )
}
