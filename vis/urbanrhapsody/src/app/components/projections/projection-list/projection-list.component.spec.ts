import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionListComponent } from './projection-list.component';

describe('ProjectionListComponent', () => {
  let component: ProjectionListComponent;
  let fixture: ComponentFixture<ProjectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
