import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { RangeSliderController } from './controller/range-slider.controller';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent implements OnInit, AfterViewInit {

  // chart reference
  @ViewChild('chartcontainerref') chartcontainerref!: ElementRef;

  // controller
  public rangeSliderController: RangeSliderController = new RangeSliderController();

  // inputs
  @Input('rangeslidertitle') rangeslidertitle!: string;

  // outputs
  @Output('onrangeselected') onrangeselected: EventEmitter<{title: string, selection: number[]}> = new EventEmitter<{title: string, selection: number[]}>();

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void{

    const events: { [eventname: string]: EventEmitter<any> } = {
      'onrangeselected': this.onrangeselected
    }

    let dataDomain: number[] = [];
    if( this.rangeslidertitle === 'hours' ){
      dataDomain = [...Array(24).keys()];
    } else {
      dataDomain = [...Array(11).keys()];
    }

    this.rangeSliderController.initialize_controller( this.chartcontainerref.nativeElement, dataDomain, events, this.rangeslidertitle );
    
  }

}
