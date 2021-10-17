import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PrototypeState } from 'src/app/state/prototype/prototype.state';
import { PrototypeSelectionController } from './controller/prototype-selection.controller';

@Component({
  selector: 'app-prototype-selection-dialog',
  templateUrl: './prototype-selection-dialog.component.html',
  styleUrls: ['./prototype-selection-dialog.component.scss']
})
export class PrototypeSelectionDialogComponent implements OnInit, AfterViewInit {

  // controller
  public prototypeSelectionController!: PrototypeSelectionController;

  constructor( public dialogRef: MatDialogRef<PrototypeSelectionDialogComponent>, public prototypeState: PrototypeState ) { }

  ngOnInit(): void {

    this.prototypeSelectionController = new PrototypeSelectionController( this.dialogRef, this.prototypeState );

  }

  ngAfterViewInit(): void {

    this.prototypeSelectionController.initialize_controller();
    
  }

}
