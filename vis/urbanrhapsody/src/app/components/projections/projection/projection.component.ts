import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AudioFrame } from 'src/app/model/audioframe.model';
import { Projection } from 'src/app/model/projection.model';
import { ProjectionController } from './controller/projection.controller';

@Component({
  selector: 'app-projection',
  templateUrl: './projection.component.html',
  styleUrls: ['./projection.component.scss']
})
export class ProjectionComponent implements OnInit, AfterViewInit {

  // DOM REFS
  @ViewChild('projectionContainer') projectionContainer!: ElementRef;

  // inputs
  @Input('projection') projection!: Projection;

  // event emitters
  @Output('onpointsselected') onpointsselected: EventEmitter<{'frames': AudioFrame[], 'projectionID': string}> = new EventEmitter<{'frames': AudioFrame[], 'projectionID': string}>(); 
  // @Output('onpointclicked') onpointclicked: EventEmitter<{'uids': string[], 'projectionID': string}> = new EventEmitter<{'uids': string[], 'projectionID': string}>();

  // component controller
  public projectionController!: ProjectionController;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {

    const events: { [eventname: string]: EventEmitter<any> } = {
      'onpointsselected': this.onpointsselected
    }

    // initializing projection
    this.projectionController = new ProjectionController( this.projection );
    this.projectionController.initialize_projection( this.projectionContainer.nativeElement, events );
    
  }

}
