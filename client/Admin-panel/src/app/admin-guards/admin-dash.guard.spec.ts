import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminDashGuard } from './admin-dash.guard';

describe('adminDashGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminDashGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
