import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRmaComponent } from './search-rma.component';

describe('SearchRmaComponent', () => {
  let component: SearchRmaComponent;
  let fixture: ComponentFixture<SearchRmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchRmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
