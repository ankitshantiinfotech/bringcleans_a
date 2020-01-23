import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureBookingNotificationComponent } from './future-booking-notification.component';

describe('FutureBookingNotificationComponent', () => {
  let component: FutureBookingNotificationComponent;
  let fixture: ComponentFixture<FutureBookingNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureBookingNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureBookingNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
