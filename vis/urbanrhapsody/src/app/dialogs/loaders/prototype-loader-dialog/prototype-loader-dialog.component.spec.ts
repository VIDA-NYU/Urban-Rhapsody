import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrototypeLoaderDialogComponent } from './prototype-loader-dialog.component';

describe('PrototypeLoaderDialogComponent', () => {
  let component: PrototypeLoaderDialogComponent;
  let fixture: ComponentFixture<PrototypeLoaderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrototypeLoaderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrototypeLoaderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
