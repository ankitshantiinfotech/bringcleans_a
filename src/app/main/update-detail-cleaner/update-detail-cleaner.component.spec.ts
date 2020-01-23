import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDetailCleanerComponent } from './update-detail-cleaner.component';

describe('UpdateDetailCleanerComponent', () => {
  let component: UpdateDetailCleanerComponent;
  let fixture: ComponentFixture<UpdateDetailCleanerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDetailCleanerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDetailCleanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
