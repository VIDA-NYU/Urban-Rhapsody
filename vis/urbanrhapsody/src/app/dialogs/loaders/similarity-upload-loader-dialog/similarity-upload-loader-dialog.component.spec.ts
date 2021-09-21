import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarityUploadLoaderDialogComponent } from './similarity-upload-loader-dialog.component';

describe('SimilarityUploadLoaderDialogComponent', () => {
  let component: SimilarityUploadLoaderDialogComponent;
  let fixture: ComponentFixture<SimilarityUploadLoaderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimilarityUploadLoaderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarityUploadLoaderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
