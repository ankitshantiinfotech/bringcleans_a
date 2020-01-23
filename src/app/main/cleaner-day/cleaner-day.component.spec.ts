import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanerDayComponent } from './cleaner-day.component';

describe('CleanerDayComponent', () => {
  let component: CleanerDayComponent;
  let fixture: ComponentFixture<CleanerDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanerDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanerDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
