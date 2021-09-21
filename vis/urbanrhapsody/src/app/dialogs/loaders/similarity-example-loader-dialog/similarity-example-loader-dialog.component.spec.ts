import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarityExampleLoaderDialogComponent } from './similarity-example-loader-dialog.component';

describe('SimilarityExampleLoaderDialogComponent', () => {
  let component: SimilarityExampleLoaderDialogComponent;
  let fixture: ComponentFixture<SimilarityExampleLoaderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimilarityExampleLoaderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarityExampleLoaderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
