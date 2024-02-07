import { createGlobalStyle, css } from 'styled-components';
import 'react-loading-skeleton/dist/skeleton.css';

const globalStyle = createGlobalStyle`${css`
  :root {
    --text-color-gray: #737373;
    --text-color-blue: #0095f6;
    --text-color-error: #ed4956;
    --btn-text-color: #0095f6;
    --btn-text-color-hover: #00376b;
    --hashtag-color: #1877f2;
    --color-gray-0: #fff;
    --color-gray-300: #f2f2f2;
    --color-gray-700: #dbdbdb;
    --color-gray-900: #a8a8a8;
    --color-black-900: #000;
    --color-red-900: #ff3040;
    --bg-color: #fff;
    --input-bg: #fafafa;
    --btn-color: #0095f6;
    --btn-color-hover: #1877f2;
    --btn-color-disabled: #4cb5f9;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;

    /* Creating animations for dark mode */
    transition: background-color 0.3s, border 0.3s;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--bg-color);
  }
`}`;

export default globalStyle;
