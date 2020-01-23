import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pricing2PageComponent } from './pricing2-page.component';

describe('Pricing2PageComponent', () => {
  let component: Pricing2PageComponent;
  let fixture: ComponentFixture<Pricing2PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pricing2PageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pricing2PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
