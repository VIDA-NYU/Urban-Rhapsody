import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { ModelSummaryController } from './controller/model-summary.controller';

@Component({
  selector: 'app-model-summary',
  templateUrl: './model-summary.component.html',
  styleUrls: ['./model-summary.component.scss']
})
export class ModelSummaryComponent implements OnInit, AfterViewInit {

  // controller 
  public modelSummaryController: ModelSummaryController = new ModelSummaryController();

  // inputs
  @Input('modelsummary') set modelsummary( modelsummary: any ){
    if(modelsummary !== null ){
      this.modelSummaryController.update_chart( modelsummary.accuracy );
    } 
  } 

  // dom refs
  @ViewChild('chartcontainerref') chartcontainerref!: ElementRef;


  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void{

    // intializing component
    this.modelSummaryController.initialize_controller( this.chartcontainerref.nativeElement );

    // testing
    

  }



}
