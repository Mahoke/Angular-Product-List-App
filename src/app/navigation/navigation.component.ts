import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})


export class NavigationComponent implements OnInit {

  activeItemId = 'home';

  navigationItems = [
    { id: 'home',
      icon: 'home',
      title: 'Home',
      routerLink: '/',
      dropdown: false,
      items: []
    },
    { id: 'about',
      icon: 'info',
      title: 'About',
      routerLink: '/about',
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
  ];

  constructor() { }

  ngOnInit() {
  }

  setActive(id: string) {
    this.activeItemId = id;
  }

}
