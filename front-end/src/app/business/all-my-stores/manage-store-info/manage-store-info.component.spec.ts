import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManageStoreInfoComponent } from './manage-store-info.component';

describe('ManageStoreInfoComponent', () => {
  let component: ManageStoreInfoComponent;
  let fixture: ComponentFixture<ManageStoreInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageStoreInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
