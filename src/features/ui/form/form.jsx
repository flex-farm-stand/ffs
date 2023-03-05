import styled from 'styled-components'

export const Form = styled.form`
  & {
    border: 1px solid ${({ theme }) => theme.form.border};
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 20% auto;
    max-width: 300px;
    padding: 2rem;
    text-align: center;
  }
  input {
    background-color: ${({ theme }) => theme.form.bg};
    border-radius: 5px;
    border: 2px solid ${({ theme }) => theme.form.border};
    color: ${({ theme }) => theme.form.text};
    padding: 0.4rem;
    width: calc(100% - 0.8rem);
  }
  input:focus,
  button:focus {
    outline: 2px solid powderblue;
  }
`
