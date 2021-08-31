import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusedTimelineComponent } from './focused-timeline.component';

describe('FocusedTimelineComponent', () => {
  let component: FocusedTimelineComponent;
  let fixture: ComponentFixture<FocusedTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FocusedTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusedTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
