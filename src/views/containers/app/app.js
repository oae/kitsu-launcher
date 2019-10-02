import React from 'react';
import ReactDOM from 'react-dom';

import './app.css';
import { Header } from '../../components/header/header';
import { SearchView } from '../../components/searchView/searchView';

function App() {
  return (
    <div id="app">
      <Header />
      <SearchView />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
