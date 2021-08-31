import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTimelineComponent } from './calendar-timeline.component';

describe('CalendarTimelineComponent', () => {
  let component: CalendarTimelineComponent;
  let fixture: ComponentFixture<CalendarTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
