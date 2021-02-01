import { combineReducers, createStore } from 'redux';
import { reducer } from './reducer';
import { IPeopleState } from './types';

export interface IRootState {
    people: IPeopleState
}

const store = createStore<IRootState, any, any, any>(
    combineReducers({
        people: reducer
}));
export default store;