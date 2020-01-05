import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getTrackedContent } from '../providers/kitsu/kitsu';

function* queryContent(action) {
  yield put({ type: 'CONTENT_SEARCH_LOADING', payload: true });
  const result = yield call(getTrackedContent, action.payload);
  yield put({ type: 'CONTENT_SEARCH_SUCCEEDED', payload: result });
}

export function* root() {
  yield all([takeLatest('CONTENT_SEARCH_REQUESTED', queryContent)]);
}
