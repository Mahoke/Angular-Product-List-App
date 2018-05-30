import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { User } from '../_models';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // CRUD for users
  public tempuser: User;
  constructor(private http: HttpClient) { }

  createUser(user: User) {
    this.tempuser = user;
    console.log(this.tempuser);
    return this.http.post('http://localhost:5002/register', user)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAll() {
    return this.http.get<User[]>('/api/users');
  }

  getUserById(id: number) {
    return this.http.get('/api/users/' + id );
  }

  updateUser(id: number, user: User) {
    return this.http.put('/api/users/' + user.id, user);
  }

  deleteUser(id: number) {
    return this.http.delete('/api/users/' + id);
  }

  handleError(error: HttpErrorResponse): any {

    if ( error.status === 409) {
      return throwError(error.error['error']);
    } else {
      return throwError(
        'Something bad happened; please try again later.');
    }
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `${error.message}` +
        ` Backend returned code ${error.status}, ` +
        `body was: ${error.error}` +
        `${error.error['error']}`
      );
    }
    // return an observable with a user-facing error message

  }

}
