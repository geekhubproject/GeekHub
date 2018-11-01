import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "../saga";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const configureStore = preloadedState => {
	const store = createStore(
		rootReducer,
		preloadedState,
		compose(
			applyMiddleware(sagaMiddleware, createLogger()),
			DevTools.instrument()
		)
	);

	// run the saga
	sagaMiddleware.run(watcherSaga);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			store.replaceReducer(rootReducer)
		})
	}

	return store
};

export default configureStore
