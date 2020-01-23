import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanerMyTransfersComponent } from './cleaner-my-transfers.component';

describe('CleanerMyTransfersComponent', () => {
  let component: CleanerMyTransfersComponent;
  let fixture: ComponentFixture<CleanerMyTransfersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanerMyTransfersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanerMyTransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
