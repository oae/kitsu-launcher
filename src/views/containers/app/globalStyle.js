import 'overlayscrollbars/css/OverlayScrollbars.css';

import { createGlobalStyle } from 'styled-components';
import almostJapaneseFont from '../../../assets/almostJapanese.ttf';

export const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'AlmostJapanese';
    src: url(${almostJapaneseFont});
  }

  html {
    display: table;
    overflow: hidden;
  }

  body {
    -webkit-app-region: drag;
    -webkit-user-select: none;
  }

  body * {
    -webkit-app-region: no-drag;
  }

  body img {
    -webkit-user-drag: none;
  }

  #root {
    display: inline-block;
  }
`;
