import { createProduct } from '@/modules/products/app/create/createProduct'
import { updateProduct } from '@/modules/products/app/update/updateProduct'
import { deleteProduct } from '@/modules/products/app/delete/deleteProduct'
import { ProductForm } from '@/sections/products/ProductForm'
import { ConfirmModal } from '@/sections/modal/ConfirmModal'

export function useProductActions(repo, reload, modal) {
  const { openModal, closeModal } = modal

  function openCreate() {
    openModal(
      <ProductForm
        onSubmit={async data => {
          await createProduct(repo)(data)
          closeModal()
          reload()
        }}
      />,
      'Nuevo producto'
    )
  }

  function openEdit(product) {
    openModal(
      <ProductForm
        initialData={product}
        onSubmit={async data => {
          await updateProduct(repo)(data)
          closeModal()
          reload()
        }}
      />,
      'Editar producto'
    )
  }

  function confirmDelete(product) {
    openModal(
      <ConfirmModal
        title='Eliminar producto'
        message={`Eliminar ${product.name}?`}
        onCancel={closeModal}
        onConfirm={async () => {
          await deleteProduct(repo)(product.id)
          closeModal()
          reload()
        }}
      />
    )
  }

  function confirmBan(product) {
    openModal(
      <ConfirmModal
        title='Quitar producto'
        message={`Quitar ${product.name}?`}
        onCancel={closeModal}
        onConfirm={async () => {
          await updateProduct(repo)({
            ...product,
            active: false,
            updatedAt: Date.now()
          })
          closeModal()
          reload()
        }}
      />
    )
  }

  function activate(product) {
    updateProduct(repo)({
      ...product,
      active: true,
      updatedAt: Date.now()
    }).then(reload)
  }

  return {
    openCreate,
    openEdit,
    confirmDelete,
    confirmBan,
    activate
  }
}
