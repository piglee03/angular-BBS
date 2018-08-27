import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { combineEpics, ActionsObservable, ofType } from 'redux-observable';
import { PostActions } from './actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Posting } from './posting';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root' // 이거 필요한가?
})
export class PostingEpics {
  private URL = 'http://127.0.0.1:3000/api/posts';

  constructor(private http: HttpClient) { }

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
          catchError(this.handleError)
        )
      )
    );
  }

  getPosting(action$: ActionsObservable<any>) {
    return action$.pipe(
      ofType(PostActions.GET),
      switchMap(action =>
        this.http.get<Posting>(`${this.URL}/${action.payload.id}`).pipe( // action.payload.id
          map(response => ({ type: PostActions.GET_FULFILLED, payload: response })),
          catchError(this.handleError)
        )
      )
    );
  }
  addPosting(action$: ActionsObservable<any>) {
    return action$.pipe(
      ofType(PostActions.ADD),
      switchMap(action =>
        this.http.post<Posting>(this.URL, action.payload.post, httpOptions).pipe( // action.payload.post
          map(response => ({ type: PostActions.ADD_FULFILLED, payload: action.payload })),
          catchError(this.handleError)
        )
      )
    );
  }

  deletePosting(action$: ActionsObservable<any>) {
    return action$.pipe(
      ofType(PostActions.DELETE),
      switchMap(action =>
        this.http.delete<Posting>(`${this.URL}/${action.payload.id}`, httpOptions).pipe(
          map(response => ({ type: PostActions.DELETE_FULFILLED, payload: action.payload })),
          catchError(this.handleError)
        )
      )
    );
  }

  updatePosting(action$: ActionsObservable<any>) {
    return action$.pipe(
      ofType(PostActions.UPDATE),
      switchMap(action =>
        this.http.put<Posting>(`${this.URL}/${action.payload.post.id}`, action.payload.post, httpOptions).pipe(
          map(response => ({ type: PostActions.UPDATE_FULFILLED, payload: action.payload })),
          catchError(this.handleError)
        )
      )
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    return throwError('Something bad happened; please try again later.');
  }

}
