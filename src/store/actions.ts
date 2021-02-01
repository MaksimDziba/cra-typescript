import { action } from 'typesafe-actions';
import { Constants } from './constants';
import { IPeopleState } from './types';

export function savePeople(people: IPeopleState) {
  return action(Constants.ADD_ITEMS, {
    people,
  });
}
