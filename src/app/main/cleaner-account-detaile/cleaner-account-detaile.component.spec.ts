import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanerAccountDetaileComponent } from './cleaner-account-detaile.component';

describe('CleanerAccountDetaileComponent', () => {
  let component: CleanerAccountDetaileComponent;
  let fixture: ComponentFixture<CleanerAccountDetaileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanerAccountDetaileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanerAccountDetaileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
