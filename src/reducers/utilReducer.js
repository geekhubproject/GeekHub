import actions from '../actions/types';

const initialState = {
	active:"GITHUB"
}

const utilReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.CHANGE_ACTIVE_TAB:
			return {...state, active:action.active};
		default:
			return state;
	}
};

export default utilReducer;
