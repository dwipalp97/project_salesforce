import { fork, all } from 'redux-saga/effects';
import {friendsActionWatcher} from './reducer/friends/Saga';


function* rootSaga() {
  yield all([
    fork(friendsActionWatcher),
  ]);
}

export default rootSaga;
