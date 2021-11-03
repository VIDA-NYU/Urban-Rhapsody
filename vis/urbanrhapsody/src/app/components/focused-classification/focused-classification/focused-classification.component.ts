import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AudioSnippet } from 'src/app/model/audiosnippet.model';
import { FocusedClassificationController } from './controller/focused-classification.controller';

@Component({
  selector: 'app-focused-classification',
  templateUrl: './focused-classification.component.html',
  styleUrls: ['./focused-classification.component.scss']
})
export class FocusedClassificationComponent implements OnInit, AfterViewInit {

  // controller
  public focusedClassificationController!: FocusedClassificationController;

  // inputs
  @Input('snippet') snippet !: AudioSnippet;
  @Input('prototypename') prototypename !: string;

  // dom refs
  @ViewChild('snippetfocusedclassificationcontainerref') snippetfocusedclassificationcontainerref !: ElementRef;

  constructor() { }

  ngOnInit(): void {

    // creating controller
    this.focusedClassificationController = new FocusedClassificationController( this.snippet, this.prototypename );
    
  }

  ngAfterViewInit(): void {

    this.focusedClassificationController.initialize_controller( this.snippetfocusedclassificationcontainerref.nativeElement );

  }

}
