import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { Logo } from '@/features/ui'
import { StyledMenu } from './styled-menu'

const pagesWithoutNav = ['/login', '/signup']

// ---
const NavBody = styled.div.attrs({ className: 'nav-body' })`
  align-items: center;
  background-color: inherit;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 600px;
`

// ---
const NavRoot = styled.nav.attrs({ className: 'nav-root' })`
  background-color: ${({ theme }) => theme.nav.bg};
  color: ${({ theme }) => theme.nav.text};
`

// ---
function VanillaLogoLink({ className }) {
  return (
    <Link className={className} to="/">
      <Logo displayText={true} />
    </Link>
  )
}
const LogoLink = styled(VanillaLogoLink).attrs({ className: 'logo-link' })`
  color: ${({ theme }) => theme.nav.text};
  text-decoration: none;
`

// ---
export function Nav() {
  const location = useLocation()

  // Hide nav on specific pages
  if (pagesWithoutNav.includes(location.pathname)) {
    return null
  }

  return (
    <NavRoot>
      <NavBody>
        <LogoLink />
        <StyledMenu />
      </NavBody>
    </NavRoot>
  )
}
