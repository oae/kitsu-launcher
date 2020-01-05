import { combineReducers } from 'redux';

const searchContent = (state = { isLoading: false, result: [] }, action) => {
  switch (action.type) {
    case 'CONTENT_SEARCH_REQUESTED':
      return {
        ...state,
        result: [],
      };

    case 'CONTENT_SEARCH_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'CONTENT_SEARCH_SUCCEEDED':
      return {
        isLoading: false,
        result: action.payload,
      };

    default:
      return state;
  }
};

export const root = combineReducers({
  search: searchContent,
});
