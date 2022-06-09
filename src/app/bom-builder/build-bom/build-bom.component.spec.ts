import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildBomComponent } from './build-bom.component';

describe('BuildBomComponent', () => {
  let component: BuildBomComponent;
  let fixture: ComponentFixture<BuildBomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildBomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildBomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
