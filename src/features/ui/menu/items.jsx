import { useContext } from 'react'
import styled from 'styled-components'

import { MenuContext } from './menu-context'

function VanillaItems({ className, children }) {
  const menu = useContext(MenuContext)
  return (
    <ul
      className={className}
      style={{ display: menu.isOpen ? 'flex' : 'none' }}
    >
      {children}
    </ul>
  )
}

export const Items = styled(VanillaItems).attrs({ className: 'menu-items' })`
  & {
    background-color: ${({ theme }) => theme.menu.bg};
    border: 2px solid ${({ theme }) => theme.menu.border};
    border-radius: 5px;
    color: ${({ theme }) => theme.menu.text};
    flex-direction: column;
    list-style: none;
    position: absolute;
    padding: 0;
    top: 15px;
    width: 125px;
  }
  li {
    align-items: center;
    background-color: inherit;
    border-bottom: 1px solid ${({ theme }) => theme.menu.border};
    display: flex;
    height: 2rem;
    padding: 0 5px;
  }
  li:hover {
    background-color: ${({ theme }) => theme.menu.hoverBg};
  }
  li:first-child {
    border-radius: 5px 5px 0 0;
  }
  li:last-child {
    border-radius: 0 0 5px 5px;
    border-bottom: none;
  }
`