import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { AudioFrame } from 'src/app/model/audioframe.model';
import { Projection } from 'src/app/model/projection.model';
import { ProjectionState } from 'src/app/state/projections/projections.state';
import { ProjectionComponent } from '../projection/projection.component';
import { ProjectionListController } from './controller/projection-list.controller';


@Component({
  selector: 'app-projection-list',
  templateUrl: './projection-list.component.html',
  styleUrls: ['./projection-list.component.scss']
})
export class ProjectionListComponent implements OnInit, AfterViewInit {

  // controller
  public projectionListController!: ProjectionListController;

  // dom refs
  @ViewChildren('projectionref') projectionrefs!: QueryList<ProjectionComponent>;

  // inputs
  @Input('projections') projections!: Projection[];

  // event emitters
  @Output('onpointsselected') onpointsselected: EventEmitter<{'frames': AudioFrame[], 'projectionID': string}> = new EventEmitter<{'frames': AudioFrame[], 'projectionID': string}>(); 

  constructor() { }

  ngOnInit(): void {
    this.projectionListController = new ProjectionListController();
  }

  ngAfterViewInit(): void {
    this.projectionListController.initialize_controller( this.projectionrefs );
  }


  

}
