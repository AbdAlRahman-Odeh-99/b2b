import { TestBed } from '@angular/core/testing';

import { BusinessAllowedGuard } from './business-allowed.guard';

describe('BusinessAllowedGuard', () => {
  let guard: BusinessAllowedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BusinessAllowedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
