import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutStoreComponent } from './about-store.component';

describe('AboutStoreComponent', () => {
  let component: AboutStoreComponent;
  let fixture: ComponentFixture<AboutStoreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
