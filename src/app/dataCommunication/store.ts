import { PostActions } from './actions';
import { Posting } from '../posting_model';

export interface IAppState {
  postingList: Posting[];
  selectedPost: Posting;
  error?: any;
}

export const INITIAL_STATE: IAppState = {
  postingList: [],
  selectedPost: {
    id: null,
    title: '',
    text: ''
  },
  error: null
};

export function rootReducer(lastState: IAppState = INITIAL_STATE, action): IAppState {
  switch (action.type) {
    case PostActions.GETALL_FULFILLED:
      return {
        ...lastState,
        postingList: action.payload
      };

    case PostActions.GET:
      return {
        ...lastState,
        selectedPost: INITIAL_STATE.selectedPost
      };

    case PostActions.GET_FULFILLED:
      return {
        ...lastState,
        selectedPost: action.payload
      };

    case PostActions.DELETE_FULFILLED:
      return {
        ...lastState,
        selectedPost: INITIAL_STATE.selectedPost
      };
  }
  return lastState;
}
