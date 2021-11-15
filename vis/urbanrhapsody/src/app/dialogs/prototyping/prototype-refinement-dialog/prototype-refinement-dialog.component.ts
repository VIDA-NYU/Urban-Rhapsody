import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LabelingState } from 'src/app/state/labeling/labeling.state';
import { PrototypeState } from 'src/app/state/prototype/prototype.state';
import { PrototypeRefinementDialogController } from './controller/prototype-refinement-dialog.controller';

@Component({
  selector: 'app-prototype-refinement-dialog',
  templateUrl: './prototype-refinement-dialog.component.html',
  styleUrls: ['./prototype-refinement-dialog.component.scss']
})
export class PrototypeRefinementDialogComponent implements OnInit, AfterViewInit {

  // controller
  public prototypeRefinementDialogController!: PrototypeRefinementDialogController;

  constructor( public dialogRef: MatDialogRef<PrototypeRefinementDialogComponent>, public prototypeState: PrototypeState, public labelingState: LabelingState ) { }

  ngOnInit(): void {

    this.prototypeRefinementDialogController = new PrototypeRefinementDialogController( this.prototypeState, this.labelingState );

  }

  ngAfterViewInit(): void {

    this.prototypeRefinementDialogController.initialize_controller( this.dialogRef );

  }


}
