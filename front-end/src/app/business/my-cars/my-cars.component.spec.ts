import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyCarsComponent } from './my-cars.component';

describe('MyCarsComponent', () => {
  let component: MyCarsComponent;
  let fixture: ComponentFixture<MyCarsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
