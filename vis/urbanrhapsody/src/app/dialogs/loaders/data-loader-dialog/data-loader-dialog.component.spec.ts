import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLoaderDialogComponent } from './data-loader-dialog.component';

describe('DataLoaderDialogComponent', () => {
  let component: DataLoaderDialogComponent;
  let fixture: ComponentFixture<DataLoaderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataLoaderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLoaderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
