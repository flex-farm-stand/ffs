import styled from 'styled-components'

function VanillaFormFeedback({ className, feedback }) {
  return feedback.message && <p className={className}>{feedback.message}</p>
}

export const FormFeedback = styled(VanillaFormFeedback).attrs({
  clasName: 'feedback',
})`
  color: ${({ feedback }) =>
    feedback.status === 'success' ? '#94c973' : 'red'};
  text-align: left;
`
