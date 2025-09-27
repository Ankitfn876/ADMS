import { TestBed } from '@angular/core/testing';

import { FloginNregisterService } from './flogin-nregister.service';

describe('FloginNregisterService', () => {
  let service: FloginNregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloginNregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
