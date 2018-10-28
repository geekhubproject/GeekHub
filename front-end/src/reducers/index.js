import actions from '../actions';

// reducer with initial state
const initialState = {
  fetching: false,
  data: null,
  error: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
  case actions.API_CALL_REQUEST:
    return { ...state, fetching: true, error: null };
  case actions.API_CALL_SUCCESS:
    return { ...state, fetching: false, data: action.data };
  case actions.API_CALL_FAILURE:
    return { ...state, fetching: false, data: null, error: action.error };
  default:
    return state;
  }
}

