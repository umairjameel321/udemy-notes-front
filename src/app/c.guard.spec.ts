import { TestBed, async, inject } from '@angular/core/testing';

import { CGuard } from './c.guard';

describe('CGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CGuard]
    });
  });

  it('should ...', inject([CGuard], (guard: CGuard) => {
    expect(guard).toBeTruthy();
  }));
});
