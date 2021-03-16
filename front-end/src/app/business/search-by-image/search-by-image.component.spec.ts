import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchByImageComponent } from './search-by-image.component';

describe('SearchByImageComponent', () => {
  let component: SearchByImageComponent;
  let fixture: ComponentFixture<SearchByImageComponent>;

  beforeEach(waitForAsync(() => {
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
