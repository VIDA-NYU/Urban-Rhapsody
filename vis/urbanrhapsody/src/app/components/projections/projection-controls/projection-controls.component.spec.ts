import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionControlsComponent } from './projection-controls.component';

describe('ProjectionControlsComponent', () => {
  let component: ProjectionControlsComponent;
  let fixture: ComponentFixture<ProjectionControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
