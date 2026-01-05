import { createContext, useContext, useState } from 'react'
import { Modal } from './Modal'

const ModalContext = createContext()

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null)

  function openModal(content, title = '') {
    setModal({ content, title })
  }

  function closeModal() {
    setModal(null)
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal
        open={!!modal}
        title={modal?.title}
        onClose={closeModal}
      >
        {modal?.content}
      </Modal>
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext)
}
