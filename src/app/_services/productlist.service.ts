import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Product, ProductList } from '../_models';

@Injectable({
  providedIn: 'root'
})

export class ProductlistService {

  // CRUD for productlists
  constructor(private http: HttpClient) { }

  createProductlist(productlist: ProductList) {
    return this.http.post('http://localhost:5002/lists', productlist)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllProductLists() {
    return this.http.get<ProductList[]>('http://localhost:5002/lists').pipe(
      catchError(this.handleError)
    );
  }

  getProductlistById(id: number) {
    console.log('getting list: ' + id);
    return this.http.get<ProductList>('http://localhost:5002/lists/ ' + id).pipe(
      catchError(this.handleError)
    );
  }

  updateProductlist(productlist: ProductList) {
    console.log(productlist);
    return this.http.put('http://localhost:5002/lists/' + productlist.id, {'productlist' : productlist}).pipe(
      catchError(this.handleError)
    );
  }

  deleteProductList(id: number) {
    console.log('Sending delete list request');
    return this.http.delete('http://localhost:5002/lists/' + id).pipe(
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
