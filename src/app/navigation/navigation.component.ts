import { Component, OnInit } from '@angular/core';
import { User, ProductList } from '../_models';
import { ProductlistService, AlertService } from '../_services';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})


export class NavigationComponent implements OnInit {

  productlists: ProductList[];
  activeItemId = 'home';
  currentUser: User;

  navigationItems = [
    { id: 'home',
      icon: 'home_outline',
      title: 'Home',
      routerLink: '/',
      dropdown: false,
      items: []
    },
    { id: 'lists',
      icon: 'list',
      title: 'Lists',
      routerLink: '/lists',
      dropdown: true,
      items: []
    },
    { id: 'about',
      icon: 'info_outline',
      title: 'About',
      routerLink: '/login',
      dropdown: false,
      items: []
    }
  ];

  constructor(private alertService: AlertService, private productlistService: ProductlistService) {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.getProductLists();
  }

  ngOnInit() {
  }

  getProductLists(): void {
    console.log('gettings plists');
     this.productlistService.getAllProductLists().pipe(first())
      .subscribe(
          (data: ProductList[]) => {
            this.navigationItems.forEach(element => {
              if (element.id === 'lists') {
                data.forEach(listelement => {
                  console.log(listelement.name);
                    element.items.push({
                      id: listelement.id,
                      title: listelement.name,
                      routerLink: '/lists/' + listelement.id
                    });
                });
              }
            });
          },
          error => {
              this.alertService.error(error);
          });
  }

  setActive(id: string) {
    this.activeItemId = id;
  }

}
