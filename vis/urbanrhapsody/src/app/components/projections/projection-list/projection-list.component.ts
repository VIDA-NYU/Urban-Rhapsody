import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { AudioFrame } from 'src/app/model/audioframe.model';
import { Projection } from 'src/app/model/projection.model';
import { PrototypeState } from 'src/app/state/prototype/prototype.state';
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
  @Output('onlabeliconclicked') onlabeliconclicked: EventEmitter<void> = new EventEmitter<void>();
  @Output('onprojectionactionrequested') onprojectionactionrequested: EventEmitter<{ projectionaction: string }> = new EventEmitter<{ projectionaction: string }>();

  // TODO: Refactor these services as input
  @Input('prototypestate') prototypestate!: PrototypeState;
  @Input('availablelabels') availablelabels: string[] = [];
  // @Input('labelingstate') labelingstate!: LabelingState;

  constructor() {}

  ngOnInit(): void {
    this.projectionListController = new ProjectionListController();
  }

  ngAfterViewInit(): void {
    this.projectionListController.initialize_controller( this.projectionrefs );
  }


  

}
