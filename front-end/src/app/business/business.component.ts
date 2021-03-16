import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-component',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  public selectedIndex = 0;
  public folder: string;

  public appPages = [
    {
      title: 'My Store',
      url: '/business/my-stores',
      icon: 'accessibility'
    },
    {
      title: 'Search By Image',
      url: '/business/search-by-image',
      icon: 'search'
    },
    {
      title: 'CHAT',
      url: '/business/chat',
      icon: 'mail'
    },
    {
      title: 'HOME',
      url: '/business/home',
      icon: 'home'
    },
    {
      title: 'STORES',
      url: '/business/store',
      icon: 'storefront'
    },
    {
      title: 'PRODUCTS',
      url: '/business/products',
      icon: 'cube'
    },
    {
      title: 'CATEGORIES',
      url: '/business/categories',
      icon: 'grid'
    },
    {
      title: 'OFFERS',
      url: '/business/offers',
      icon: 'gift'
    },
    {
      title: 'SHOPPING_CART',
      url: '/business/shopping-card',
      icon: 'bag-handle'
    },
    {
      title: 'SETTING',
      url: '/business/settings',
      icon: 'settings'
    },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) {
  }
  
  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

}
