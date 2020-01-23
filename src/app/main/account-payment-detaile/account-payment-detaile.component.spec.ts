import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPaymentDetaileComponent } from './account-payment-detaile.component';

describe('AccountPaymentDetaileComponent', () => {
  let component: AccountPaymentDetaileComponent;
  let fixture: ComponentFixture<AccountPaymentDetaileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPaymentDetaileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPaymentDetaileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
