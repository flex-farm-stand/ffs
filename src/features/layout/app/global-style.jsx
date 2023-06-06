import { createGlobalStyle } from 'styled-components'
import 'normalize.css'

export const GlobalStyle = createGlobalStyle`
  :root {
    background-color: ${({ theme }) => theme.body.bg};
    color: ${({ theme }) => theme.body.text};
  }
  a {
    color: dodgerblue;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  button:focus {
    outline: 2px solid powderblue !important;
  }
`
