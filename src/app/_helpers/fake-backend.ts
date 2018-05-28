import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // array in local html storage for registered users
    const users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    return of(null).pipe(mergeMap(() => {

      // authenticate
      if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
        const filteredUsers = users.filter( user => {
          return user.username === request.body.username && user.password === request.body.password;
        });

        if ( filteredUsers.length ) {
          // if login details are valid return 200 OK with user details and fake jwt token
          const user = filteredUsers[0];
          const body = {
              id: user.id,
              email: user.email,
              username: user.username,
              firstname: user.firstname,
              lastname: user.lastname,
              token: 'fake-jwt-token'
          };
          console.log('succesfull login');
          return of(new HttpResponse({status: 200, body: body}));
        } else {
          // else return 400 bad request
          return throwError('Username or password is incorrect');
        }
      }

      // get all users
      if (request.url.endsWith('/api/users') && request.method === 'GET') {
        // check for fake auth token and return users if valid,
        //  this security is implemented server side in a real application

        if ( request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          return of(new HttpResponse({ status: 200, body: users }));
        } else {
          // return 401 not authorised if token is null or invalid
          return throwError('Unauthorised');
        }
      }

      // get all users
      if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {
        // check for fake auth token and return users if valid,
        //  this security is implemented server side in a real application

        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          // find user by id in users array
          const urlParts = request.url.split('/');
          const id = parseInt(urlParts[urlParts.length - 1], 10);
          const matchedUsers = users.filter(usr => usr.id === id);
          const user = matchedUsers.length ? matchedUsers[0] : null;

          return of(new HttpResponse({ status: 200, body: user }));
        } else {
          // return 401 not authorised if token is null or invalid
          return throwError('Unauthorised');
        }
      }

      // creating a new user
      if (request.url.endsWith('/api/users') && request.method === 'POST') {
        const newUser = request.body;

        // validation
        const duplicateUser = users.filter( user => user.username === newUser.username).length;
        if (duplicateUser) {
            return throwError('Username "' + newUser.username + '" is already taken');
        }

        const duplicateMail = users.filter( user => user.email === newUser.email).length;
        if (duplicateMail) {
            return throwError('"' + newUser.email + '" is already in use');
        }

        // save new user
        newUser.id = users.length + 1;
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify( users));

        // respond 200 ok
        return of(new HttpResponse({status: 200}));

      }

      // delete user
      if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'DELETE') {
        // check for fake auth token in header and return user if valid,
        // this security is implemented server side in a real application
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          // find user by id in users array
          const urlParts = request.url.split('/');
          const id = parseInt(urlParts[urlParts.length - 1], 10);
          for (let i = 0; i < users.length; i++) {
            const user = users[i];

            if ( user.id === id ) {
              // delete user
              users.splice(i, 1);
              localStorage.setItem('users', JSON.stringify( users ));
                break;
            }
          }

          // respond 200 OK
          return of(new HttpResponse({ status: 200 }));
        } else {
          // return 401 not authorised if token is null or invalid
          return throwError('Unauthorised');
        }
      }



      // pass through any requests not handled above
      return next.handle(request);
    }))
    // call materialize and dematerialze to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
    .pipe(materialize())
    .pipe(delay(500))
    .pipe(dematerialize());
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
