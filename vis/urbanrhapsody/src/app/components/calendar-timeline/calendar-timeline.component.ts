import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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

  // outputs
  @Output('oncellclick') oncellclick: EventEmitter<{day: string}> = new EventEmitter<{day: string}>();
  @Output('onchartrendered') onchartrendered: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {

    // creating controller
    this.calendarTimelineController = new CalendarTimelineController();

  }

  ngAfterViewInit(): void{

    // events
    const events: {} = {
      'oncellclick': this.oncellclick,
      'onchartrendered': this.onchartrendered
    }

    // initializing chart
    this.calendarTimelineController.initialize_chart( this.chartcontainerref.nativeElement, events );

  }

}
