import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCenceledComponent } from './booking-cenceled.component';

describe('BookingCenceledComponent', () => {
  let component: BookingCenceledComponent;
  let fixture: ComponentFixture<BookingCenceledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingCenceledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingCenceledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
