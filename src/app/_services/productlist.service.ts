import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Product, Productlist } from '../_models';

@Injectable({
  providedIn: 'root'
})

export class ProductlistService {

  // CRUD for productlists
  constructor(private http: HttpClient) { }

  createProductlist(productlist: Productlist) {
    return this.http.post('http://localhost:5002/lists', productlist)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllProductlists() {
    return this.http.get<Productlist[]>('/lists').pipe(
      catchError(this.handleError)
    );
  }

  getProductlistById(id: number){
    return this.http.get<Productlist>('/lists/ '+ id).pipe(
      catchError(this.handleError)
    );
  }

  updateProductlist(id: number, productlist: Productlist) {
    return this.http.put('/lists/' + id, productlist).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number) {
    return this.http.delete('/lists/' + id).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse): any {
    //TODO ERROR RESPONSES
    if ( error.status === 409) {
      return throwError(error.error['error']);
    } else {
      return throwError(
        'Something bad happened; please try again later.');
    }
    
  }
}
