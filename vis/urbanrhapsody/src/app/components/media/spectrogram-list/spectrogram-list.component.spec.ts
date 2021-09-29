import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectrogramListComponent } from './spectrogram-list.component';

describe('SpectrogramListComponent', () => {
  let component: SpectrogramListComponent;
  let fixture: ComponentFixture<SpectrogramListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpectrogramListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectrogramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
