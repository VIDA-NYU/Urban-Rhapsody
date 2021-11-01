import { Component, Input, OnInit } from '@angular/core';
import { AudioSnippet } from 'src/app/model/audiosnippet.model';

@Component({
  selector: 'app-focused-classification-list',
  templateUrl: './focused-classification-list.component.html',
  styleUrls: ['./focused-classification-list.component.scss']
})
export class FocusedClassificationListComponent implements OnInit {

  // inputs
  @Input('selectedsnippets') selectedsnippets !: AudioSnippet[];
  
  // @Input('selectedsnippets') set selectedSnippets( snippets: AudioSnippet[] ) { 
  //   this.spectrogramListController.on_frames_selected( snippets );
  //   this.spectrogramListController.update_spectrograms();
  // } 

  constructor() { }

  ngOnInit(): void {}

}
