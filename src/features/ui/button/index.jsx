import styled from 'styled-components'

function VanillaButton({
  children,
  className,
  disabled = false,
  onClick,
  type = 'button',
}) {
  return (
    <button
      className={className}
      onClick={disabled ? null : onClick}
      type={type}
    >
      {children}
    </button>
  )
}

export const Button = styled(VanillaButton).attrs((props) => ({
  button: props.theme.button[props.style] || props.theme.button.regular,
}))`
  & {
    background-color: ${(props) => props.button.bg};
    border: ${(props) => props.button.border};
    border-radius: 5px;
    color: ${(props) => props.button.text};
    cursor: ${(props) => (props.disabled ? 'unset' : 'pointer')};
    display: flex;
    justify-content: center;
    padding: 0.5rem;
  }
  &:hover {
    box-shadow: ${(props) => props.button.hoverShadow};
  }
`
