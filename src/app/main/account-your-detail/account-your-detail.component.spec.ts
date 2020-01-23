import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountYourDetailComponent } from './account-your-detail.component';

describe('AccountYourDetailComponent', () => {
  let component: AccountYourDetailComponent;
  let fixture: ComponentFixture<AccountYourDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountYourDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountYourDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
