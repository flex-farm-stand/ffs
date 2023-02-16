import { createGlobalStyle } from 'styled-components'
import 'normalize.css'

export const GlobalStyle = createGlobalStyle`
  :root {
    background-color: ${({ theme }) => theme.body.bg};
    color: ${({ theme }) => theme.body.text};
  }
  a {
    color: dodgerblue;
  }
`
