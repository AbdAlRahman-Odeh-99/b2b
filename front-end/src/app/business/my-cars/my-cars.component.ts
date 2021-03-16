import { FormArray, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarsService } from './service/cars.service';
import { ToastService } from '@app/shared/toaster/toast.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.component.html',
  styleUrls: ['./my-cars.component.scss'],
})
export class MyCarsComponent implements OnInit, OnDestroy {
  disableButtonSave = true;
  addNewCarFormGroup: FormGroup;
  disableAddNewCarBtn = true;
  myCars: FormGroup;
  listenOnErrorLoading: Subscription;
  constructor(private carsService: CarsService, private toastService: ToastService,
  ) {
    this.myCars = new FormGroup({ cars: new FormArray([]) });
    this.manageAddNewCar();
    this.getMyCars();
    this.listenOnErrorLoading = this.carsService.listenOnErrorLoading().subscribe(res => {
      this.manageMyCars([]);
    })
  }

  ngOnInit(): void { }

  getMyCars() {
    this.carsService.getMyCars().subscribe((res) => {
      this.manageMyCars(res.cars);
    });
  }

  manageMyCars(cars: any[] = []) {
    cars.forEach((car) => {
      (this.myCars.get('cars') as FormArray).push(
        new FormGroup({
          carId: new FormControl(car._id),
          model: new FormControl(car.model,
          Validators.compose([
            Validators.minLength(2),
            Validators.maxLength(24),
            Validators.required,
            this.customPatternValid({ pattern: /(^[\p{L} \d'-]{2,24}$)/ugi , msg: 'invalid model'})
          ])
        ),
          make: new FormControl(car.make,
          Validators.compose([
            Validators.minLength(3),
            Validators.maxLength(24),
            Validators.required,
            this.customPatternValid({ pattern: /(^[\p{L} \s\d'-]{3,24}$)/ugi , msg: 'invalid make'})
          ])
        ),
          year: new FormControl(
            car.year,
            Validators.compose([Validators.required])
          ),
          isEditing: new FormControl(false),
        })
      );
    });
  }
  manageAddNewCar() {
    this.addNewCarFormGroup = new FormGroup({
      model: new FormControl('',
          Validators.compose([
            Validators.minLength(2),
            Validators.maxLength(24),
            Validators.required,
            this.customPatternValid({ pattern: /(^[\p{L} \d'-]{2,24}$)/ugi , msg: 'invalid model'})
          ])
        ),
        make: new FormControl('',
          Validators.compose([
            Validators.minLength(3),
            Validators.maxLength(24),
            Validators.required,
            this.customPatternValid({ pattern: /(^[\p{L} \s\d'-]{3,24}$)/ugi , msg: 'invalid make'})
          ])
        ),
      year: new FormControl(
        '',
        Validators.compose([
          // Validators.pattern(/(^[\d']{4}$)/),
          Validators.required,
        ])
      ),
    });
    this.listenOnAddNewCarBtn();
  }

  listenOnAddNewCarBtn() {
    this.addNewCarFormGroup.valueChanges.subscribe(() => {
      if (this.addNewCarFormGroup.valid) {
        this.disableAddNewCarBtn = false;
      } else {
        this.disableAddNewCarBtn = true;
      }
    });
  }

  manipulateDataBeforeSendingForYear(data): any {
    data.year = '' + new Date(data.year.toString()).getFullYear();
    return data;
  }

  addCar() {
    if (this.addNewCarFormGroup.valid) {
      this.carsService
        .addNewCar(
          this.manipulateDataBeforeSendingForYear(
            this.addNewCarFormGroup.value
          )
        )
        .subscribe(() => {
          this.myCars = new FormGroup({ cars: new FormArray([]) });
          // this.carsService.resetBothDataSkipAndLimit();
          this.disableAddNewCarBtn = true;
          this.manageAddNewCar();
          this.getMyCars();
          this.toastService.presentToastWithOptions('success', 'Car created successfully', 'success');
        });
    }
  }

  saveEditedCar(index) {
    const { carId } = (this.myCars.get('cars') as FormArray).at(index).value;
    const info = (this.myCars.get('cars') as FormArray).at(index).value;
    const data = {
      make: info.make,
      model: info.model,
      year: info.year,
    };
    this.carsService.editCar(carId, this.manipulateDataBeforeSendingForYear(data)).subscribe(() => {
      this.toastService.presentToastWithOptions('success', 'Car updated successfully', 'success');
      (this.myCars.get('cars') as FormArray).at(index).get('isEditing').setValue(false);
    });
  }

  editCar(index) {
    (this.myCars.get('cars') as FormArray).at(index).get('isEditing').setValue(true);
  }
  deleteCar(index) {
    const { carId } = (this.myCars.get('cars') as FormArray).at(index).value;
    this.carsService.deleteCar(carId).subscribe(() => {
      (this.myCars.get('cars') as FormArray).removeAt(index);
      this.toastService.presentToastWithOptions('success', 'Car removed successfully', 'success');
    });
  }
  
  ngOnDestroy(): void {
    // this.carsService.resetBothDataSkipAndLimit();
    this.listenOnErrorLoading.unsubscribe();
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
