import styled from 'styled-components'

function VanillaButton({
  className,
  onClick,
  text = 'click',
  type = 'button',
}) {
  return (
    <button className={className} onClick={onClick} type={type}>
      {text}
    </button>
  )
}

export const Button = styled(VanillaButton)`
  & {
    background-color: dodgerblue;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    padding: 0.5rem;
  }
  &:hover {
    box-shadow: inset 0 0 0 2rem rgba(0, 0, 0, 0.15);
  }
`
