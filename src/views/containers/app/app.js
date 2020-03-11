import React from 'react';
import ReactDOM from 'react-dom';

import { Provider, useSelector } from 'react-redux';

import styled from 'styled-components';

import { Header } from '../../components/header/header';
import { SearchView } from '../../components/searchView/searchView';
import { GlobalStyle } from './globalStyle';
import store from '../../../core/redux/store';
import { Login } from '../../components/authentication/login';

import { checkCache } from '../../../core/providers/cache/cache';

const StyledApp = styled.div`
  margin-top: 60px;
  margin-left: 50px;
  position: relative;
`;

const App = () => {
  const kitsuUser = useSelector(state =>
    state.kitsu.user ? state.kitsu.user.id : null
  );

  checkCache();
  return (
    <StyledApp>
      <GlobalStyle />
      <Header />
      {kitsuUser ? <SearchView /> : <Login />}
    </StyledApp>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
