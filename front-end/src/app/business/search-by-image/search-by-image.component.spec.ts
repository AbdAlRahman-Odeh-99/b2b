import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByImageComponent } from "./search-by-image.component";

describe('SearchByImageComponent', () => {
  let component: SearchByImageComponent;
  let fixture: ComponentFixture<SearchByImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
