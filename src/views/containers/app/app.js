import React from 'react';
import ReactDOM from 'react-dom';

import { Provider, useSelector } from 'react-redux';

import styled from 'styled-components';

import firebase from 'firebase/app';
import { Header } from '../../components/header/header';
import { SearchView } from '../../components/searchView/searchView';
import { GlobalStyle } from './globalStyle';
import store from '../../../core/redux/store';
import { Login } from '../../components/authentication/login';

import { firebaseConfig } from '../../../core/providers/firebase/firebaseConfig';
import { checkCache } from '../../../core/providers/cache/cache';

const StyledApp = styled.div`
  margin-top: 60px;
  margin-left: 50px;
  position: relative;
  font-size: 30px;
  color: white;
  outline: none;
  background: #3b064d;
  box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);
`;
firebase.initializeApp(firebaseConfig);

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
