import actions from '../actions/types';
import { combineReducers } from 'redux';

// reducer with initial state
const initialState = {
  fetching: false,
  gitData: null,
  gitError: null,
	mediumData: null,
	mediumError: null,
	loaded: false,
	active: 'GITHUB',
	mediumRecord: 0,
	gitRecord: 0,
};

const gitReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.GIT_REQUEST:
			return { ...state, fetching: true, gitError: null, gitLoaded: false};
		case actions.GIT_CALL_SUCCESS:
			return { ...state, fetching: false, gitData: action.data.docs, gitLoaded: true, gitError: null, gitRecord: 50};
		case actions.RESULT_NEXT_GIT_DATA:
			return {...state, fetching: false, gitData: state.gitData.concat(action.data.docs),
				gitRecord: state.gitRecord + 40, gitLoaded: true, gitError: null};
		case actions.GIT_CALL_FAILURE:
			return { ...state, fetching: false, gitData: null, gitError: action.error, gitLoaded: false };
		case actions.MEDIUM_REQUEST:
			return { ...state, fetching: true, mediumError: null, mediumLoaded: false};
		case actions.MEDIUM_CALL_SUCCESS:
			return { ...state, fetching: false, mediumData: action.data.docs, mediumLoaded: true, mediumError: null,
				mediumRecord: 50};
		case actions.RESULT_NEXT_MEDIUM_DATA:
			return { ...state, fetching: false, mediumData: state.mediumData.concat(action.data.docs),
				mediumRecord: state.mediumRecord + 50, mediumLoaded: true, mediumError: null};
		case actions.MEDIUM_CALL_FAILURE:
			return { ...state, fetching: false, mediumData: null, mediumError: action.error,mediumLoaded: false };
		case actions.CHANGE_ACTIVE_TAB:
			return {...state, active:action.active};
		default:
			return state;
	}
};

const mediumReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.MEDIUM_REQUEST:
			return { ...state, fetching: true, mediumError: null, mediulLoaded: false};
		case actions.MEDIUM_CALL_SUCCESS:
			return { ...state, fetching: false, mediumData: action.data, mediulLoaded: true, mediumError: null};
		case actions.MEDIUM_CALL_FAILURE:
			return { ...state, fetching: false, mediumData: null, mediumError: action.error, mediulLoaded: false };
		default:
			return state;
	}
};

const utilReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.CHANGE_ACTIVE_TAB:
			return {...state, active:action.active};
		default:
			return state;
	}
};


const rootReducer = combineReducers({
	gitReducer,
	mediumReducer,
	utilReducer,
});

export default gitReducer;


