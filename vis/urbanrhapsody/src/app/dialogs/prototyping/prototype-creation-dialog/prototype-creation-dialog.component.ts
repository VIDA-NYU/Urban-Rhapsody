import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PrototypeCreationController } from './controller/prototype-creation.controller';

@Component({
  selector: 'app-prototype-creation-dialog',
  templateUrl: './prototype-creation-dialog.component.html',
  styleUrls: ['./prototype-creation-dialog.component.scss']
})
export class PrototypeCreationDialogComponent implements OnInit, AfterViewInit {

  // controller
  public prototypeCreationController: PrototypeCreationController = new PrototypeCreationController();

  constructor( public dialogRef: MatDialogRef<PrototypeCreationDialogComponent> ) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {

    this.prototypeCreationController.initialize_component();

  }

}
