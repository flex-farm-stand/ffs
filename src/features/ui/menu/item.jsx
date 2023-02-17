import { Link } from 'react-router-dom'
import styled from 'styled-components'

function VanillaMenuItem({ className, children, Icon, onClick, to }) {
  const innerElement = to ? (
    <Link to={to}>
      {Icon && <Icon />}
      <span>{children}</span>
    </Link>
  ) : (
    <button onClick={onClick}>
      {Icon && <Icon />}
      <span>{children}</span>
    </button>
  )

  return <li className={className}>{innerElement}</li>
}

export const Item = styled(VanillaMenuItem).attrs({ className: 'menu-item' })`
  a {
    display: block;
    text-decoration: none;
  }
  a: hover {
    text-decoration: none;
  }
  button {
    background-color: inherit;
    border: none;
    padding: 0;
    text-align: left;
  }
  a,
  button {
    color: ${({ theme }) => theme.menu.text};
    cursor: pointer;
    display: flex;
    user-select: none;
    width: 100%;
  }
  }
  svg {
    margin-right: 10px;
  }
`
