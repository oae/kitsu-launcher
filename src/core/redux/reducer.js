import { combineReducers } from 'redux';

const searchReducer = (state = { isLoading: false, result: [] }, action) => {
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

const kitsuReducer = (
  state = { isLoggingIn: false, user: null, api: null },
  action
) => {
  switch (action.type) {
    case 'LOGIN_REQUESTED':
      return {
        isLoggingIn: false,
        user: null,
        api: null,
      };
    case 'LOGIN_INPROGRESS':
      return {
        ...state,
        isLoggingIn: action.payload,
      };
    case 'LOGIN_SUCCEEDED':
      return {
        ...action.payload,
        isLoggingIn: false,
      };
    default:
      return state;
  }
};

const selectedItemReducer = (state = null, action) => {
  switch (action.type) {
    case 'SELECT_ITEM':
      return action.payload;
    default:
      return state;
  }
};

export const root = combineReducers({
  search: searchReducer,
  kitsu: kitsuReducer,
  selectedItem: selectedItemReducer,
});
