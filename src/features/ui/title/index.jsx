import styled from 'styled-components'

function VanillaTitle({ className, text = '' }) {
  return <div className={className}>{text}</div>
}

export const Title = styled(VanillaTitle).attrs({
  className: 'title',
})`
  font-size: 1.5rem;
`
