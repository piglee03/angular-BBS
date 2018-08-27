import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Posting } from './posting';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataCommService {
  private URL = 'http://127.0.0.1:3000/api/posts';

  constructor(private http: HttpClient) { }


  /* HTTP requests*/
  getAllPostings(): Observable<Posting[]> {
    return this.http.get<Posting[]>(this.URL).pipe(
      tap(_ => console.log('Success to get all postings!')),
      catchError(this.handleError)
    );
  }

  getPosting(id: number): Observable<Posting> {
    return this.http.get<Posting>(`${this.URL}/${id}`).pipe(
      tap(_ => console.log(`Success to get posting #${id}`)),
      catchError(this.handleError)
    );
  }
  addPosting(posting: Posting): Observable<Posting> {
    return this.http.post<Posting>(this.URL, posting, httpOptions).pipe(
      tap(_ => console.log(`Success to add posting #${posting.id}`)),
      catchError(this.handleError));
  }

  deletePosting(id: number): Observable<Posting> {
    return this.http.delete<Posting>(`${this.URL}/${id}`, httpOptions).pipe(
      tap(_ => console.log(`Success to delete posting #${id}`)),
      catchError(this.handleError));
  }

  updatePosting(posting: Posting): Observable<Posting> {
    return this.http.put<Posting>(`${this.URL}/${posting.id}`, posting, httpOptions).pipe(
      tap(_ => {
        console.log(`Success to update posting #${posting.id}`);
      }),
      catchError(this.handleError));
  }

  /* 오류 처리 */
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
