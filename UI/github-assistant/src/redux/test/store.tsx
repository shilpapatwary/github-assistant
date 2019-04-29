import initialState from './initialState.json';
import SlackApplicationReducer from '../reducer';
import {createStore} from 'redux';

export const store = createStore(SlackApplicationReducer, initialState);

export default store;