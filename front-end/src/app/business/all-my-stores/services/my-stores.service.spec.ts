import { TestBed } from '@angular/core/testing';

import { MyStoresService } from './my-stores.service';

describe('MyStoresService', () => {
  let service: MyStoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyStoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
