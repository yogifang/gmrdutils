import { TestBed } from '@angular/core/testing';

import { SendAttendanceService } from './send-attendance.service';

describe('SendAttendanceService', () => {
  let service: SendAttendanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendAttendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
