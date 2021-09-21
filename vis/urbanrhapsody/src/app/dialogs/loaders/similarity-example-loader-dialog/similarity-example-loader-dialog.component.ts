import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SimilarityExampleLoaderController } from './controller/similarity-example-loader.controller';

@Component({
  selector: 'app-similarity-example-loader-dialog',
  templateUrl: './similarity-example-loader-dialog.component.html',
  styleUrls: ['./similarity-example-loader-dialog.component.scss']
})
export class SimilarityExampleLoaderDialogComponent implements OnInit, AfterViewInit {

  // controller 
  public similarityExampleLoaderController: SimilarityExampleLoaderController = new SimilarityExampleLoaderController(); 

  constructor( ) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void{

    // initializing controller
    this.similarityExampleLoaderController.initialize_controller();

  }  

}
