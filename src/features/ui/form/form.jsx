import styled from 'styled-components'

export const Form = styled.form`
  & {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
  input {
    background-color: ${({ theme }) => theme.form.bg};
    border-radius: 5px;
    border: 2px solid ${({ theme }) => theme.form.border};
    color: ${({ theme }) => theme.form.text};
    padding: 0.4rem;
  }
  label {
    display: inline-block;
    margin-right: 15px;
    text-align: left;
    width: 20%;
  }
`
