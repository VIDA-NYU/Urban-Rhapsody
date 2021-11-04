import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrototypeRefinementDialogComponent } from './prototype-refinement-dialog.component';

describe('PrototypeRefinementDialogComponent', () => {
  let component: PrototypeRefinementDialogComponent;
  let fixture: ComponentFixture<PrototypeRefinementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrototypeRefinementDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrototypeRefinementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
