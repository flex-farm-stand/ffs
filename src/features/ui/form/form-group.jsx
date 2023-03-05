import styled from 'styled-components'

function VanillaFormGroup({
  autoFocus = false,
  className,
  label = false,
  labelText = 'Label text',
  onChange,
  placeholder = '',
  type = 'text',
  value,
}) {
  return (
    <div className={className}>
      {label && <label>{labelText}</label>}
      <input
        autoFocus={autoFocus}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  )
}

export const FormGroup = styled(VanillaFormGroup).attrs({
  className: 'form-group',
})``
