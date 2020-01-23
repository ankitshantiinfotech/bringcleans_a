import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegCleanerComponent } from './reg-cleaner.component';

describe('RegCleanerComponent', () => {
  let component: RegCleanerComponent;
  let fixture: ComponentFixture<RegCleanerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegCleanerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegCleanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
