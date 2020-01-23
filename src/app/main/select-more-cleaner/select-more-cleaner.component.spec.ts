import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMoreCleanerComponent } from './select-more-cleaner.component';

describe('SelectMoreCleanerComponent', () => {
  let component: SelectMoreCleanerComponent;
  let fixture: ComponentFixture<SelectMoreCleanerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMoreCleanerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMoreCleanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
