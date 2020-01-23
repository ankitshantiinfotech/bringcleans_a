import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCleanerComponent } from './my-cleaner.component';

describe('MyCleanerComponent', () => {
  let component: MyCleanerComponent;
  let fixture: ComponentFixture<MyCleanerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCleanerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCleanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
