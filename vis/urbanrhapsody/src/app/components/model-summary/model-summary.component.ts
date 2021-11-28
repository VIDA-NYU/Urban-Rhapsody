import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { AudioFrame } from 'src/app/model/audioframe.model';
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
  @ViewChild('spectrogramrepresentativecontainer') spectrogramrepresentativecontainer!: ElementRef;
  // @ViewChild('representativecontainerref') representativecontainerref !: ElementRef;

  // events
  @Output('onmouseenterrepresentative') onmouseenterrepresentative: EventEmitter<{frame: AudioFrame}> = new EventEmitter<{frame: AudioFrame}>();
  @Output('onmouseoutrepresentative') onmouseoutrepresentative: EventEmitter<{frame: AudioFrame}> = new EventEmitter<{frame: AudioFrame}>();

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void{

    const events: { [eventname: string]: EventEmitter<any> } = {
      'onmouseenterrepresentative': this.onmouseenterrepresentative,
      'onmouseoutrepresentative': this.onmouseoutrepresentative
    }

    

    // intializing component
    this.modelSummaryController.initialize_controller( this.chartcontainerref.nativeElement, events, this.spectrogramrepresentativecontainer.nativeElement );
    this.modelSummaryController.update_chart( this.modelsummary );

  }



}
