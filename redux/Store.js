
import createSagaMiddleware from 'redux-saga';
import { createStore,  applyMiddleware} from 'redux';
import rootReducer from './reducer/Index';
import rootSaga from './Sagas';


const sagaMiddleware = createSagaMiddleware();

export const reduxStore = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
  )
sagaMiddleware.run(rootSaga)

