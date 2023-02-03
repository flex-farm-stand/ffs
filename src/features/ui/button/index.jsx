export function Button({ onClick, text = 'click', type = 'button' }) {
  return (
    <button onClick={onClick} type={type}>
      {text}
    </button>
  )
}
