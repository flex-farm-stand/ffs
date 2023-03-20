import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

function VanillaMenuItem({ active, className, children, icon, onClick, to }) {
  const location = useLocation()
  const Icon = icon

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

  return (
    <li
      className={`${
        active || location.pathname === to ? 'selected' : ''
      } ${className}`}
    >
      {innerElement}
    </li>
  )
}

export const Item = styled(VanillaMenuItem).attrs({ className: 'menu-item' })`
  a {
    display: block;
    text-decoration: none;
  }
  a:hover {
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
