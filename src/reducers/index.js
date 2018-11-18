import { reducer as formReducer } from 'redux-form';
import gitReducer  from './gitReducer';
import { combineReducers } from 'redux';
import mediumReducer from './mediumReducer';
import utilReducer from './utilReducer';

const rootReducer = combineReducers({
	gitReducer:gitReducer,
  form:formReducer,
  mediumReducer,
  utilReducer
});


export default rootReducer;
