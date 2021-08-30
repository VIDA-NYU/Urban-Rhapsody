import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AudioSnippet } from 'src/app/model/audiosnippet.model';
import { TimelineController } from './controller/timeline.controller';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, AfterViewInit {

  // component controller
  public timelineController!: TimelineController;

  // element refs
  @ViewChild('chartdivref') chartdivref!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void{

    // initializing timeline controller
    this.timelineController = new TimelineController();
    this.timelineController.attach_refs( this.chartdivref.nativeElement );

  }

}
