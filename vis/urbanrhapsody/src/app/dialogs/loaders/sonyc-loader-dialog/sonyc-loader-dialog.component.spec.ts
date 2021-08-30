import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonycLoaderDialogComponent } from './sonyc-loader-dialog.component';

describe('SonycLoaderDialogComponent', () => {
  let component: SonycLoaderDialogComponent;
  let fixture: ComponentFixture<SonycLoaderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SonycLoaderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SonycLoaderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
