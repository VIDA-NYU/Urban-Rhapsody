import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-data-loader-dialog',
  templateUrl: './data-loader-dialog.component.html',
  styleUrls: ['./data-loader-dialog.component.scss']
})
export class DataLoaderDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DataLoaderDialogComponent> ) { }

  ngOnInit(): void {}

}
