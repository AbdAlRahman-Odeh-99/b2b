import { Component, OnInit } from '@angular/core';

import  data from '../data';
@Component({
  templateUrl: './about-store.page.html',
  styleUrls: ['./about-store.page.css']
})
export class AboutStorePage implements OnInit {

  constructor() { }

  data = data;

  ngOnInit(): void {
  }

}
