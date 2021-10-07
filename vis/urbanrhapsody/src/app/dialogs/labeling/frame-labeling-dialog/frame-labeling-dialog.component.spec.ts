import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameLabelingDialogComponent } from './frame-labeling-dialog.component';

describe('FrameLabelingDialogComponent', () => {
  let component: FrameLabelingDialogComponent;
  let fixture: ComponentFixture<FrameLabelingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameLabelingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameLabelingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
