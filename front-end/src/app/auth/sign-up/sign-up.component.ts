import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@app/core/services/auth/auth.service';
import { NavController } from '@ionic/angular';
import { NgForm, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SignUpInfoService } from '@app/core/services/sign-up/sign-up-info.service';
import { Router } from '@angular/router';
import { AuthRoutingConstants, AppRoutingConstants, SharedRoutingConstants } from '@app/core/constants/routes';
import { convertFrom24To12Hour } from '@app/shared/functions/convertTime';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  type: string;
  userInfo: FormGroup;
  subscription: Subscription;
  disableNextButton = true;
  disableSaveButton = true;
  buttonName = 'NEXT';
  isLoading: boolean = false;
  isMoved = false;
  headerName = 'USER_INFO';
  heightClassName = 'user-info';
  data: any;
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private signUpInfoService: SignUpInfoService,
    private translate: TranslateService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.type = params.type;
      this.signUpInfoService.setType(this.type);
      this.signUpInfoService.createSignUpInfoDate();
      this.userInfo = this.signUpInfoService.getUserInfoData();
      this.listenOnNextButton();
      this.listenOnSaveButton();
    });
    this.router.events.subscribe(() => {
      const url = this.router.url;
      if (url.includes(AuthRoutingConstants.USER_INFO)) {
        this.heightClassName = 'user-info';
        this.buttonName = 'NEXT';
        this.isMoved = false;
        this.userInfo.updateValueAndValidity();
        this.headerName = 'USER_INFORMATION';
      } else if (url.includes(AuthRoutingConstants.CAR_INFO) || url.includes(AuthRoutingConstants.GARAGE_INFO)) {
        this.isMoved = true;
        if (url.includes(AuthRoutingConstants.CAR_INFO)) {
          this.heightClassName = 'car-info';
          this.headerName = 'CAR_INFORMATION';
        } else {
          this.heightClassName = 'garage-info';
          this.headerName = 'GARAGE_INFORMATION';
        }
        this.buttonName = 'SAVE';
        this.userInfo.updateValueAndValidity();
      }
    });
    this.subscription = this.authService.errorLoadingAuth.subscribe(() => {
      this.isLoading = false;
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  listenOnSaveButton() {
    if (this.type === SharedRoutingConstants.CAR) {
      this.signUpInfoService.getCarInfoData().valueChanges.subscribe((res) => {
        if (this.signUpInfoService.getCarInfoData().valid) {
          this.disableSaveButton = false;
        } else {
          this.disableSaveButton = true;
        }
      });
    }
    else if (this.type === SharedRoutingConstants.GARAGE) {
      this.signUpInfoService.getGarageInfoData().valueChanges.subscribe(() => {
        if (this.signUpInfoService.getGarageInfoData().valid) {
          this.disableSaveButton = false;
        } else {
          this.disableSaveButton = true;
        }
      });
    }
  }

  listenOnNextButton() {
    this.userInfo.valueChanges.subscribe(() => {
      if (this.userInfo.valid) {
        this.disableNextButton = false;
      } else {
        this.disableNextButton = true;
      }
    });
  }

  ngOnInit(): void {
  }

  backURL() {
    this.navCtrl.back();
  }

  nextPage() {
    if (this.userInfo.valid) {
      if (this.type === SharedRoutingConstants.CAR) {
        this.router.navigateByUrl(`/${AppRoutingConstants.AUTH}/${AuthRoutingConstants.SIGN_UP}/${SharedRoutingConstants.CAR}/${AuthRoutingConstants.CAR_INFO}`);
        this.isMoved = true;
        this.disableNextButton = true;
        this.buttonName = 'SAVE';
      } else if (this.type === SharedRoutingConstants.GARAGE) {
        this.buttonName = 'SAVE';
        this.router.navigateByUrl(`/${AppRoutingConstants.AUTH}/${AuthRoutingConstants.SIGN_UP}/${SharedRoutingConstants.GARAGE}/${AuthRoutingConstants.GARAGE_INFO}`);
        this.disableNextButton = true;
        this.isMoved = true;
      }
    }
    this.isMoved = false;
  }

  saveInfo() {
    this.isLoading = true;
    if (this.userInfo.valid && ((this.type === SharedRoutingConstants.CAR && this.signUpInfoService.getCarInfoData().valid) || (this.type === SharedRoutingConstants.GARAGE && this.signUpInfoService.getGarageInfoData().valid))) {
      if (this.type === SharedRoutingConstants.GARAGE) {
        const data = JSON.parse(JSON.stringify(this.signUpInfoService.getMergeBeforeSendToBackEndForGarage()));
        
        this.authService.signUpForGarageOwner(this.manipulateDataBeforeSending(data)).subscribe((res) => {
          if (res) {
            this.router.navigateByUrl(`/${AppRoutingConstants.AUTH}`);
          }
        });
      } else {
        const data = JSON.parse(JSON.stringify(this.signUpInfoService.getMergeBeforeSendToBackEndForCar()));
        
        this.authService.signUpForCarOwner(this.manipulateDataBeforeSending(data)).subscribe((res) => {
          if (res) {
            this.router.navigateByUrl(`/${AppRoutingConstants.AUTH}`);
          }
        });
      }
    }
  }

  manipulateDataBeforeSending(data: any) {
    if (this.type === SharedRoutingConstants.GARAGE) {
      if (this.data.store.openTime.toString().includes('T'))
      this.data.store.openTime = convertFrom24To12Hour(this.data.store.openTime.toString().split('T')[1].split('.')[0]);
      if (this.data.store.closeTime.toString().includes('T'))
      this.data.store.closeTime = convertFrom24To12Hour(this.data.store.closeTime.toString().split('T')[1].split('.')[0]);
    } else {
      data.car.year = '' + new Date(data.car.year.toString()).getFullYear();
    }
    return data;
  }

  doSomething() {
    const url = this.router.url;
    if (url.includes(AuthRoutingConstants.USER_INFO)) {
      this.nextPage();
    } else {
      this.saveInfo();
    }
  }
}
