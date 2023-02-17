import styled from 'styled-components'

function VanillaFormGroup({
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
