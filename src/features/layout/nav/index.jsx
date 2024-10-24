import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'

import { LogoLink } from '@/features/ui'
import { MenuColor } from './menu-color'
import { MenuGeneral } from './menu-general'

const pagesWithoutNav = ['/login', '/signup']

// ---
const NavBody = styled.div.attrs({ className: 'nav-body' })`
  align-items: center;
  background-color: inherit;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 600px;
  padding: 0 5px;
`

const NavBodyRight = styled.div.attrs({ className: 'nav-body-right' })`
  display: flex;
  gap: 5px;
`

// ---
const NavRoot = styled.nav.attrs({ className: 'nav-root' })`
  background-color: ${({ theme }) => theme.nav.bg};
  color: ${({ theme }) => theme.nav.text};
`

// ---
export function Nav() {
  const location = useLocation()
  const themeContext = useContext(ThemeContext)

  // Hide nav on specific pages
  if (pagesWithoutNav.includes(location.pathname)) {
    return null
  }

  return (
    <NavRoot>
      <NavBody>
        <LogoLink color={themeContext.nav.text} displayText={true} />
        <NavBodyRight>
          <MenuColor />
          <MenuGeneral />
        </NavBodyRight>
      </NavBody>
    </NavRoot>
  )
}
