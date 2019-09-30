import React from 'react';

import chibi from './assets/chibi.png';
import './custom.css';

export default function App() {
  return (
    <div id="search-container">
      <span id="title">Kitsu Launcher</span>
      <img src={chibi} id="chibi" />
      <input id="search-text" type="text" />
    </div>
  );
}
