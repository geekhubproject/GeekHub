import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as api from '../middleware/index';
import types from '../actions/types'

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga(type, data) {
  yield takeLatest(types.GIT_REQUEST, gitWorkerSaga);
	yield takeLatest(types.MEDIUM_REQUEST, mediumWorkerSaga);
	yield takeLatest(types.NEXT_GIT_DATA, gitNextWorkerSaga);
	yield takeLatest(types.NEXT_MEDIUM_DATA, mediumNextWorkerSaga);
}

// worker saga: makes the api call when watcher saga sees the action
function* gitWorkerSaga() {
  try {
    const response = yield call(api.gitFetch);

    // dispatch a success action to the store with the new dog
    yield put({ type: types.GIT_CALL_SUCCESS, data: response.data });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: types.GIT_CALL_FAILURE, error });
  }
}

	// worker saga: makes the api call when watcher saga sees the action
function* mediumWorkerSaga() {
  try {
    const response = yield call(api.mediumFetch);

    // dispatch a success action to the store with the new dog
      yield put({ type: types.MEDIUM_CALL_SUCCESS, data: response.data });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: types.MEDIUM_CALL_FAILURE, error });
  }
}

// worker saga: makes the api call when watcher saga sees the action
function* gitNextWorkerSaga() {
	try {
		const gitRecord = yield select(state => state.gitRecord);

		const response = yield call(api.gitNext.bind(null, gitRecord));

		// dispatch a success action to the store with the new dog
		yield put({ type: types.RESULT_NEXT_GIT_DATA, data: response.data, gitRecord });

	} catch (error) {
		// dispatch a failure action to the store with the error
		yield put({ type: types.GIT_CALL_FAILURE, error });
	}
}

// worker saga: makes the api call when watcher saga sees the action
function* mediumNextWorkerSaga() {
	try {
		const mediumRecord = yield select(state => state.mediumRecord);

		const response = yield call(api.mediumNext.bind(null, mediumRecord));

		// dispatch a success action to the store with the new dog
		yield put({ type: types.RESULT_NEXT_MEDIUM_DATA, data: response.data, mediumRecord });

	} catch (error) {
		// dispatch a failure action to the store with the error
		yield put({ type: types.MEDIUM_CALL_FAILURE, error });
	}
}
