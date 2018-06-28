import { TestBed, async, inject } from '@angular/core/testing';

import { DirectoryGuard } from './directory.guard';

describe('DirectoryGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DirectoryGuard]
    });
  });

  it('should ...', inject([DirectoryGuard], (guard: DirectoryGuard) => {
    expect(guard).toBeTruthy();
  }));
});
