import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AudioSnippet } from 'src/app/model/audiosnippet.model';
import { FocusedTimelineController } from './controller/focused-timeline.controller';
import { OverviewTimelineController } from './controller/overview-timeline.controller';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, AfterViewInit {

  // component controller
  public overviewTimelineController!: OverviewTimelineController;
  public focusedTimelineController!: FocusedTimelineController;

  // element refs
  @ViewChild('overviewtimelineref') overviewtimelineref!: ElementRef;
  @ViewChild('focusedtimelineref') focusedtimelineref!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void{

    // initializing timeline controller
    this.overviewTimelineController = new OverviewTimelineController();
    this.focusedTimelineController = new FocusedTimelineController();
    // this.timelineController.attach_refs( this.chartdivref.nativeElement );

  }

}
