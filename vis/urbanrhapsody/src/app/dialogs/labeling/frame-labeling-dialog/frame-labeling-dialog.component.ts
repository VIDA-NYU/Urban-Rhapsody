import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LabelingAPI } from 'src/app/api/labeling.api';
import { AudioFrame } from 'src/app/model/audioframe.model';
import { DataState } from 'src/app/state/data.state';
import { LabelingState } from 'src/app/state/labeling/labeling.state';
import { ChartUtils } from 'src/app/utils/chart/chart.utils';
import * as d3 from 'd3';
import { PrototypeState } from 'src/app/state/prototype/prototype.state';

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
  public selectionNegativeFrameLabels: Set<string> = new Set<string>();
  public allNegativeFrameLabels: string[] = [];

  // current predictions
  public colorScale: any = ChartUtils.create_sequential_color_scale([0,1], d3.interpolateGreens);
  public predictions: any[] = [
    {'name': 'construction', 'prediction': Math.random().toFixed(2)},
    {'name': 'car-horn', 'prediction': Math.random().toFixed(2)},
    {'name': 'siren', 'prediction': Math.random().toFixed(2)},
    {'name': 'people talking', 'prediction': Math.random().toFixed(2)}
  ].sort( (a:any, b: any) => (b.prediction - a.prediction) );

  constructor( public dialogRef: MatDialogRef<FrameLabelingDialogComponent>, public dataState: DataState, public labelingState: LabelingState, public prototypeState: PrototypeState ) { }

  ngOnInit(): void { this.initialize_dialog(); } 

  public async initialize_dialog(): Promise<void> {

    // requesting all available labels
    const response: { labels: string[] } = await LabelingAPI.get_all_labels();
    this.allNegativeFrameLabels = response.labels;
  
    // showing previously done labels
    const currentLabels: Set<string> = new Set<string>();
    this.dataState.selectedFrames.forEach( (frame: AudioFrame ) => { 
      
      const frameLabels: string[] = frame.metadata.get_labels();
      const negativeFrameLabels: string[] = frame.metadata.get_negative_labels();

      frameLabels.forEach( (label: string) => currentLabels.add(label) );
      negativeFrameLabels.forEach( (negativeLabel: string) => this.selectionNegativeFrameLabels.add(negativeLabel) );

    });

    this.frameLabels = Array.from(currentLabels.values());

    // loading classes likelihoods
    this.get_selection_prototypes_likelihood();
    
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

  public add_new_negative_label( label: string ): void {

    if( this.selectionNegativeFrameLabels.has(label) ){
      this.selectionNegativeFrameLabels.delete(label);
    } else {
      this.selectionNegativeFrameLabels.add(label);
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

  public async save_negative_labels(): Promise<void>{

    // saving negative labels
    this.labelingState.negative_label_frames( Array.from(this.selectionNegativeFrameLabels.values()) , this.dataState.selectedFrames );


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


  public async get_selection_prototypes_likelihood(): Promise<void> {

    this.prototypeState.get_prototypes_selection_likelihood( this.dataState.selectedFrames );

  }

}
