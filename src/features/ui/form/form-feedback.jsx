import styled from 'styled-components'

function VanillaFormFeedback({ className, feedback }) {
  return (
    <p className={className} type={feedback.type}>
      {feedback.message}
    </p>
  )
}

export const FormFeedback = styled(VanillaFormFeedback).attrs({
  clasName: 'feedback',
})`
  color: ${({ type }) => (type === 'success' ? 'green' : 'red')};
  height: 2rem;
  text-align: left;
`
