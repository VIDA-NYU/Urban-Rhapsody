import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CalendarTimelineController } from './controller/calendar-timeline.controller'

@Component({
  selector: 'app-calendar-timeline',
  templateUrl: './calendar-timeline.component.html',
  styleUrls: ['./calendar-timeline.component.scss']
})
export class CalendarTimelineComponent implements OnInit, AfterViewInit {

  // controller
  public calendarTimelineController!: CalendarTimelineController;

  // element refs
  @ViewChild('chartcontainerref') chartcontainerref!: ElementRef;

  constructor() {}

  ngOnInit(): void {

    // creating controller
    this.calendarTimelineController = new CalendarTimelineController();

  }

  ngAfterViewInit(): void{

    this.calendarTimelineController.initialize_chart( this.chartcontainerref.nativeElement );
    this.calendarTimelineController.get_mock_data();

  }

}
