import { TestBed } from '@angular/core/testing';

import { LoginregisterService } from './loginregister.service';

describe('LoginregisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginregisterService = TestBed.get(LoginregisterService);
    expect(service).toBeTruthy();
  });
});
