import 'overlayscrollbars/css/OverlayScrollbars.css';

import { createGlobalStyle } from 'styled-components';
import almostJapaneseFont from '../../../assets/almostJapanese.ttf';

export const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'AlmostJapanese';
    src: url(${almostJapaneseFont});
  }

  *, *::before, *::after {
    box-sizing: unset;
  }

  *:focus {
    outline: none;
  }

  html, body {
    width: unset;
    height: unset;
    background: unset;
  }

  html {
    display: table;
    overflow: hidden;
  }

  body {
    -webkit-user-select: none;
  }

  body img {
    -webkit-user-drag: none;
    -webkit-user-select: none;
  }

  #root {
    display: inline-block;
  }


  .ant-tag:hover {
    opacity: unset;
  }

  .ant-tooltip-inner {
    min-height: unset;
  }

`;
