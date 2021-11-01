import { EventEmitter, Input, Output } from '@angular/core';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HistogramController } from './controller/histogram.controller';

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.scss']
})
export class HistogramComponent implements OnInit, AfterViewInit {

  // controller
  public histogramController: HistogramController = new HistogramController();

  // dom refs
  @ViewChild('chartcontainerref') chartcontainerref!: ElementRef;

  // inputs
  @Input('charttitle') charttitle!: string;

  // outputs
  // @Output('onhistogrambrushed') onhistogrambrushed: EventEmitter<{chartTitle: string, values: number[]}> = new EventEmitter<{chartTitle: string, values: number[]}>();

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {

    // const events: { [eventName: string]: EventEmitter<any> } = {
    //   'onhistogrambrushed': this.onhistogrambrushed
    // }

    // initializing controller
    this.histogramController.initialize_controller( this.chartcontainerref.nativeElement );

  }

}
