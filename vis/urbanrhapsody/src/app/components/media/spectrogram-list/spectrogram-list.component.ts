import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AudioFrame } from 'src/app/model/audioframe.model';
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
  public spectrogramListController!: SpectrogramListController;

  // dom refs
  @ViewChild('spectrogramlistcontainerref') spectrogramlistcontainerref!: ElementRef;

  // outputs
  @Output('onmouseenterspectrogram') onmouseenterspectrogram: EventEmitter<{frame: AudioFrame}> = new EventEmitter<{frame: AudioFrame}>();
  @Output('onmouseleavespectrogram') onmouseleavespectrogram: EventEmitter<{frame: AudioFrame}> = new EventEmitter<{frame: AudioFrame}>();
  @Output('onspectrogramframeclicked') onspectrogramframeclicked: EventEmitter<{frame: AudioFrame}> = new EventEmitter<{frame: AudioFrame}>();

  constructor( public dataState: DataState ) { }

  ngOnInit(): void {

    // creating controller 
    this.spectrogramListController = new SpectrogramListController();
  }

  ngAfterViewInit(): void {
    
    // initializing controller
    this.spectrogramListController.initialize_controller( this.spectrogramlistcontainerref.nativeElement );
  }

}
