import { Injectable, ɵConsole } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class SignUpInfoService {
  private signUpInfoData: FormGroup;
  private userInfo: FormGroup;
  private carInfo: FormGroup;
  private garageInfo: FormGroup;
  private type: string;
  private enableSaveButton: boolean = false;
  private enableNextButton: boolean = false;

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
          Validators.pattern(/(^[A-Z a-z \s]{3,64}$)/),
          Validators.required
        ])),
      fullName: new FormControl('',
        Validators.compose([
          Validators.minLength(8),
          Validators.maxLength(64),
          Validators.pattern(/(^[A-Z a-z \d_]{8,64}$)/),
          Validators.required
        ])),
      email: new FormControl('',
        Validators.compose([
          Validators.pattern('^[a-z0-9_\.-]*@[\da-z]*\.[a-z]{2,6}$'),
          Validators.required
        ])),
      phoneNumber: new FormControl('',
        Validators.compose([
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/(^[0][7][789]\d{7}$)/),
          Validators.required
        ])),
      password: new FormControl('',
        Validators.compose([
          Validators.minLength(8),
          Validators.maxLength(64),
          Validators.pattern(/(.{8,64})/),
          Validators.required
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
            Validators.pattern(/(^[A-Z a-z \d\s-_']{4,64}$)/),
            Validators.required
          ])
        ),
      openTime:
        new FormControl('',
          Validators.compose([
            // Validators.pattern('[a-zA-Z_ ]*'),
            Validators.required
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
            Validators.pattern(/(^[A-Z a-z ' -]{5,8}$)/),
            Validators.required
          ])
        ),
      location:
        new FormControl('asfsdd',
          Validators.compose([
            Validators.pattern(/(^[A-Z a-z ' -]{5,8}$)/),
            // Validators.required
          ])
        ),
      tags:
        new FormControl('',
          Validators.compose([
            Validators.pattern(/(^[A-Z a-z\s\d-,']{2,256}$)/),
            Validators.required
          ])
        ),
      description:
        new FormControl('',
          Validators.compose([
            Validators.pattern(/(^[A-Z a-z \d\s-_.']{8,512}$)/),
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
            Validators.minLength(8),
            Validators.maxLength(100),
            Validators.pattern(/(^[A-Z a-z \d ']{2,24}$)/),
            Validators.required
          ])
        ),
        make: new FormControl('',
          Validators.compose([
            Validators.minLength(8),
            Validators.maxLength(100),
            Validators.pattern(/(^[A-Z a-z \s\d-']{3,24}$)/),
            Validators.required
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
          this.enableEnableSaveButton()
        } else {
          this.disableEnableSaveButton();
        }
      });
    }
    else if (this.type === 'car') {
      this.carInfo.valueChanges.subscribe(() => {
        if (this.garageInfo.valid) {
          this.enableEnableSaveButton()
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
}
