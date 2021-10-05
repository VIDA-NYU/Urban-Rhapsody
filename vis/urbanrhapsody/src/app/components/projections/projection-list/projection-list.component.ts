import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AudioFrame } from 'src/app/model/audioframe.model';
import { ProjectionState } from 'src/app/state/projections/projections.state';
import { ProjectionListController } from './controller/projection-list.controller';


@Component({
  selector: 'app-projection-list',
  templateUrl: './projection-list.component.html',
  styleUrls: ['./projection-list.component.scss']
})
export class ProjectionListComponent implements OnInit {

  // event emitters
  @Output('onpointsselected') onpointsselected: EventEmitter<{'frames': AudioFrame[], 'projectionID': string}> = new EventEmitter<{'frames': AudioFrame[], 'projectionID': string}>(); 

  constructor( public projectionState: ProjectionState ) { }

  ngOnInit(): void {}
  

}
