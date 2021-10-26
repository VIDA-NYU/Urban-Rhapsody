import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AudioState } from 'src/app/state/audio/audio.state';
import { DataState } from 'src/app/state/data.state';
import { SimilarityExampleLoaderController } from './controller/similarity-example-loader.controller';
import { SnippetExampleComponent } from './snippet-example/snippet-example.component';
import { DataLoaderDialogComponent } from '../data-loader-dialog/data-loader-dialog.component';


@Component({
  selector: 'app-similarity-example-loader-dialog',
  templateUrl: './similarity-example-loader-dialog.component.html',
  styleUrls: ['./similarity-example-loader-dialog.component.scss']
})
export class SimilarityExampleLoaderDialogComponent implements OnInit, AfterViewInit {

  // controller 
  public similarityExampleLoaderController: SimilarityExampleLoaderController = new SimilarityExampleLoaderController(); 

  // refs
  @ViewChildren('snippetexampleref') snippetexamplerefs!: QueryList<SnippetExampleComponent>;

  // input refs
  @Input('parentdialogref') parentdialogref!: MatDialogRef<DataLoaderDialogComponent> ;

  constructor( public audioState: AudioState, public dataState: DataState ) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void{
    
    // initializing controller    
    this.similarityExampleLoaderController.initialize_controller( this.snippetexamplerefs, this.audioState, this.dataState );

  }  

}
