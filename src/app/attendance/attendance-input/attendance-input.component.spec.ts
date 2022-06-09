import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceInputComponent } from './attendance-input.component';

describe('AttendanceInputComponent', () => {
  let component: AttendanceInputComponent;
  let fixture: ComponentFixture<AttendanceInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
