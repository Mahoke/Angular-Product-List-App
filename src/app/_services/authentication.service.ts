import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    // TODO some encryption

    return this.http.post<any>('http://localhost:5002/login', { username: username, password: password})
      .pipe(map( user => {
        console.log('hi');
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          sessionStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
    }),
    catchError(this.handleError)
  );
  }

  logout() {
    sessionStorage.removeItem('currentUser');
  }

  handleError(error: HttpErrorResponse): any {

    if ( error.status === 401) {
      return throwError(error.error['error']);
    } else {
      // return an observable with a user-facing error message
      return throwError(
        'Something bad happened; please try again later.');
    }
  }
}
