import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  Page = 'page1';
  resetInfo1: FormGroup;
  resetInfo2: FormGroup;

  constructor(
    private navCtrl: NavController,
    public formBuilder: FormBuilder
  ) {
    this.resetInfo1 = this.formBuilder.group({
      email: ['', Validators.required]
    });
    this.resetInfo2 = this.formBuilder.group({
      code: ['', Validators.required]
    });
  }

  @ViewChild('slider') slider: IonSlides;

  public slideOpts = {
    allowTouchMove: false,
    autoplay: false
  };

  ngOnInit() {
  }

  resetFormLog1() {
    console.log(this.resetInfo1);
  }

  resetFormLog2() {
    console.log(this.resetInfo2);
  }

  startReset(){
    this.Page = 'page2';
  }

  swipeNext() {
    this.slider.slideNext();
  }

  backToLogin() {
    this.navCtrl.navigateRoot('auth/login')
  }

  back(){
    this.slider.slidePrev();
  }

}
