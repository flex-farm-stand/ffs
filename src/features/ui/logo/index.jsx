import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ReactComponent as LogoImage } from './logo.svg'

const LogoContainer = styled.div`
  align-items: center;
  color: ${({ color }) => color};
  display: flex;
  justify-content: center;
  padding: 2px;
  text-align: left;
`

const LogoText = styled.div`
  & {
    display: flex;
    flex-direction: column;
    font-family: BubblerOne;
    font-size: 1.5rem;
    font-weight: bold;
  }
  div {
    margin -4px 0;
  }
`

export function Logo({ className, color = 'cyan', displayText = false }) {
  return (
    <LogoContainer color={color} className={className}>
      <LogoImage />
      {displayText && (
        <LogoText>
          <div>Flex</div>
          <div>Farm Stand</div>
        </LogoText>
      )}
    </LogoContainer>
  )
}

function VanillaLogoLink({
  className,
  color = 'cyan',
  to = '/',
  displayText = false,
}) {
  return (
    <Link className={className} to={to}>
      <Logo color={color} displayText={displayText} />
    </Link>
  )
}

export const LogoLink = styled(VanillaLogoLink).attrs({
  className: 'logo-link',
})`
  &,
  &:hover {
    color: ${({ color }) => color};
    text-decoration: none;
  }
`
