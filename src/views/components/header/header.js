import React from 'react';

import './header.css';
import chibi from '../../../assets/chibi.png';

export function Header() {
  return (
    <div id="header">
      <span id="title">Kitsu Launcher</span>
      <img src={chibi} id="chibi" />
    </div>
  );
}
