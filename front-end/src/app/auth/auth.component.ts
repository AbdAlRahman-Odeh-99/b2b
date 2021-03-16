import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth/auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { 
    if (this.auth.loggedIn) {
      this.auth.redirectToHome();
    }
  }

  ngOnInit() {
  }

}
