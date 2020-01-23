import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetaileChangingComponent } from './account-detaile-changing.component';

describe('AccountDetaileChangingComponent', () => {
  let component: AccountDetaileChangingComponent;
  let fixture: ComponentFixture<AccountDetaileChangingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetaileChangingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetaileChangingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
