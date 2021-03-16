import { TestBed } from '@angular/core/testing';

import { SignUpInfoService } from './sign-up-info.service';

describe('SignUpInfoService', () => {
  let service: SignUpInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignUpInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
