import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AudioFrame } from 'src/app/model/audioframe.model';
import { DataState } from 'src/app/state/data.state';
import { LabelingState } from 'src/app/state/labeling/labeling.state';

@Component({
  selector: 'app-frame-labeling-dialog',
  templateUrl: './frame-labeling-dialog.component.html',
  styleUrls: ['./frame-labeling-dialog.component.scss']
})
export class FrameLabelingDialogComponent implements OnInit {

  // input label
  public labelForm = new FormGroup({labelName: new FormControl()});

  // unique labels
  public frameLabels: string[] = [];

  constructor( public dialogRef: MatDialogRef<FrameLabelingDialogComponent>, public dataState: DataState, public labelingState: LabelingState ) { }

  ngOnInit(): void { this.initialize_dialog(); } 

  public initialize_dialog(): void {
    
    // showing previously done labels
    const currentLabels: Set<string> = new Set<string>();
    this.dataState.selectedFrames.forEach( (frame: AudioFrame ) => { 
      
      const frameLabels: string[] = frame.metadata.get_labels();
      frameLabels.forEach( (label: string) => currentLabels.add(label) );

    });

    this.frameLabels = Array.from(currentLabels.values());

  }

  public add_new_label( label: string ): void {

    if( label.trim().length > 0 ){

      // creating helper set
      const helperSet: Set<string> = new Set( this.frameLabels );

      // adding new label
      helperSet.add( label.trim() );

      // updating labels
      this.frameLabels = Array.from( helperSet.values() );

    }

  }

  public async save_labels(): Promise<void> {

    // // setting spinner flag
    // this.isSavingLabels = true;
    
    // adding to label state
    this.labelingState.label_frames( this.frameLabels, this.dataState.selectedFrames );

    // // adding to frames
    // await this.globalState.label_points( this.frameLabels, uids );

    // // setting spinner flag
    // this.isSavingLabels = false;

    // closing dialog
    this.dialogRef.close();

  }

  public remove_label( label: string ): void{

    // creating helper set
    const helperSet: Set<string> = new Set( this.frameLabels );

    // removing label
    helperSet.delete( label );

    // updating labels
    this.frameLabels = Array.from( helperSet.values() );
  
  }


}
