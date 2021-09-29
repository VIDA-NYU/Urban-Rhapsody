import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionLegendComponent } from './projection-legend.component';

describe('ProjectionLegendComponent', () => {
  let component: ProjectionLegendComponent;
  let fixture: ComponentFixture<ProjectionLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionLegendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
