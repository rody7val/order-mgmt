export function PdfPreviewModal({ path, onClose }) {
  return (
    <div className="modal large">
      <iframe
        src={`file://${path}`}
        width="100%"
        height="100%"
      />
      <button onClick={onClose}>Cerrar</button>
    </div>
  )
}
