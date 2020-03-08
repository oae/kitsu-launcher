import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  getTrackedContent,
  login,
  refreshToken,
} from '../providers/kitsu/kitsu';

import { appLogin } from '../providers/firebase/firebase';

function* queryContent(action) {
  yield put({ type: 'CONTENT_SEARCH_LOADING', payload: true });
  const result = yield call(getTrackedContent, action.payload);
  yield put({ type: 'CONTENT_SEARCH_SUCCEEDED', payload: result });
}

function* firebaseLogin(action) {
  yield put({ type: 'LOGIN_INPROGRESS', payload: true });
  const [userResult] = yield call(appLogin, action.payload);
  if (userResult) {
    const [user, api] = yield call(login, action.payload);
    localStorage.setItem('userId', user.id);
    yield put({ type: 'LOGIN_SUCCEEDED', payload: { user, api } });
  }
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

export function* root() {
  yield all([
    takeLatest('CONTENT_SEARCH_REQUESTED', queryContent),
    takeLatest('LOGIN_REQUESTED', firebaseLogin),
    takeLatest('REFRESH_TOKEN', kitsuRefreshToken),
  ]);
}
