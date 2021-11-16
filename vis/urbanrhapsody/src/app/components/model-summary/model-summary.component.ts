import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { PrototypeSummary } from 'src/app/model/prototypesummary.model';
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
  // @Input('modelsummary') set modelsummary( modelsummary: PrototypeSummary ){
  //   if(this.modelSummaryController.group){
  //     this.modelSummaryController.update_chart( modelsummary );
  //   }
  // } 

  @Input('modelsummary') modelsummary!: PrototypeSummary;

  // dom refs
  @ViewChild('chartcontainerref') chartcontainerref!: ElementRef;
  // @ViewChild('representativecontainerref') representativecontainerref !: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void{

    // intializing component
    this.modelSummaryController.initialize_controller( this.chartcontainerref.nativeElement );
    this.modelSummaryController.update_chart( this.modelsummary );

  }



}
