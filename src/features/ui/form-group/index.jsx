export function FormGroup({
  label = false,
  labelText = 'Label text',
  onChange,
  placeholder = '',
  type = 'text',
  value,
}) {
  return (
    <div>
      {label && <label>{labelText}</label>}
      <input
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  )
}
