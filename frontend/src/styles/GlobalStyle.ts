import { createGlobalStyle, css } from 'styled-components';

const globalStyle = createGlobalStyle`${css`
  :root {
    --text-color-gray: #737373;
    --text-color-error: #ed4956;
    --border-gray-700: #dbdbdb;
    --border-gray-900: #a8a8a8;
    --bg-color: #fff;
    --input-bg: #fafafa;
    --bg-btn-color: #0095f6;
    --bg-btn-color-hover: #1877f2;
    --bg-btn-color-disabled: #4cb5f9;
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
