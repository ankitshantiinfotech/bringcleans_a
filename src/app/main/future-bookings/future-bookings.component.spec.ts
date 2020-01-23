import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureBookingsComponent } from './future-bookings.component';

describe('FutureBookingsComponent', () => {
  let component: FutureBookingsComponent;
  let fixture: ComponentFixture<FutureBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
