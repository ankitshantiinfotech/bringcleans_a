import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterLoginFooterComponent } from './after-login-footer.component';

describe('AfterLoginFooterComponent', () => {
  let component: AfterLoginFooterComponent;
  let fixture: ComponentFixture<AfterLoginFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterLoginFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterLoginFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
