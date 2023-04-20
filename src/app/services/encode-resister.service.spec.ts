import { TestBed } from '@angular/core/testing';

import { EncodeResisterService } from './encode-resister.service';

describe('EncodeResisterService', () => {
  let service: EncodeResisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncodeResisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
