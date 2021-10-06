import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectionState } from 'src/app/state/projections/projections.state';

@Component({
  selector: 'app-umap-projection-dialog',
  templateUrl: './umap-projection-dialog.component.html',
  styleUrls: ['./umap-projection-dialog.component.scss']
})
export class UmapProjectionDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<UmapProjectionDialogComponent>, public projectionState: ProjectionState ) { }

  ngOnInit(): void {}

  public add_projection(): void {

    // // generating new projection in the state
    // this.projectionState.add_new_projection( 'umap', {} );

    // closing dialog
    this.dialogRef.close();

  }

}
