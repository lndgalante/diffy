import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    --grey-1: #fafafa;
    --grey-2: #eaeaea;
    --grey-3: #999999;
    --grey-4: #666666;
    --grey-5: #333333;
    --blue: #0076ff;
    --magenta: #ff0080;
    --orange: #f5a623;
    --yellow: #f8e71c;
    --green: #50e3c2;
    --rose: #e0719e;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-repeat: no-repeat;
  }

  body {
    background-color: var(--rose);
  }

  label {
    color: white !important;
  }

  img {
    border: none;
    height: auto;
    max-width: 100%;
  }

  [hidden] {
    display: none;
  }

  [disabled] {
    cursor: not-allowed;
    pointer-events: none;
  }
`

export default GlobalStyle
