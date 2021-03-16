import { Component, OnInit } from '@angular/core';
import data from './data';
import { AuthService } from '@app/core/services/auth/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data = data;


  constructor(private authService: AuthService ) {
    this.data = this.data.map((item) => {
      return { ...item, href: `/product` };
    });
    
  }

  ngOnInit() {
  }

}
