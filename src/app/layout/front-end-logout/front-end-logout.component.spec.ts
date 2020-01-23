import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndLogoutComponent } from './front-end-logout.component';

describe('FrontEndLogoutComponent', () => {
  let component: FrontEndLogoutComponent;
  let fixture: ComponentFixture<FrontEndLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontEndLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontEndLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
