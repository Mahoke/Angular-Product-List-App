import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // CRUD for users

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    console.log('posting');
    return this.http.post('/api/users', user);
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
