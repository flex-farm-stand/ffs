import styled from 'styled-components'

import { ReactComponent as LogoImage } from './logo.svg'

const LogoContainer = styled.div`
  align-items: center;
  display: flex;
  padding: 2px;
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

export function Logo({ className, displayText = false }) {
  return (
    <LogoContainer className={className}>
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
