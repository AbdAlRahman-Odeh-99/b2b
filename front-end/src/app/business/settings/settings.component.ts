import { User } from '@app/core/model/user';
import { UserInfoService } from './service/user-info.service';
import { AuthService } from '@app/core/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastService } from '@app/shared/toaster/toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  darkMode: boolean;
  isLoggedIn = false; 
  role: string;
  selectedLanguage: string;

  userInfo: FormGroup;

  data: any;

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private toastService: ToastService,
    private userInfoService: UserInfoService
  ) {

  }


  getUserInfo() {
    this.userInfoService.getUserInfo().subscribe(res => {
      const user:User = res.user?.result || {};
      this.userInfo = new FormGroup({
        username: new FormControl(user.username,
          Validators.compose([
            Validators.minLength(8),
            Validators.maxLength(64),
            Validators.required,
            this.customPatternValid({ pattern: /(^[\p{L}\d_]{8,64}$)/ugi, msg: 'INVALID_USERNAME' })
          ])
        ),
        fullName: new FormControl(user.fullName,
          Validators.compose([
            Validators.minLength(3),
            Validators.maxLength(64),
            Validators.required,
            this.customPatternValid({ pattern: /(^[\p{L}\s]{3,64}$)/ugi, msg: 'INVALID_NAME' })
          ])),
        email: new FormControl(user.email,
          Validators.compose([
            Validators.required,
            Validators.email,
            this.customPatternValid({ pattern: /(^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$)/, msg: 'INVALID_EMAIL' })
          ])),
        address: new FormControl(user.address,
          Validators.compose([
            Validators.minLength(5),
            Validators.maxLength(8),
            Validators.required,
            this.customPatternValid({ pattern: /(^[A-Z a-z ' -]{5,8}$)/, msg: 'INVALID_ADDRESS' })
          ])),
        role: new FormControl(user.role),
        phoneNumber: new FormControl(user.phoneNumber,
          Validators.compose([
            Validators.required,
            this.customPatternValid({ pattern: /(^\d{10}$)/, msg: 'MUST_BE_10_NUMBERS' }),
            this.customPatternValid({ pattern: /(^[0][7][789])/, msg: 'MUST_START_WITH_(077_OR_078_OR_079)' })
          ])),
        // password: new FormControl(user.,
        //   Validators.compose([
        //     Validators.minLength(8),
        //     Validators.maxLength(64),
        //     Validators.required,
        //     this.customPatternValid({ pattern: /(^.{8,64}$)/, msg: 'INVALID_PASSWORD' })
        //   ])),
      });
    })
  }

  ngOnInit() {

    if (this.authService.loggedIn) {
      this.isLoggedIn = true;
    }
    this.role = this.authService.getRole();

    if (localStorage.getItem('darkMode') === 'disabled') {
      this.darkMode = false;
    }
    else if (localStorage.getItem('darkMode') === 'enabled') {
      this.darkMode = true;
    }

    this.selectedLanguage = localStorage.getItem('language');


    if (this.isLoggedIn) {
      this.getUserInfo();
    }
  }

  toggleClicked() {

    this.darkMode = !this.darkMode;

    document.body.classList.toggle('dark');

    if (this.darkMode == true) {
      localStorage.setItem('darkMode', 'enabled');
    }
    else if (this.darkMode == false) {
      localStorage.setItem('darkMode', 'disabled');
    }

  }

  onChange(value: any) {
    localStorage.setItem('language', this.selectedLanguage);
    if (this.translate) {
      this.translate.use(this.selectedLanguage);
    }
  }

  setUserInfo() {
    this.userInfoService.setUserInfo(this.userInfo.value).subscribe(res => {
      this.toastService.presentToastWithOptions('success', 'User Info updated successfully', 'success');
    });
  }

  public customPatternValid(config: any): ValidatorFn {
    return (control: FormControl) => {
      let urlRegEx: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegEx)) {
        return {
          invalidMsg: config.msg
        };
      } else {
        return null;
      }
    };
  }

  refreshPage(){

  }
}
