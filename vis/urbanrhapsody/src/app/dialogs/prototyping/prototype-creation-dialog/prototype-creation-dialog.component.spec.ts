import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrototypeCreationDialogComponent } from './prototype-creation-dialog.component';

describe('PrototypeCreationDialogComponent', () => {
  let component: PrototypeCreationDialogComponent;
  let fixture: ComponentFixture<PrototypeCreationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrototypeCreationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrototypeCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
