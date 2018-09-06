import { PostActions } from './actions';
import { Posting } from '../posting_model';

export interface IAppState {
  postingList: Posting[];
  selectedPost: Posting;
  lastId: Number;
  error?: any;
}

export const INITIAL_STATE: IAppState = {
  postingList: [],
  selectedPost: {
    id: null,
    title: '',
    text: ''
  },
  lastId: 1,
  error: null
};

export function rootReducer(lastState: IAppState = INITIAL_STATE, action): IAppState {
  switch (action.type) {
    case PostActions.GETALL_FULFILLED:
      return {
        ...lastState,
        postingList: action.payload,
        lastId: action.payload[action.payload.length - 1].id + 1
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
        postingList: lastState.postingList.filter(post => post.id !== action.payload.id),
        selectedPost: INITIAL_STATE.selectedPost,
        lastId: (action.payload.id === +lastState.lastId - 1) ? +lastState.lastId - 1 : lastState.lastId
      };

    case PostActions.ADD_FULFILLED:
      return {
        ...lastState,
        postingList: lastState.postingList.concat(action.payload.post),
        lastId: +lastState.lastId + 1
      };

    case PostActions.UPDATE_FULFILLED:
      return {
        ...lastState,
        postingList: lastState.postingList.map(post =>
          post.id === action.payload.post.id
            ? action.payload.post
            : post
        )
      };
  }
  return lastState;
}
