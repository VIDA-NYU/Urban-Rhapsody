import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AudioFrame } from 'src/app/model/audioframe.model';
import { Projection } from 'src/app/model/projection.model';
import { PrototypeState } from 'src/app/state/prototype/prototype.state';
import { ProjectionLegendComponent } from '../projection-legend/projection-legend.component';
import { ProjectionController } from './controller/projection.controller';

@Component({
  selector: 'app-projection',
  templateUrl: './projection.component.html',
  styleUrls: ['./projection.component.scss']
})
export class ProjectionComponent implements OnInit, AfterViewInit {

  // DOM REFS
  @ViewChild('projectionContainer') projectionContainer!: ElementRef;
  @ViewChild('projectionelegendref') projectionelegendref!: ProjectionLegendComponent;

  // inputs
  @Input('projection') projection!: Projection;

  // TODO: Refactor these services as input
  @Input('prototypestate') prototypestate!: PrototypeState;
  // @Input('labelingstate') labelingstate!: LabelingState;
  @Input('availablelabels') availablelabels: string[] = [];

  // projection event emitters
  @Output('onpointsselected') onpointsselected: EventEmitter<{'frames': AudioFrame[], 'projectionID': string}> = new EventEmitter<{'frames': AudioFrame[], 'projectionID': string}>(); 
  @Output('onprojectionloaded') onprojectionloaded: EventEmitter<void> = new EventEmitter<void>();

  // controls event emitters
  @Output('onlabeliconclicked') onlabeliconclicked: EventEmitter<void> = new EventEmitter<void>();
  @Output('ondeletebuttonclicked') ondeletebuttonclicked: EventEmitter<{projectionUID: string}> = new EventEmitter<{projectionUID: string}>();
  
  // component controller
  public projectionController!: ProjectionController;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    
    const events: { [eventname: string]: EventEmitter<any> } = {
      'onpointsselected': this.onpointsselected,
    }

    // initializing projection
    this.projectionController = new ProjectionController( this.projection );
    this.projectionController.initialize_projection( this.projectionContainer.nativeElement, this.projectionelegendref, events );

    // setting loaded flag
    this.onprojectionloaded.emit();
    
  }

}
