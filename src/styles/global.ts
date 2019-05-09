import { createGlobalStyle } from 'styled-components';
import { device } from 'config/config';
import colors from 'styles/colors';
import 'typeface-lato';

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;

    @media ${device.desktop} {
      font-size: 15px;
    }

    @media ${device.laptop} {
      font-size: 14px;
    }

    @media ${device.tablet} {
      font-size: 12px;
    }

    @media ${device.mobile} {
      font-size: 10px;
    }
  }

  body {
    width: 100%;
    height: 100%;
    font-family: Lato, sans-serif;
  }

  input {
    border: none;
    outline: none;
    -webkit-appearance: none;
    font-size: 1rem;
  }

  button {
    appearance: none;
    background: none;
    border: none;
    cursor: pointer;
    box-shadow: none;
    outline: none;
  }

  a {
    color: ${colors.text};
    text-decoration: none;
  }
`;

export default GlobalStyles;
