import { ActionType as Action } from 'typesafe-actions';
import * as actions from './actions';
import { People } from '../interfaces/people';

export interface IPeopleState {
  people: People[]
}

export type ActionsType = Action<typeof actions>;