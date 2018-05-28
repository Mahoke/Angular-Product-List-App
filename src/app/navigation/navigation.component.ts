import { Component, OnInit } from '@angular/core';
import { User } from '../_models';



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})


export class NavigationComponent implements OnInit {

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
      items: [
        {
          id: 'l1',
          title: 'Lijst één',
          routerLink: '/lists/1'
        },
        {
          id: 'l2',
          title: 'Lijst twee',
          routerLink: '/lists/2'
        },
        {
          id: 'l3',
          title: 'Lijst drie',
          routerLink: '/lists/3'
        }
      ]
    },
    { id: 'about',
      icon: 'info_outline',
      title: 'About',
      routerLink: '/login',
      dropdown: false,
      items: []
    }
  ];

  constructor() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  setActive(id: string) {
    this.activeItemId = id;
  }

}
