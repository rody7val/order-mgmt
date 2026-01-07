export function PdfSuccessModal({ open, pdfInfo, onPreview }) {
  if (!open) return null

  return (
    <div className="modal">
      <h3>PDF generado</h3>
      <p>Archivo listo correctamente.</p>

      <button onClick={onPreview}>Ver preview</button>
      <button onClick={() => window.electron.openPath(pdfInfo.path)}>
        Descargar
      </button>
    </div>
  )
}
