import { Component, OnInit } from '@angular/core';
import { ProductlistService } from '../_services';
import { Product, ProductList } from '../_models';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-lists',
  templateUrl: './product-lists.component.html',
  styleUrls: ['./product-lists.component.scss']
})

export class ProductListsComponent implements OnInit {
  alertService: any;
  productlists: ProductList[];
  productInput: string;
  listID: number;

  constructor(private productlistService: ProductlistService) { }

  ngOnInit() {
    this.productInput = '';
    this.getProductLists();
  }

  getProductLists(): void {
    console.log('gettings plists');
     this.productlistService.getAllProductLists().pipe(first())
      .subscribe(
          (data: ProductList[]) => {
              this.productlists = data;
          },
          error => {
              this.alertService.error(error);
          });
  }

  sortProducts(): void {
    this.productlists.forEach(productlist => {
      console.log( this.productlists );
      productlist.products.sort( function( a: Product , b: Product ): number {
        if (a.name === b.name) {
          return( a.id - b.id );
        }
        const x = a.name.toLowerCase();
        const y = b.name.toLowerCase();
        console.log(x);
        console.log(y);
        return x < y ? -1 : x > y ? 1 : 0;
      });
    });
  }

  deleteProductList(productlist: ProductList) {
    this.productlistService.deleteProductList(productlist.id).pipe(first()).subscribe(
      data => {
          const index: number = this.productlists.indexOf(productlist);
          if (index !== -1) {
            this.productlists.splice(index, 1);
          }
      },
      error => {
          this.alertService.error(error);
      });
  }
/*
  addItem(listID: number): void {
    this.productlistService.addItem(listID, this.productInput);
    console.log(listID + ': ' + this.productInput);
    this.productInput = '';
  }
*/
}
