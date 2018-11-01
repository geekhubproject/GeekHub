import actions from './types'

const callGit = () => ({
		type: actions.GIT_REQUEST,
});

const callMedium = () => ({
	type: actions.MEDIUM_REQUEST
});

const activeState = (state) => ({
		type: actions.CHANGE_ACTIVE_TAB,
		active: state
});

const nextGit = () => ({
	type: actions.NEXT_GIT_DATA,
});

const nextMedium = () => ({
	type: actions.NEXT_MEDIUM_DATA
});

export {
	callGit,
	callMedium,
	activeState,
	nextGit,
	nextMedium
}



