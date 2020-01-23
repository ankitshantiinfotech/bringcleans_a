import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegFinishComponent } from './reg-finish.component';

describe('RegFinishComponent', () => {
  let component: RegFinishComponent;
  let fixture: ComponentFixture<RegFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
