import { forwardRef } from 'react'

export const InputLabelPair = forwardRef(
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
    <div className={`${className} input-label-pair`}>
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
InputLabelPair.displayName = 'InputLabePair'
