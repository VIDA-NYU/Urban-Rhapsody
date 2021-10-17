import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrototypeSelectionDialogComponent } from './prototype-selection-dialog.component';

describe('PrototypeSelectionDialogComponent', () => {
  let component: PrototypeSelectionDialogComponent;
  let fixture: ComponentFixture<PrototypeSelectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrototypeSelectionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrototypeSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
