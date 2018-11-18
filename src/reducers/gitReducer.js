import actions from '../actions/types';

// reducer with initial state
const initialState = {
  fetching: false,
  gitData: null,
  gitError: null,
	gitLoaded: false,
	active: 'GITHUB',
	gitRecord: 0,
};

const gitReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.GIT_REQUEST:
			state =  { ...state, fetching: true, gitError: null, gitLoaded: false};
      break;
		case actions.GIT_CALL_SUCCESS:
			state =  { ...state, fetching: false, gitData: action.data.docs, gitLoaded: true, gitError: null, gitRecord: 50};
      break;
  	case actions.RESULT_NEXT_GIT_DATA:
			state = {...state, fetching: false, gitData: state.gitData.concat(action.data.docs),
				        gitRecord: state.gitRecord + 40, gitLoaded: true, gitError: null};
      break;
		case actions.GIT_CALL_FAILURE:
			state = { ...state, fetching: false, gitData: null, gitError: action.error, gitLoaded: false };
      break;
    default:
      break;
	}
  return state;
};

export default gitReducer;
