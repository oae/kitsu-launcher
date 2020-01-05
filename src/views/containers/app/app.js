import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import styled from 'styled-components';

import { Header } from '../../components/header/header';
import { SearchView } from '../../components/searchView/searchView';
import { GlobalStyle } from './globalStyle';
import store from '../../../core/redux/store';

const StyledApp = styled.div`
  margin-top: 60px;
  margin-left: 50px;
  position: relative;
`;

const App = () => {
  return (
    <Provider store={store}>
      <StyledApp>
        <GlobalStyle />
        <Header />
        <SearchView />
      </StyledApp>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
