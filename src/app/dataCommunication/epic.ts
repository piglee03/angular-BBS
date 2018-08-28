import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { combineEpics, ActionsObservable, ofType } from 'redux-observable';
import { PostActions } from './actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Posting } from '../posting_model';
import { of } from 'rxjs';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PostingEpics {
  private URL = 'http://127.0.0.1:3000/api/posts';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  rootEpic() {// 아래의 함수들 this 바인딩
    return combineEpics(
      this.getAllPostings.bind(this),
      this.getPosting.bind(this),
      this.addPosting.bind(this),
      this.deletePosting.bind(this),
      this.updatePosting.bind(this));
  }

  getAllPostings(action$: ActionsObservable<any>) {
    return action$.pipe(
      ofType(PostActions.GETALL),
      switchMap(action =>
        this.http.get<Posting[]>(this.URL).pipe(
          map(response => ({ type: PostActions.GETALL_FULFILLED, payload: response })),
          catchError((error: Error): any => of({
            type: PostActions.GETALL_ERROR,
            error
          }))
        )
      ),
      tap(res => console.log('get all postings', res))
    );
  }

  getPosting(action$: ActionsObservable<any>) {
    return action$.pipe(
      ofType(PostActions.GET),
      switchMap(action =>
        this.http.get<Posting>(`${this.URL}/${action.payload.id}`).pipe( // action.payload.id
          map(response => ({ type: PostActions.GET_FULFILLED, payload: response })),
          catchError((error: Error): any => of({
            type: PostActions.GET_ERROR,
            error
          }))
        )
      )
    );
  }
  addPosting(action$: ActionsObservable<any>) {
    return action$.pipe(
      ofType(PostActions.ADD),
      switchMap(action =>
        this.http.post<Posting>(this.URL, action.payload.post, httpOptions).pipe(
          tap(res => this.router.navigate(action.meta)),
          map(response => ({ type: PostActions.ADD_FULFILLED, payload: action.payload })),
          catchError((error: Error): any => of({
            type: PostActions.ADD_ERROR,
            error
          }))
        )
      ),
    );
  }

  deletePosting(action$: ActionsObservable<any>) {
    return action$.pipe(
      ofType(PostActions.DELETE),
      switchMap(action =>
        this.http.delete<Posting[]>(`${this.URL}/${action.payload.id}`, httpOptions).pipe(
          map(response => ({ type: PostActions.DELETE_FULFILLED, payload: action.payload })),
          catchError((error: Error): any => of({
            type: PostActions.DELETE_ERROR,
            error
          }))
        )
      )
    );
  }

  updatePosting(action$: ActionsObservable<any>) {
    return action$.pipe(
      ofType(PostActions.UPDATE),
      switchMap(action =>
        this.http.put<Posting>(`${this.URL}/${action.payload.post.id}`, action.payload.post, httpOptions).pipe(
          tap(res => this.router.navigate(action.meta)),
          map(response => ({ type: PostActions.UPDATE_FULFILLED, payload: action.payload })),
          catchError((error: Error): any => of({
            type: PostActions.UPDATE_ERROR,
            error
          }))
        )
      )
    );
  }


}
