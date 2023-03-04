import styled from 'styled-components'

function VanillaButton({ children, className, onClick, type = 'button' }) {
  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  )
}

export const Button = styled(VanillaButton).attrs((props) => ({
  button: props.theme.button[props.style || 'reg'],
}))`
  & {
    background-color: ${(props) => props.button.bg};
    border: ${(props) => props.button.border};
    border-radius: 5px;
    color: ${(props) => props.button.text};
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 0.5rem;
  }
  &:hover {
    box-shadow: ${(props) => props.button.hoverShadow};
  }
`
