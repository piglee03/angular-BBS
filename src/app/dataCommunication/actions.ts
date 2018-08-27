import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store';
import { Posting } from './posting';

@Injectable()
export class PostActions {

  constructor(private ngRedux: NgRedux<IAppState>) { }

  static readonly GETALL = 'GETALL';
  static readonly GETALL_FULFILLED = 'GETALL_FULFILLED';
  static readonly GET = 'GET';
  static readonly GET_FULFILLED = 'GET_FULFILLED';
  static readonly ADD = 'ADD';
  static readonly ADD_FULFILLED = 'ADD_FULFILLED';
  static readonly DELETE = 'DELETE';
  static readonly DELETE_FULFILLED = 'DELETE_FULFILLED';
  static readonly UPDATE = 'UPDATE';
  static readonly UPDATE_FULFILLED = 'UPDATE_FULFILLED';


  getAll(): void {
    this.ngRedux.dispatch({ type: PostActions.GETALL });
  }

  get(id: Number): void {
    this.ngRedux.dispatch({ type: PostActions.GET, payload: { id } });
  }

  add(post: Posting): void {
    this.ngRedux.dispatch({ type: PostActions.ADD, payload: { post } });
  }

  delete(id: Number): void {
    this.ngRedux.dispatch({ type: PostActions.DELETE, payload: { id } });
  }

  update(post: Posting): void {
    this.ngRedux.dispatch({ type: PostActions.UPDATE, payload: { post } });
  }
}
