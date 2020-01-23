import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypayoutComponent } from './mypayout.component';

describe('MypayoutComponent', () => {
  let component: MypayoutComponent;
  let fixture: ComponentFixture<MypayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
