import actions from '../actions/types';

const initialState = {
	  fetching: false,
	  mediumData: null,
	  mediumError: null,
		mediumLoaded: false,
		active: 'MEDIUM',
		mediumRecord: 0,
}

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

export default mediumReducer;
