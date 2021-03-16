import { AuthService } from './../services/auth.service';
import { IonicModule, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginInfo: FormGroup;


  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    public formBuilder: FormBuilder
  ) {
    this.loginInfo = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  loginFormLog() {
    console.log(this.loginInfo);
  }

  /* login(form: NgForm) { */
    /* this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
        this.navCtrl.navigateRoot('folder/inbox');
      },
      error => {
        this.navCtrl.navigateRoot('folder/inbox');
      }
    ) */
  /*   console.log(form.value);
    if (this.authService.login(form.value.username, form.value.password)){
      this.navCtrl.navigateRoot('folder/inbox');
    }
  } */

}
