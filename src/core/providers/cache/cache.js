import { useDispatch } from 'react-redux';
import Kitsu from 'kitsu';

const refreshCache = dispatch => {
  dispatch({
    type: 'REFRESH_TOKEN',
  });
};

const updateCacheState = dispatch => {
  const api = new Kitsu({
    headers: {
      Authorization: `Bearer ${localStorage.accessToken}`,
    },
  });
  dispatch({
    type: 'SET_CACHED_USER',
    payload: {
      user: {
        id: localStorage.userId,
      },
      api,
    },
  });
};
export const checkCache = () => {
  const dispatch = useDispatch();
  const isAuth = localStorage.accessToken;

  if (isAuth && isAuth !== 'undefined') {
    if (
      new Date(localStorage.expiresDate * 1000).getTime() -
        new Date().getTime() <
      24 * 60 * 60 * 100
    ) {
      refreshCache(dispatch);
    } else {
      updateCacheState(dispatch);
    }
  }
};
