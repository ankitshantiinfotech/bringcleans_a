import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanerFutureBookingsComponent } from './cleaner-future-bookings.component';

describe('CleanerFutureBookingsComponent', () => {
  let component: CleanerFutureBookingsComponent;
  let fixture: ComponentFixture<CleanerFutureBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanerFutureBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanerFutureBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
