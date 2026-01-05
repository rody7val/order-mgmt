//import './modal.css'

export function Modal({ open, title, onClose, children }) {
  if (!open) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <header className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose}>×</button>
        </header>
        <section className="modal-body">
          {children}
        </section>
      </div>
    </div>
  )
}
