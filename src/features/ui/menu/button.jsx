import { useContext } from 'react'
import styled from 'styled-components'

import { MenuContext } from './menu-context'

function VanillaButton({ className, children }) {
  const menu = useContext(MenuContext)

  return (
    <button className={className} onClick={menu.toggle}>
      {children}
    </button>
  )
}

export const Button = styled(VanillaButton).attrs({ className: 'menu-button' })`
  & {
    align-items: center;
    background-color: inherit;
    cursor: pointer;
    border: none;
    display: flex;
    justify-content: center;
    padding: 4px;
  }
  svg {
    height: 24px;
    width: 24px;
  }
`
