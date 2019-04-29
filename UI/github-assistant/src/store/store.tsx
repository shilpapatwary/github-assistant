import { createStore, applyMiddleware } from 'redux';
import SlackApplicationReducer from '../redux/reducer';
import initialState from '../assets/sampleSlack.json';
import createSagaMiddleware from 'redux-saga';
import root from '../sagas/sagas';
const sagaMiddleware = createSagaMiddleware();


const store = createStore(SlackApplicationReducer, initialState, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(root);

export default store;