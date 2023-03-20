import { forwardRef } from 'react'

import styled from 'styled-components'

const VanillaFormGroup = forwardRef(
  (
    {
      autoFocus = false,
      className,
      label = '',
      onChange,
      placeholder = '',
      type = 'text',
      value,
    },
    ref
  ) => (
    <div className={className}>
      {label && <label>{label}</label>}
      <input
        autoFocus={autoFocus}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
        type={type}
        value={value}
      />
    </div>
  )
)
VanillaFormGroup.displayName = 'VanillaFormGroup'

export const FormGroup = styled(VanillaFormGroup).attrs({
  className: 'form-group',
})``
