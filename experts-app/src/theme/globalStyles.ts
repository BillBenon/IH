import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Lato;
    font-size: 16px;
  }

  input, button{
    font-size: 1rem;
  }
`;
 
export default GlobalStyle;