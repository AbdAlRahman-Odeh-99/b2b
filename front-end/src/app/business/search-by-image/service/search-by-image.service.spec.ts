import { TestBed } from '@angular/core/testing';

import { SearchByImageService } from './search-by-image.service';

describe('SearchByImageService', () => {
  let service: SearchByImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchByImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
