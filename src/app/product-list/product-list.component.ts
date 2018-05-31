import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProductlistService, AlertService } from '../_services';
import { ProductList, Product } from '../_models';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  initialName: string;
  productList: ProductList;
  showPrice = false;
  selectedProduct: Product;
  productToAdd: string;

  changeMade: boolean;

  productControl: FormControl = new FormControl();

  autofillProducts: string[];
  filteredAutofill: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private productlistService: ProductlistService,
    private alertService: AlertService,
    private location: Location
  ) {

  }

  ngOnInit() {
    this.getList();
    this.changeMade = false;
  }
  hasChanges(): any {
    return this.changeMade;
  }
  getProducts(): void {
    // this.database.getProducts().subscribe(products => this.autofillProducts = products);
    // this.filteredAutofill = this.productControl.valueChanges.pipe(startWith(''), map(val => this.filter(val)));
  }

  deleteItem(product: Product) {
    const index: number = this.productList.products.indexOf(product);
    if ( index !== -1) {
      this.productList.products.splice(index, 1);
    }
    this.changeMade = true;
  }

  substractQuantity(product: Product) {
    if (product.quantity > 1) {
      product.quantity --;
    } else {
      this.deleteItem(product);
    }
    this.changeMade = true;
  }

  addQuantity(product: Product) {
    product.quantity ++;
    this.changeMade = true;
  }

  addProductToList() {

    if ((this.productControl.value !== '')) {
      this.addProduct(this.productControl.value);
      this.productControl.setValue('');
      this.getProducts();
    }

    this.changeMade = true;
  }

  private addProduct(product_name: string) {
    const pn = product_name.trim();

    if (pn > '') {
      if (this.productList) {
        const product = this.findProductInList(pn);
        if (product) {
          product.quantity++;
        } else {
          this.productList.products.push({id: -10, name: pn, quantity: 1, checked: false,
                                          description: null, pack_size: null, price: null,
                                          productlist_id: this.productList.id});
        }
      }
    }
  }

  getList(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productlistService.getProductlistById(id).pipe(first()).subscribe(
      list => {
        console.log(list['product_list']);
          this.productList = list['product_list'];
          this.initialName = this.productList.name;
      },
      error => {
          this.alertService.error(error);
      });
  }

  applyChanges() {

    this.productlistService.updateProductlist(this.productList).pipe(first()).subscribe(
      data => {
        console.log(data);
        this.changeMade = false;
      },
      error => {
        this.alertService.error(error);
      }
    );
  }

  private findProductInList(product_name: string): Product {
    return this.productList.products.find(product => (product.name.toLowerCase() === product_name.toLowerCase()));
  }


}
