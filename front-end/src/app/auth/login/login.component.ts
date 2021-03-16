import { IonicModule, NavController } from '@ionic/angular';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthRoutingConstants, AppRoutingConstants, SharedRoutingConstants } from '@app/core/constants/routes';
import { AuthService } from '@app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginInfo: FormGroup;

  pathOfSignUpForCarOwner: string = `/${AppRoutingConstants.AUTH}/${AuthRoutingConstants.SIGN_UP}/${SharedRoutingConstants.CAR}/${AuthRoutingConstants.USER_INFO}`;
  pathOfSignUpForG1Owner: string = `/${AppRoutingConstants.AUTH}/${AuthRoutingConstants.SIGN_UP}/${SharedRoutingConstants.GARAGE}/${AuthRoutingConstants.USER_INFO}`;
  pathOfResetPassword: string = `/${AppRoutingConstants.AUTH}/${AuthRoutingConstants.RESET_PASSWORD}`;
  listenOnErrorLogin: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    public formBuilder: FormBuilder
  ) {
    this.loginInfo = this.formBuilder.group({
      username: new FormControl('',
      Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(64),
        Validators.pattern(/(^[A-Z a-z \s]{3,64}$)/),
        Validators.required
      ])),
      password: new FormControl('',
      Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(64),
        Validators.pattern(/(.{8,64})/),
        Validators.required
      ])),
    rememberMe: new FormControl(false),
    });

    
  }

  ngOnInit() {
  }

  loginFormLog() {
    console.log(this.loginInfo);
    if (this.loginInfo.valid) {
      this.authService.login(this.loginInfo.value);
    }
  }
}
