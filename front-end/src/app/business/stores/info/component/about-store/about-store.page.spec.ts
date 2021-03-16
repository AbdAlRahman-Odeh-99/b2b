import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutStorePage } from './about-store.page';

describe('AboutStorePage', () => {
  let component: AboutStorePage;
  let fixture: ComponentFixture<AboutStorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutStorePage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutStorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
