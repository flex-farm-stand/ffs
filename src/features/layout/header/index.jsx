import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { Logo } from '@/features/ui'
import { StyledMenu } from './styled-menu'

const pagesWithoutHeader = ['/login', '/signup']

// ---
const HeaderBody = styled.div.attrs({ className: 'header-body' })`
  align-items: center;
  background-color: inherit;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 600px;
`

// ---
const HeaderRoot = styled.header.attrs({ className: 'header-root' })`
  background-color: ${({ theme }) => theme.header.bg};
  color: ${({ theme }) => theme.header.text};
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
  color: ${({ theme }) => theme.header.text};
  text-decoration: none;
`

// ---
export function Header() {
  const location = useLocation()

  // Hide header on specific pages
  if (pagesWithoutHeader.includes(location.pathname)) {
    return null
  }

  return (
    <HeaderRoot>
      <HeaderBody>
        <LogoLink />
        <StyledMenu />
      </HeaderBody>
    </HeaderRoot>
  )
}
