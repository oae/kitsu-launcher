import React from 'react';
import ReactDOM from 'react-dom';

import styled from 'styled-components';

import { Header } from '../../components/header/header';
import { SearchView } from '../../components/searchView/searchView';
import { GlobalStyle } from './globalStyle';

const StyledApp = styled.div`
  margin-top: 60px;
  margin-left: 50px;
  position: relative;
`;

const App = () => {
  return (
    <StyledApp>
      <GlobalStyle />
      <Header />
      <SearchView />
    </StyledApp>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
