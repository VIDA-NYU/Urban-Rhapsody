import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataState } from 'src/app/state/data.state';
import { PrototypeLoaderController } from './controller/prototype-loader.controller';

@Component({
  selector: 'app-prototype-loader-dialog',
  templateUrl: './prototype-loader-dialog.component.html',
  styleUrls: ['./prototype-loader-dialog.component.scss']
})
export class PrototypeLoaderDialogComponent implements OnInit, AfterViewInit {

  // controller
  public prototypeLoaderController!: PrototypeLoaderController;

  constructor( public dialogRef: MatDialogRef<PrototypeLoaderDialogComponent>, public dataState: DataState ) { }

  ngOnInit(): void {

    // initializing controller
    this.prototypeLoaderController = new PrototypeLoaderController( this.dataState );

  }

  ngAfterViewInit(): void{

    this.prototypeLoaderController.initialize_controller( this.dialogRef );
    
  }

}
