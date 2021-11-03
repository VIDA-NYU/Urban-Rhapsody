import { ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AudioFrame } from 'src/app/model/audioframe.model';
import { AudioSnippet } from 'src/app/model/audiosnippet.model';
import { DataState } from 'src/app/state/data.state';
import { FocusedClassificationListComponent } from '../../focused-classification/focused-classification-list/focused-classification-list.component';
import { SpectrogramComponent } from '../spectrogram/spectrogram.component';
import { SpectrogramListController } from './controller/spectrogram-list.controller';

@Component({
  selector: 'app-spectrogram-list',
  templateUrl: './spectrogram-list.component.html',
  styleUrls: ['./spectrogram-list.component.scss']
})
export class SpectrogramListComponent implements OnInit, AfterViewInit {

  // controller
  public spectrogramListController: SpectrogramListController = new SpectrogramListController();;

  // dom refs
  @ViewChild('spectrogramlistcontainerref') spectrogramlistcontainerref!: ElementRef;
  @ViewChild('focusedclassificationlistref') focusedclassificationlistref!: FocusedClassificationListComponent;
  @ViewChildren('spectrogramrefs') spectrogramrefs!: QueryList<SpectrogramComponent>

  // outputs
  @Output('onmouseenterspectrogram') onmouseenterspectrogram: EventEmitter<{frame: AudioFrame}> = new EventEmitter<{frame: AudioFrame}>();
  @Output('onmouseleavespectrogram') onmouseleavespectrogram: EventEmitter<{frame: AudioFrame}> = new EventEmitter<{frame: AudioFrame}>();
  @Output('onspectrogramframeclicked') onspectrogramframeclicked: EventEmitter<{frame: AudioFrame, mouseEvent: MouseEvent}> = new EventEmitter<{frame: AudioFrame, mouseEvent: MouseEvent}>();

  // inputs
  @Input('availableprototypes') availableprototypes : string[] = [];
  @Input('selectedsnippets') set selectedSnippets( snippets: AudioSnippet[] ) { 
    this.spectrogramListController.on_frames_selected( snippets );
    this.spectrogramListController.update_spectrograms();
  }

  

  constructor( public dataState: DataState ) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    
    // initializing controller
    this.spectrogramListController.initialize_controller( this.spectrogramlistcontainerref.nativeElement, this.spectrogramrefs );
  }

}
