import styled from 'styled-components'

function VanillaItemMultiClick({ className, currentOption, options }) {
  return (
    <li className={className}>
      {options.map((option) => (
        <button
          className={option.value === currentOption ? 'selected' : ''}
          key={option.value}
          onClick={option.onClick}
        >
          {option.label}
        </button>
      ))}
    </li>
  )
}

export const ItemMultiClick = styled(VanillaItemMultiClick).attrs({
  className: 'menu-multi-click-item',
})`
  & {
    align-items: center;
    display: flex;
    flex-direction: row;
  }
  button {
    align-items: center;
    background-color: inherit;
    border: none;
    border-right: 1px solid ${({ theme }) => theme.menu.border};
    color: ${({ theme }) => theme.menu.text};
    cursor: pointer;
    display: flex;
    flex-grow: 1;
    justify-content: center;
    height: 100%;
    user-select: none;
  }
  button:hover {
    background-color: ${({ theme }) => theme.menu.hoverBg};
  }
  button.selected {
    background-color: ${({ theme }) => theme.menu.selectedBg};
    cursor: unset;
  }
  button:first-child {
    border-right: 1px solid ${({ theme }) => theme.menu.border};
  }
  button:last-child {
    border-left: 1px solid ${({ theme }) => theme.menu.border};
  }
`
