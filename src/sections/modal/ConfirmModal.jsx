export function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{message}</p>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={onCancel}>Cancelar</button>
        <button onClick={onConfirm}>Confirmar</button>
      </div>
    </div>
  )
}
