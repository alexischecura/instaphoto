import { createGlobalStyle, css } from 'styled-components';
import 'react-loading-skeleton/dist/skeleton.css';

const globalStyle = createGlobalStyle`${css`
  :root {
    --text-color-gray: #868e96;
    --text-color-blue: #5c7cfa;
    --text-color-error: #ff6b6b;

    --btn-text-color: #5c7cfa;
    --btn-text-color-hover: #00376b;
    --hashtag-color: #4263eb;
    --color-gray-0: #fff;
    --color-gray-300: #f1f3f5;
    --color-gray-700: #dee2e6;
    --color-gray-900: #adb5bd;
    --color-black-900: #000;
    --color-red-900: #f03e3e;
    --bg-color: #fff;
    --input-bg: #fafafa;

    --btn-color: #5c7cfa;
    --btn-color-hover: #4263eb;
    --btn-color-disabled: #748ffc;

    --box-shadow: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.075);
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
