import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyStoreComponent } from './my-store.component';

describe('MyStoreComponent', () => {
  let component: MyStoreComponent;
  let fixture: ComponentFixture<MyStoreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
