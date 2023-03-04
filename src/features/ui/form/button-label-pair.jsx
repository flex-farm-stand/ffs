export function ButtonLabelPair({ children, label = '' }) {
  return (
    <div className="button-label-pair">
      {label && <label>{label}</label>}
      {children}
    </div>
  )
}
