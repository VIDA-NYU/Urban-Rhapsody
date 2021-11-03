import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AudioSnippet } from 'src/app/model/audiosnippet.model';
import { FocusedClassificationListController } from './controller/focused-classification-list.controller';

@Component({
  selector: 'app-focused-classification-list',
  templateUrl: './focused-classification-list.component.html',
  styleUrls: ['./focused-classification-list.component.scss']
})
export class FocusedClassificationListComponent implements OnInit, AfterViewInit {

  public focusedClassificationContainerSize: string = '0px';

  // controller
  public focusedClassificationListController: FocusedClassificationListController = new FocusedClassificationListController();

  // dom refs
  @ViewChild('focusedclassificationlistcontainerref') focusedclassificationlistcontainerref!: ElementRef;

  // inputs
  @Input('selectedsnippets') selectedsnippets : AudioSnippet[] = [];
  @Input('availableprototypes') availableprototypes: string[] = [];  

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void{

    this.focusedClassificationListController.initialize_controller( this.focusedclassificationlistcontainerref.nativeElement );
    
  }

}
