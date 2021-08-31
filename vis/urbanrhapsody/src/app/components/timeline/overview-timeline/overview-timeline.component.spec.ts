import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewTimelineComponent } from './overview-timeline.component';

describe('OverviewTimelineComponent', () => {
  let component: OverviewTimelineComponent;
  let fixture: ComponentFixture<OverviewTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
