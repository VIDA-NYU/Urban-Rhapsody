import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataState } from 'src/app/state/data.state';
import { SONYCLoaderController } from './controller/sonyc-loader-dialog.controller';

@Component({
  selector: 'app-sonyc-loader-dialog',
  templateUrl: './sonyc-loader-dialog.component.html',
  styleUrls: ['./sonyc-loader-dialog.component.scss']
})
export class SonycLoaderDialogComponent implements OnInit {

  // parent dialog ref
  @Input('dialogRef') dialogRef!: MatDialogRef<any, any>;

  // controller
  public sonycLoaderController!: SONYCLoaderController;

  constructor( public dataState: DataState ) { }

  ngOnInit(): void {

    // initializing controller
    this.sonycLoaderController = new SONYCLoaderController( this.dataState );

  }

}
