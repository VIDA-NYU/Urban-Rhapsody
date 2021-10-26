import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Projection } from 'src/app/model/projection.model';
import { LabelingState } from 'src/app/state/labeling/labeling.state';
import { PrototypeState } from 'src/app/state/prototype/prototype.state';
import { ProjectionControlsController } from './controller/projection-controls.controller';

@Component({
  selector: 'app-projection-controls',
  templateUrl: './projection-controls.component.html',
  styleUrls: ['./projection-controls.component.scss']
})
export class ProjectionControlsComponent implements OnInit, AfterViewInit {

  // eventemitters
  @Output('onbrushset') onbrushset: EventEmitter<any> = new EventEmitter<any>();
  @Output('onlabeliconclicked') onlabeliconclicked: EventEmitter<void> = new EventEmitter<void>();
  @Output('onnewcolorscaleselected') onnewcolorscaleselected: EventEmitter<any> = new EventEmitter<any>();
  @Output('ondeletebuttonclicked') ondeletebuttonclicked: EventEmitter<{projectionUID: string}> = new EventEmitter<{projectionUID: string}>();

  // inputs
  @Input('projection') projection!: Projection;

  // services as input
  @Input('prototypestate') prototypestate!: PrototypeState;
  // @Input('labelingstate') labelingstate!: LabelingState;

  // controller
  public projectionControlsController: ProjectionControlsController = new ProjectionControlsController();

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void{

    const events: { [eventname: string]: EventEmitter<any> } = {
      'onnewcolorscaleselected': this.onnewcolorscaleselected,
    }

    this.projectionControlsController.initialize_controller( events );

  }

}
