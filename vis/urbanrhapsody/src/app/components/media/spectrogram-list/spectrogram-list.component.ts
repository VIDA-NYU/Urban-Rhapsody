import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AudioFrame } from 'src/app/model/audioframe.model';
import { AudioSnippet } from 'src/app/model/audiosnippet.model';
import { DataState } from 'src/app/state/data.state';
import { MiscUtils } from 'src/app/utils/misc/misc.utils';
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

  // outputs
  @Output('onmouseenterspectrogram') onmouseenterspectrogram: EventEmitter<{frame: AudioFrame}> = new EventEmitter<{frame: AudioFrame}>();
  @Output('onmouseleavespectrogram') onmouseleavespectrogram: EventEmitter<{frame: AudioFrame}> = new EventEmitter<{frame: AudioFrame}>();
  @Output('onspectrogramframeclicked') onspectrogramframeclicked: EventEmitter<{frame: AudioFrame}> = new EventEmitter<{frame: AudioFrame}>();

  // inputs
  @Input('selectedsnippets') set selectedSnippets( snippets: AudioSnippet[] ) { this.spectrogramListController.on_frames_selected( snippets ); } 

  constructor( public dataState: DataState ) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    
    // initializing controller
    this.spectrogramListController.initialize_controller( this.spectrogramlistcontainerref.nativeElement );
  }

}
