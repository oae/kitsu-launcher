import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getTrackedContent, login } from '../providers/kitsu/kitsu';

function* queryContent(action) {
  yield put({ type: 'CONTENT_SEARCH_LOADING', payload: true });
  const result = yield call(getTrackedContent, action.payload);
  yield put({ type: 'CONTENT_SEARCH_SUCCEEDED', payload: result });
}

function* kitsuLogin() {
  yield put({ type: 'LOGIN_INPROGRESS', payload: true });
  const [user, api] = yield call(login);
  yield put({ type: 'LOGIN_SUCCEEDED', payload: { user, api } });
}

export function* root() {
  yield call(kitsuLogin);
  yield all([
    takeLatest('CONTENT_SEARCH_REQUESTED', queryContent),
    takeLatest('LOGIN_REQUESTED', kitsuLogin),
  ]);
}
