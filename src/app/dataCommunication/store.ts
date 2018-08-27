import { PostActions } from './actions';
import { Posting } from './posting';

export interface IAppState {
  postingList: Posting[];
}

export const INITIAL_STATE: IAppState = {
  postingList: []
};


export function rootReducer(lastState: IAppState = INITIAL_STATE, action): IAppState {

  switch (action.type) {
    case PostActions.GETALL:
      return {
        postingList: []
      };

    case PostActions.GETALL_FULFILLED:
      return {
        postingList: action.payload
      };

    case PostActions.GET:
      return {
        postingList: lastState.postingList
      };

    case PostActions.GET_FULFILLED:
      return {
        postingList: action.payload
      };

    default:
      return lastState;
  }

}
