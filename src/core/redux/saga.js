import { all, call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import {
  getTrackedContent,
  login,
  refreshToken,
  logout,
} from '../providers/kitsu/kitsu';

function* queryContent(action) {
  yield put({ type: 'CONTENT_SEARCH_LOADING', payload: true });
  const result = yield call(getTrackedContent, action.payload);
  yield put({ type: 'CONTENT_SEARCH_SUCCEEDED', payload: result });
}

function* kitsuLogin(action) {
  yield put({ type: 'LOGIN_INPROGRESS', payload: true });
  const userData = yield call(login, action.payload);
  if (!_.isEmpty(userData[0])) {
    const [user, api] = userData;
    localStorage.setItem('userId', user.id);
    yield put({ type: 'LOGIN_SUCCEEDED', payload: { user, api } });
  }
  yield put({ type: 'LOGIN_FAIL' });
}

function* kitsuRefreshToken() {
  yield put({ type: 'LOGIN_INPROGRESS', payload: true });
  const [api] = yield call(refreshToken);
  const userId = localStorage.getItem('userId');
  yield put({
    type: 'LOGIN_SUCCEEDED',
    payload: { user: { userId }, api },
  });
}

function* kitsuLogout() {
  yield call(logout);
}

export function* root() {
  yield all([
    takeLatest('CONTENT_SEARCH_REQUESTED', queryContent),
    takeLatest('LOGIN_REQUESTED', kitsuLogin),
    takeLatest('REFRESH_TOKEN', kitsuRefreshToken),
    takeLatest('LOGOUT', kitsuLogout),
  ]);
}
