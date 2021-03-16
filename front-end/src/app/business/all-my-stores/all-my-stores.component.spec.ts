import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllMyStoresComponent } from './all-my-stores.component';

describe('AllMyStoresComponent', () => {
  let component: AllMyStoresComponent;
  let fixture: ComponentFixture<AllMyStoresComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMyStoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMyStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
