import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusedClassificationComponent } from './focused-classification.component';

describe('FocusedClassificationComponent', () => {
  let component: FocusedClassificationComponent;
  let fixture: ComponentFixture<FocusedClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FocusedClassificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusedClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
