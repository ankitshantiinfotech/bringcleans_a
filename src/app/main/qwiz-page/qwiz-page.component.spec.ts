import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QwizPageComponent } from './qwiz-page.component';

describe('QwizPageComponent', () => {
  let component: QwizPageComponent;
  let fixture: ComponentFixture<QwizPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QwizPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QwizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
