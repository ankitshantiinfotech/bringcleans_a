import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqCategoryPageComponent } from './faq-category-page.component';

describe('FaqCategoryPageComponent', () => {
  let component: FaqCategoryPageComponent;
  let fixture: ComponentFixture<FaqCategoryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqCategoryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
