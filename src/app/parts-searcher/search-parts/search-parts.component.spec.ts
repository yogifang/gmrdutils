import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPartsComponent } from './search-parts.component';

describe('SearchPartsComponent', () => {
  let component: SearchPartsComponent;
  let fixture: ComponentFixture<SearchPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
