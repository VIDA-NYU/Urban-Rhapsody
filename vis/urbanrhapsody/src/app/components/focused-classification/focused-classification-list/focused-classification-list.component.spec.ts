import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusedClassificationListComponent } from './focused-classification-list.component';

describe('FocusedClassificationListComponent', () => {
  let component: FocusedClassificationListComponent;
  let fixture: ComponentFixture<FocusedClassificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FocusedClassificationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusedClassificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
