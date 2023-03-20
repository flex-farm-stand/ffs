import styled from 'styled-components'

function VanillaButton({ className, Icon, onClick, text, type = 'button' }) {
  return (
    <button className={className} onClick={onClick} type={type}>
      {Icon && <Icon />}
      {text && text}
    </button>
  )
}

export const Button = styled(VanillaButton).attrs((props) => ({
  button:
    props.style === 'muted' ? props.theme.button.muted : props.theme.button.reg,
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
