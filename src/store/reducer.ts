import { Constants } from './constants';
import { ActionsType, IPeopleState } from './types';

const init: IPeopleState = {
  people: [],
};
export function reducer(state: IPeopleState = init, action: any): IPeopleState {
  switch (action.type) {
    case Constants.ADD_ITEMS:
      return { people: [...state.people, action.payload.items]}
    default:
      return state;
  }
}
