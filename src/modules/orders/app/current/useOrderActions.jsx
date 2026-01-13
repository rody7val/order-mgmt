import { OrderModal } from '@/sections/modal/OrderModal'

export function useOrderActions(modal) {
  const { openModal, closeModal } = modal

  function openOrder() {
    openModal(
      <OrderModal onClose={closeModal} />,
      'Comanda activa'
    )
  }

  return {
    openOrder
  }
}
