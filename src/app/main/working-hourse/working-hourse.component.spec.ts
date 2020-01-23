import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingHourseComponent } from './working-hourse.component';

describe('WorkingHourseComponent', () => {
  let component: WorkingHourseComponent;
  let fixture: ComponentFixture<WorkingHourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingHourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingHourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
