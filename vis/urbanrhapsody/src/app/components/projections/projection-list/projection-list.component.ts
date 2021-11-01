import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  public toppings = new FormControl();
  public toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

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
  
  // slider events
  @Output('onrangeselected') onrangeselected: EventEmitter<{title: string, selection: number[]}> = new EventEmitter<{title: string, selection: number[]}>();

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
