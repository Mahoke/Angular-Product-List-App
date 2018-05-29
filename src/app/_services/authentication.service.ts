import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    // TODO some encryption

    return this.http.post<any>('http://192.168.43.84:5002/login', { username: username, password: password})
      .pipe(map( user => {
        console.log('hi');
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          sessionStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
    }));
  }

  logout() {
    sessionStorage.removeItem('currentUser');
  }
}
