import { Injectable, ɵConsole } from '@angular/core';
import { FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class SignUpInfoService {
  private signUpInfoData: FormGroup;
  private userInfo: FormGroup;
  private carInfo: FormGroup;
  private garageInfo: FormGroup;
  private type: string;
  private enableSaveButton = false;
  private enableNextButton = false;

  constructor() {
  }

  public setType(type: string): void {
    this.type = type;
  }

  public getType(): string {
    return this.type;
  }

  public resetType(): void {
    this.type = null;
  }

  public resetEnableSaveButton(): void {
    this.enableSaveButton = false;
  }

  public getUserInfoData(): FormGroup {
    return this.userInfo;
  }

  public getSignUpInfoData(): FormGroup {
    return this.signUpInfoData;
  }

  public getGarageInfoData(): FormGroup {
    return this.garageInfo;
  }

  public getCarInfoData(): FormGroup {
    return this.carInfo;
  }

  public getEnableSaveButton(): boolean {
    return this.enableSaveButton;
  }

  public getEnableNextButton(): boolean {
    return this.enableNextButton;
  }

  public resetEnableNextButton(): void {
    this.enableNextButton = false;
  }

  public enableEnableSaveButton(): void {
    this.enableSaveButton = true;
  }

  public enableEnableNextButton(): void {
    this.enableNextButton = true;
  }

  public disableEnableSaveButton(): void {
    this.enableSaveButton = false;
  }

  public disableEnableNextButton(): void {
    this.enableNextButton = false;
  }

  private createUserInfo() {
    this.userInfo = new FormGroup({
      username: new FormControl('',
        Validators.compose([
          Validators.minLength(8),
          Validators.maxLength(64),
          Validators.required,
          this.customPatternValid({ pattern: /(^[\p{L}\d_]{8,64}$)/ugi, msg: 'invalid username' })
        ])),
      fullName: new FormControl('',
        Validators.compose([
          Validators.minLength(8),
          Validators.maxLength(64),
          Validators.required,
          this.customPatternValid({ pattern: /(^[\p{L}\s]{3,64}$)/ugi, msg: 'invalid name' })
        ])),
      email: new FormControl('',
        Validators.compose([
          Validators.email,
          Validators.required,
          this.customPatternValid({ pattern: /(^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$)/, msg: 'invalid email' })
        ])),
      address: new FormControl('',
        Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(8),
          Validators.required,
          this.customPatternValid({ pattern: /(^[A-Z a-z ' -]{5,8}$)/, msg: 'invalid address' })
        ])),
      phoneNumber: new FormControl('',
        Validators.compose([
          Validators.required,
          this.customPatternValid({ pattern: /(^\d{10}$)/, msg: 'must be 10 numbers' }),
          this.customPatternValid({ pattern: /(^[0][7][789])/, msg: 'must start with (077 or 078 or 079)' })
        ])),
      password: new FormControl('',
        Validators.compose([
          Validators.minLength(8),
          Validators.maxLength(64),
          Validators.required,
          this.customPatternValid({ pattern: /(^.{8,64}$)/, msg: 'invalid password' })
        ])),
      role: new FormControl(''),
    });
  }

  private createStructureOfDataForGarage() {
    this.garageInfo = new FormGroup({
      name:
        new FormControl('',
          Validators.compose([
            Validators.minLength(8),
            Validators.maxLength(64),
            Validators.required,
            this.customPatternValid({ pattern: /(^[\p{L} \d\s_'-]{4,64}$)/ugi, msg: 'invalid name' })
          ])
        ),
      openTime:
        new FormControl('',
          Validators.compose([
            // Validators.pattern('[a-zA-Z_ ]*'),
            Validators.required,
          ])
        ),
      closeTime:
        new FormControl('',
          Validators.compose([
            // Validators.pattern('[a-zA-Z_ ]*'),
            Validators.required
          ])
        ),
      address:
        new FormControl('',
          Validators.compose([
            Validators.minLength(4),
            Validators.maxLength(8),
            Validators.required,
            this.customPatternValid({ pattern: /(^[\p{L}'-]{4,8}$)/ugi, msg: 'invalid address' })
          ])
        ),
      tags:
        new FormControl('',
          Validators.compose([
            Validators.minLength(2),
            Validators.maxLength(256),
            Validators.required,
            this.customPatternValid({ pattern: /(^[\p{L}\s\d',-]{2,256}$)/ugi, msg: 'invalid tags' })
          ])
        ),
      description:
        new FormControl('',
          Validators.compose([
            Validators.minLength(8),
            Validators.maxLength(512),
            Validators.required,
            this.customPatternValid({ pattern: /(^[\p{L}\d\s_\.'-]{8,512}$)/ugi, msg: 'invalid description' })
          ])
        ),
      lat:
        new FormControl('',
          Validators.compose([
            Validators.pattern(/(^(\d+).?(\d+)$)/),
            Validators.required
          ])
        ),
      long:
        new FormControl('',
          Validators.compose([
            Validators.pattern(/(^(\d+).?(\d+)$)/),
            Validators.required
          ])
        ),
      image: new FormControl(''),
    });

  }

  private createStructureOfDataForCar() {
    this.carInfo = new FormGroup(
      {
        model: new FormControl('',
          Validators.compose([
            Validators.minLength(2),
            Validators.maxLength(24),
            Validators.required,
            this.customPatternValid({ pattern: /(^[\p{L} \d'-]{2,24}$)/ugi, msg: 'invalid model' })
          ])
        ),
        make: new FormControl('',
          Validators.compose([
            Validators.minLength(3),
            Validators.maxLength(24),
            Validators.required,
            this.customPatternValid({ pattern: /(^[\p{L} \s\d'-]{3,24}$)/ugi, msg: 'invalid make' })
          ])
        ),
        year: new FormControl('',
          Validators.compose([
            // Validators.pattern(/(^[\d']{4}$)/),
            Validators.required
          ])
        ),
        // image: new FormControl(''),
      });
  }

  createSignUpInfoDate(): boolean {
    if (this.type) {
      this.createUserInfo();
      if (this.type === 'car') {
        this.createStructureOfDataForCar();
      } else if (this.type === 'garage') {
        this.createStructureOfDataForGarage();
      } else {
        return false;
      }
      // this.listenOnEnableNextButton();
      // this.listenOnEnableSaveButton();
      return true;
    } else {
      return false;
    }
  }

  public getMergeBeforeSendToBackEndForGarage() {
    return { user: this.userInfo.value, store: this.garageInfo.value };
  }

  public getMergeBeforeSendToBackEndForCar() {
    return { user: this.userInfo.value, car: this.carInfo.value };
  }
  listenOnEnableSaveButton(): void {
    if (this.type === 'car') {
      this.carInfo.valueChanges.subscribe(() => {
        if (this.carInfo.valid) {
          this.enableEnableSaveButton();
        } else {
          this.disableEnableSaveButton();
        }
      });
    }
    else if (this.type === 'car') {
      this.carInfo.valueChanges.subscribe(() => {
        if (this.garageInfo.valid) {
          this.enableEnableSaveButton();
        } else {
          this.disableEnableSaveButton();
        }
      });
    }

  }
  listenOnEnableNextButton() {
    this.userInfo.valueChanges.subscribe(() => {
      if (this.userInfo.valid) {
        this.enableEnableNextButton();
      } else {
        this.disableEnableNextButton();
      }
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
}
