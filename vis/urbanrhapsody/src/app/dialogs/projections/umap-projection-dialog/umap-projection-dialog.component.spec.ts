import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmapProjectionDialogComponent } from './umap-projection-dialog.component';

describe('UmapProjectionDialogComponent', () => {
  let component: UmapProjectionDialogComponent;
  let fixture: ComponentFixture<UmapProjectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UmapProjectionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UmapProjectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
