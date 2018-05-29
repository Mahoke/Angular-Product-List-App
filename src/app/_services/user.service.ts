import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // CRUD for users

  constructor(private http: HttpClient) { }

  createUser(user: User) {

    return this.http.post('http://192.168.43.84:5002/register', user)
      .pipe( map( error => {
        if (error['user'] === 'taken') {
          console.log('throwing');
          return throwError('Username "' + user.username + '" is already taken');
        }

        return user;
    }));
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
}
